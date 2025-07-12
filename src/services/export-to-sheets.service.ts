import { google } from "googleapis";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ExportToSheetsService {
  private authClient;
  private sheets;

  constructor(private spreadsheetId: string) {}

  async init() {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, "..", "credentials.json"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    this.authClient = await auth.getClient();
    this.sheets = google.sheets({ version: "v4", auth: this.authClient });
  }

  async exportReceipts(exportedData: string[][], range = "KwiecieńTest!A1") {
    if (!this.authClient) {
      throw new Error("Service not initialized. Call init() first.");
    }

    const result = await this.sheets.spreadsheets.values.append({
      spreadsheetId: this.spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: exportedData,
      },
    });

    return result;
  }
}
