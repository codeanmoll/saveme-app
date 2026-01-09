package com.saveme.ai

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.modules.core.DeviceEventManagerModule

class NativeLlama(private val reactContext: ReactApplicationContext) {

    companion object {
        init {
            System.loadLibrary("native_llama")
        }
    }

    external fun init(modelPath: String)
    external fun startGeneration(prompt: String)
    external fun stop()
    external fun release()
    external fun reset() // <--- NEW: Clears memory logic

    fun onToken(token: String) {
        if (reactContext.hasActiveCatalystInstance()) {
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("onLlamaToken", token)
        }
    }
}