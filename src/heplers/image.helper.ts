import * as fs from "fs";

export const encodeImageToBase64 = (image: Buffer) => {
  return image.toString("base64");
};
