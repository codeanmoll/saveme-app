#include <jni.h>
#include <string>
#include <vector>
#include <android/log.h>
#include <thread>
#include "llama.h"

#define TAG "NativeLlama"
// Standard Android Logging Macros
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, TAG, __VA_ARGS__)
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, TAG, __VA_ARGS__)

// --- GLOBAL PERSISTENT STATE ---
static llama_model *g_model = nullptr;
static const llama_vocab *g_vocab = nullptr;
static llama_context *g_ctx = nullptr;  // The "Brain"
static int g_n_past = 0;                // History Counter
static bool g_is_cancelled = false;

extern "C" {

// 1. INIT (Load Model Only)
JNIEXPORT void JNICALL
Java_com_saveme_ai_NativeLlama_init(JNIEnv *env, jobject, jstring modelPath) {
    if (g_model) return; 
    const char *path = env->GetStringUTFChars(modelPath, nullptr);
    
    static bool backend_initialized = false;
    if (!backend_initialized) { llama_backend_init(); backend_initialized = true; }
    
    llama_model_params mparams = llama_model_default_params();
    mparams.use_mmap = true; 
    g_model = llama_model_load_from_file(path, mparams);
    
    if (g_model) g_vocab = llama_model_get_vocab(g_model);
    env->ReleaseStringUTFChars(modelPath, path);
    LOGI("Model Loaded");
}

// 2. RESET (Safe Memory Clear)
JNIEXPORT void JNICALL
Java_com_saveme_ai_NativeLlama_reset(JNIEnv *env, jobject) {
    // COMPATIBILITY FIX: Instead of calling specific cache functions,
    // we just destroy the context. It will be recreated automatically
    // in the next startGeneration call.
    if (g_ctx) {
        llama_free(g_ctx);
        g_ctx = nullptr;
    }
    g_n_past = 0;
    LOGI("Memory Cleared (Context Destroyed)");
}

// 3. STOP
JNIEXPORT void JNICALL
Java_com_saveme_ai_NativeLlama_stop(JNIEnv *env, jobject) {
    g_is_cancelled = true;
}

// 4. STREAMING GENERATION (With Memory)
JNIEXPORT void JNICALL
Java_com_saveme_ai_NativeLlama_startGeneration(
    JNIEnv *env, 
    jobject thiz, 
    jstring prompt
) {
    if (!g_model || !g_vocab) return;
    g_is_cancelled = false;

    // A. SETUP CALLBACK
    jclass cls = env->GetObjectClass(thiz);
    jmethodID callback_method = env->GetMethodID(cls, "onToken", "(Ljava/lang/String;)V");
    if (!callback_method) return;

    // B. INITIALIZE CONTEXT (If it doesn't exist or was reset)
    if (!g_ctx) {
        llama_context_params cparams = llama_context_default_params();
        cparams.n_ctx = 4096; // 4k Context
        cparams.n_threads = 4;
        cparams.n_threads_batch = 4; 
        g_ctx = llama_init_from_model(g_model, cparams);
        g_n_past = 0;
        LOGI("New Context Created");
    }

    // C. CONTEXT LIMIT CHECK
    int n_ctx_limit = llama_n_ctx(g_ctx);
    if (g_n_past + 1024 > n_ctx_limit) {
        // Memory full? Kill it and start fresh.
        llama_free(g_ctx);
        g_ctx = llama_init_from_model(g_model, llama_context_default_params());
        g_n_past = 0;
        LOGI("Context limit reached, forced reset");
    }

    // D. PROMPT FORMATTING (History Aware)
    const char *raw_prompt = env->GetStringUTFChars(prompt, nullptr);
    std::string formatted_prompt;

    if (g_n_past == 0) {
        // FIRST MESSAGE
        std::string system = "You are a precise assistant. Answer directly and concisely.";
        formatted_prompt = "<start_of_turn>user\n" + system + "\n\n" + 
                           std::string(raw_prompt) + 
                           "<end_of_turn>\n<start_of_turn>model\n";
    } else {
        // FOLLOW-UP
        formatted_prompt = "<start_of_turn>user\n" + 
                           std::string(raw_prompt) + 
                           "<end_of_turn>\n<start_of_turn>model\n";
    }
    env->ReleaseStringUTFChars(prompt, raw_prompt);

    // E. TOKENIZE
    std::vector<llama_token> tokens;
    tokens.resize(formatted_prompt.length() + 16); 
    
    // Add BOS token only for the very first message
    bool add_special = (g_n_past == 0);
    
    int n_tokens = llama_tokenize(g_vocab, formatted_prompt.c_str(), formatted_prompt.length(), tokens.data(), tokens.size(), add_special, false);
    tokens.resize(n_tokens);

    // F. DECODE PROMPT
    llama_batch batch = llama_batch_init(512, 0, 1);
    for (int i = 0; i < n_tokens; i++) {
        batch.token[i] = tokens[i];
        batch.pos[i] = g_n_past + i; // Offset by history
        batch.seq_id[i][0] = 0;
        batch.n_seq_id[i] = 1;
        batch.logits[i] = (i == n_tokens - 1); 
    }
    batch.n_tokens = n_tokens;
    
    if (llama_decode(g_ctx, batch) != 0) {
        llama_batch_free(batch);
        return; 
    }
    g_n_past += n_tokens; 

    // G. SAMPLER (Precision Mode)
    auto sparams = llama_sampler_chain_default_params();
    llama_sampler *sampler = llama_sampler_chain_init(sparams);
    llama_sampler_chain_add(sampler, llama_sampler_init_temp(0.10f)); // Robot precision
    llama_sampler_chain_add(sampler, llama_sampler_init_top_k(10));   
    llama_sampler_chain_add(sampler, llama_sampler_init_top_p(0.85f, 1)); 
    llama_sampler_chain_add(sampler, llama_sampler_init_dist(1234));

    // H. STREAMING LOOP
    std::string accumulated_response = "";

    for (int i = 0; i < 2048; i++) {
        if (g_is_cancelled) break;

        llama_token new_token_id = llama_sampler_sample(sampler, g_ctx, -1);
        llama_sampler_accept(sampler, new_token_id);
        
        if (llama_vocab_is_eog(g_vocab, new_token_id)) break;

        char buf[256];
        int n = llama_token_to_piece(g_vocab, new_token_id, buf, sizeof(buf), 0, false);
        
        if (n > 0) {
            std::string chunk(buf, n);
            
            // --- AGGRESSIVE STOP LOGIC ---
            if (chunk.find("<") != std::string::npos || 
                chunk.find(">") != std::string::npos || 
                chunk.find("User") != std::string::npos ||
                chunk.find("Model") != std::string::npos ||
                chunk.find("turn") != std::string::npos) {
                break;
            }
            if (accumulated_response.length() > 0 && chunk == ":") {
                 if (accumulated_response.length() >= 4 && 
                     accumulated_response.substr(accumulated_response.length()-4) == "User") {
                     break;
                 }
            }

            jstring jChunk = env->NewStringUTF(chunk.c_str());
            env->CallVoidMethod(thiz, callback_method, jChunk);
            env->DeleteLocalRef(jChunk); 
            
            accumulated_response += chunk;
        }

        // Feed new token back
        batch.n_tokens = 0;
        batch.token[0] = new_token_id;
        batch.pos[0] = g_n_past; 
        batch.seq_id[0][0] = 0;
        batch.n_seq_id[0] = 1;
        batch.logits[0] = true;
        batch.n_tokens = 1;

        if (llama_decode(g_ctx, batch) != 0) break;
        g_n_past++; 
    }

    llama_sampler_free(sampler);
    llama_batch_free(batch);
}

// 5. RELEASE
JNIEXPORT void JNICALL
Java_com_saveme_ai_NativeLlama_release(JNIEnv *env, jobject) {
    if (g_ctx) {
        llama_free(g_ctx);
        g_ctx = nullptr;
    }
    if (g_model) {
        llama_model_free(g_model);
        g_model = nullptr;
    }
    llama_backend_free();
}

} // extern "C"