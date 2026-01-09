import RNFS from "react-native-fs";

export async function prepareModel() {
  const dest = RNFS.DocumentDirectoryPath + "/gemma.gguf";
  const exists = await RNFS.exists(dest);

  if (!exists) {
    console.log("Copying Gemma model to internal storage...");
    await RNFS.copyFileAssets("models/gemma-3-1b-it-q4_0.gguf", dest);
  } else {
    console.log("Gemma model already exists.");
  }

  return dest;
}
