import { NativeModules } from 'react-native';
import RNFS from 'react-native-fs';

const { Gemma } = NativeModules;

const MODEL_ASSET_NAME = 'model.gguf';
const MODEL_PATH = `${RNFS.DocumentDirectoryPath}/${MODEL_ASSET_NAME}`;

export async function initGemma() {
  // 1. Check if model already exists
  const exists = await RNFS.exists(MODEL_PATH);

  if (!exists) {
    console.log('📦 Copying model from assets...');
    await RNFS.copyFileAssets(MODEL_ASSET_NAME, MODEL_PATH);
    console.log('✅ Model copied to:', MODEL_PATH);
  } else {
    console.log('📦 Model already exists:', MODEL_PATH);
  }

  // 2. Load model in native layer
  const ok = await Gemma.load(MODEL_PATH);
  console.log('🧠 Gemma load result:', ok);

  return ok;
}

export async function askGemma(prompt) {
  return Gemma.query(prompt);
}
