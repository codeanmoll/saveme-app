import { NativeModules, NativeEventEmitter } from "react-native";

const { Gemma } = NativeModules; // Make sure this matches your module name

let initialized = false;

export async function initLlama(modelPath) {
  if (!initialized) {
    await Gemma.init(modelPath);
    initialized = true;
  }
}

export async function generate(prompt) {
  if (!initialized) throw new Error("Model not initialized");
  return Gemma.generate(prompt);
}

export async function resetChat() {
  if (!initialized) return;
  return Gemma.resetContext();
}

// --- NEW ADDITION ---
export async function stopGeneration() {
  if (!initialized) return;
  return Gemma.stop(); // Calls the C++ stop function
}
// --------------------

export const llamaModule = Gemma;