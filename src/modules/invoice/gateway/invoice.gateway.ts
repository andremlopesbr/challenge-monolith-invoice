import Invoice from "../domain/invoice.entity";

export default interface InvoiceGateway {
<<<<<<< HEAD
  generate(invoice: Invoice): Promise<void>;
    find(id: string): Promise<Invoice>;
=======
  create(invoice: Invoice): Promise<void>;
  find(id: string): Promise<Invoice>;
>>>>>>> 693ae26 (feat: sync local changes with repository)
}
