import * as fs from "fs";
import * as path from "path";

const ASSETS_PATH = path.resolve(process.cwd(), "assets");

export const readFileFromAssets = (fileName: string) => {
  const filePath = path.join(ASSETS_PATH, fileName);

  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return data;
  } catch (error) {
    console.error(`Error reading file: ${fileName}`);
  }
};
