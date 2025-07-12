import { ReceiptDTO } from "@/dtos/receipt.dto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class StorageService {
  private fileName: string;
  private storagePath: string;

  constructor(storagePath: string, fileName: string) {
    this.storagePath = storagePath;
    this.ensureStorageDirectory();
    this.fileName = fileName;
    this.initFile(fileName);
  }

  public clearData(): void {
    const filePath = path.join(this.storagePath, this.fileName);
    if (fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]), "utf8");
    }
  }

  public readData(): ReceiptDTO[] {
    const filePath = path.join(this.storagePath, this.fileName);
    try {
      if (!fs.existsSync(filePath)) {
        return [];
      }

      const content = fs.readFileSync(filePath, "utf8");
      if (!content.trim()) return [];

      const data = JSON.parse(content);
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("Błąd podczas odczytu danych:", err);
      return [];
    }
  }

  public readCSVData(fileName: string): Buffer | null {
    const filePath = path.join(this.storagePath, fileName);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    return fs.readFileSync(filePath); // bez "utf8"
  }

  public saveData(data: ReceiptDTO, fileName: string | null = null): void {
    const filePath = path.join(this.storagePath, fileName ?? this.fileName);
    const existingData = this.readData();

    const dataArray = Array.isArray(existingData) ? existingData : [];

    dataArray.push(data);
    fs.writeFileSync(filePath, JSON.stringify(dataArray, null, 2), "utf8");
  }

  public saveDataToFile(data: any, fileName: string): string {
    const filePath = path.join(this.storagePath, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

    return filePath;
  }

  private ensureStorageDirectory() {
    if (!fs.existsSync(this.storagePath)) {
      fs.mkdirSync(this.storagePath, { recursive: true });
    }
  }

  private initFile(fileName: string): string {
    const filePath = path.join(this.storagePath, fileName);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]), "utf8");
    }
    return filePath;
  }
}

export default new StorageService(path.join(__dirname, "..", "storage"), "data.json");
