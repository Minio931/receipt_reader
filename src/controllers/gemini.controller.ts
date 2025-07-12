import { ReceiptDTO } from "@/dtos/receipt.dto";
import { readFileFromAssets } from "@/heplers/files.helper.js";
import { encodeImageToBase64 } from "@/heplers/image.helper.js";
import geminiService from "@/services/gemini.service.js";
import storageService from "@/services/storage.service";
import { NextFunction, Request, Response } from "express";
import fs from "fs";

const PROMPT_FILE_NAME = "prompt_v1.txt";

// export const processReceipt = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ): Promise<any> => {
//   try {
//     const { file } = req;
//     const prompt = readFileFromAssets(PROMPT_FILE_NAME) ?? "";
//     const filePath = req.file.path;
//     const buffer = fs.readFileSync(filePath);

//     const base64Image = buffer.toString("base64");
//     const receiptData = await geminiService.processReceipt(base64Image, prompt);

//     const receiptDto = ReceiptDTO.toDto(receiptData);

//     storageService.saveData(receiptDto);

//     return res.json(receiptData);
//   } catch (error) {
//     next(error);
//   }
// };
export const processReceipt = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "Brak przesłanych plików." });
    }

    const prompt = readFileFromAssets(PROMPT_FILE_NAME) ?? "";

    // 🔹 Konwertuj wszystkie obrazy na base64
    const base64Images = files.map((file) => {
      const buffer = fs.readFileSync(file.path);
      return buffer.toString("base64");
    });

    // 🔹 Wyślij do Gemini jako jeden paragon (wiele zdjęć)
    const receiptData = await geminiService.processReceipt(base64Images, prompt);

    const receiptDto = ReceiptDTO.toDto(receiptData);
    storageService.saveData(receiptDto);

    return res.json(receiptData);
  } catch (error) {
    next(error);
  }
};
