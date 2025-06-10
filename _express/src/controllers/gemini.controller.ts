import { ProcessReceiptDTO } from "@/dtos/process-receipt.js";
import { readFileFromAssets } from "@/heplers/files.helper.js";
import { encodeImageToBase64 } from "@/heplers/image.helper.js";
import geminiService from "@/services/gemini.service.js";
import { Request, Response, NextFunction } from "express";
import fs from "fs";

const PROMPT_FILE_NAME = "prompt_v1.txt";

export const processReceipt = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const { file } = req;
    const prompt = readFileFromAssets(PROMPT_FILE_NAME) ?? "";
    const filePath = req.file.path;
    const buffer = fs.readFileSync(filePath);

    const base64Image = buffer.toString("base64");
    const receiptData = await geminiService.processReceipt(base64Image, prompt);

    return res.json(receiptData);
  } catch (error) {
    next(error);
  }
};
