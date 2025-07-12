import { ReceiptItem } from "@/types/receipt-item.type";
import { ReceiptVat } from "@/types/receipt-vat.type";

export class ReceiptDTO {
  constructor(
    public store_name: null | string,
    public store_address: null | string,
    public nip: null | string,
    public receipt_number: null | string,
    public date: null | string,
    public time: null | string,
    public products: ReceiptItem[],
    public total: null | number,
    public payment_method: null | string,
    public currency: null | string,
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
