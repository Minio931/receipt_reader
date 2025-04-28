import { ReceiptItem } from "@/types/receipt-item.type";
import { ReceiptVat } from "@/types/receipt-vat.type";

export class ReceiptDTO {
  constructor(
    public store_name: string,
    public store_address: string,
    public nip: string | null,
    public receipt_number: string,
    public date: string,
    public time: string,
    public products: ReceiptItem[],
    public total: number,
    public payment_method: string,
    public currency: string,
    public vat: ReceiptVat,
  ) {}

  static toDto(data: ReceiptDTO) {
    return new ReceiptDTO(
      data.store_name,
      data.store_address,
      data.nip,
      data.receipt_number,
      data.date,
      data.time,
      data.products,
      data.total,
      data.payment_method,
      data.currency,
      data.vat,
    );
  }
}
