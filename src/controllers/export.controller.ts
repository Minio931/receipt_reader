import exportService from "@/services/export.service.js";
import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ExportToSheetsService } from "@/services/export-to-sheets.service.js";
import storageService from "@/services/storage.service";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const exportData = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const exportedFileName = exportService.exportData();
    const filePath = path.join(__dirname, "..", "storage", exportedFileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Exported file not found." });
    }
    res.download(filePath, exportedFileName, (err) => {
      if (err) {
        next(err);
        return;
      }
    });
  } catch (error) {
    next(error);
  }
};

export async function exportReceiptsHandler(req, res) {
  try {
    console.log(req.query);
    const { spreadsheetId } = req.query;

    if (!spreadsheetId || typeof spreadsheetId !== "string") {
      return res.status(400).json({ error: "Brak spreadsheetId w body requestu." });
    }

    const exportedData = exportService.exportData();

    if (!exportedData || exportedData.length === 0) {
      return res.status(400).json({ error: "Brak danych do eksportu lub plik jest pusty." });
    }

    const sheetsService = new ExportToSheetsService(spreadsheetId);
    await sheetsService.init();

    const result = await sheetsService.exportReceipts(exportedData, "KwiecieńTest!A1");

    res.json({
      message: "Dane zostały wysłane do Google Sheets.",
      details: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Błąd podczas eksportu do Google Sheets." });
  }
}
