import { NativeModules } from 'react-native';

const { Gemma } = NativeModules;

export async function initGemma() {
  // model is already loaded natively, so just verify bridge exists
  if (!Gemma) throw new Error("Gemma native module not found");
  return true;
}

export async function askGemma(prompt: string): Promise<string> {
  if (!Gemma) throw new Error("Gemma native module not found");
  return await Gemma.query(prompt);
}
