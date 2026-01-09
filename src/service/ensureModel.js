import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

const MODEL_NAME = 'gemma.gguf';

export async function ensureModel() {
  const destPath = `${RNFS.DocumentDirectoryPath}/${MODEL_NAME}`;

  const exists = await RNFS.exists(destPath);
  if (exists) {
    console.log('📦 Model already exists:', destPath);
    return destPath;
  }

  console.log('⬇️ Copying model from assets...');

  if (Platform.OS === 'android') {
    await RNFS.copyFileAssets(MODEL_NAME, destPath);
  } else {
    throw new Error('iOS not implemented');
  }

  console.log('✅ Model copied to:', destPath);
  return destPath;
}
