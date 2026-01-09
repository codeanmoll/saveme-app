package com.saveme.ai

import com.facebook.react.bridge.*

class GemmaModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val nativeLlama = NativeLlama(reactContext)

    override fun getName(): String = "Gemma"

    @ReactMethod
    fun init(modelPath: String, promise: Promise) {
        try {
            nativeLlama.init(modelPath)
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("INIT_FAILED", e)
        }
    }

    @ReactMethod
    fun generate(prompt: String, promise: Promise) {
        Thread {
            try {
                nativeLlama.startGeneration(prompt)
                promise.resolve(true) 
            } catch (e: Exception) {
                promise.reject("GEN_FAILED", e)
            }
        }.start()
    }
    
    @ReactMethod
    fun stop(promise: Promise) {
        try {
            nativeLlama.stop()
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("STOP_FAILED", e)
        }
    }

    @ReactMethod
    fun resetContext(promise: Promise) {
        try {
            nativeLlama.reset()
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("RESET_FAILED", e)
        }
    }

    // --- FIX FOR WARNING: Required for NativeEventEmitter ---
    @ReactMethod
    fun addListener(eventName: String) {
        // Keep this empty. It's just to satisfy React Native.
    }

    @ReactMethod
    fun removeListeners(count: Int) {
        // Keep this empty. It's just to satisfy React Native.
    }
    // --------------------------------------------------------
}