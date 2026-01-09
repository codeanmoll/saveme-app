import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

export async function ensureModel() {
  const destPath = `${RNFS.DocumentDirectoryPath}/gemma.gguf`;

  if (await RNFS.exists(destPath)) {
    return destPath;
  }

  if (Platform.OS === 'android') {
    // Copy from assets
    await RNFS.copyFileAssets('gemma.gguf', destPath);
  } else {
    // iOS (if later)
    const srcPath = `${RNFS.MainBundlePath}/gemma.gguf`;
    await RNFS.copyFile(srcPath, destPath);
  }

  return destPath;
}