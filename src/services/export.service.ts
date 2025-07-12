import { ReceiptDTO } from "@/dtos/receipt.dto";
import storageService from "@/services/storage.service";
import fs from "fs";

class ExportService {
  constructor(private storageService: any) {}

  public exportData(): string[][] {
    const data = this.storageService.readData() as ReceiptDTO[];

    const allRows: string[][] = [];

    data.forEach((item: ReceiptDTO, index: number) => {
      allRows.push([`Zakupy: ${item.date ?? new Date().toLocaleDateString()}`]);
      allRows.push(["Pordukty", "Cena", "Ilość osób", "Podzielone na osoby"]);

      item.products.forEach((product) => {
        allRows.push([product.name, product.total_price?.toFixed(2), "0", "0"]);
      });

      allRows.push([`Suma: ${item.total.toFixed(2)}`]);

      if (index < data.length - 1) {
        allRows.push([]); // pusty wiersz między paragonami
      }
    });

    // jeśli chcesz zapisać również do pliku:
    fs.writeFileSync("exported_data_preview.json", JSON.stringify(allRows, null, 2), "utf8");

    return allRows;
  }
}

export default new ExportService(storageService);
