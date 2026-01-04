import { Customer } from "@/app/lib/models/customer";
import { Invoice } from "@/app/lib/models/invoices";
import { CreateInvoiceDTO } from "@/app/lib/validators/dtos/invoices/create-invoice";
import { UpdateInvoiceDTO } from "@/app/lib/validators/dtos/invoices/update-invoice";
import validateInvoiceDetailsDTO, {
  InvoiceDetailsDTO,
} from "@/app/lib/validators/dtos/invoices/invoice-details";
import InternalServerError from "@/app/lib/utils/errors/InternalServerError";

/** Converts an invoice as received from the web to be created to an Invoice model */
export const createInvoiceDTOToInvoice = (
  newInvoice: CreateInvoiceDTO,
  customer: Customer
): Omit<Invoice, "id"> => {
  return {
    customer,
    amount: newInvoice.amount,
    status: newInvoice.status,
    date: new Date(),
  };
};

/** Converts an invoice as received from the web to be updated to an Invoice model */
export const updateInvoiceDTOToInvoice = (
  updatedInvoice: UpdateInvoiceDTO,
  customer: Customer
): Omit<Invoice, "date"> => {
  return {
    id: updatedInvoice.id,
    customer,
    amount: updatedInvoice.amount,
    status: updatedInvoice.status,
  };
};

/** Converts an invoice model to an invoice details DTO to be used in the web */
export const invoiceToInvoiceDetailsDTO = (
  savedInvoice: Invoice
): InvoiceDetailsDTO => {
  const res = validateInvoiceDetailsDTO(savedInvoice);

  if (!res.success) {
    throw new InternalServerError("The saved invoice has an unexpected schema");
  } else {
    return res.data;
  }
};
