import { Customer } from "@/apis/models/customer";
import { Invoice } from "@/apis/models/invoices";
import { CreateInvoiceDTO } from "@/apis/validators/dtos/invoices/create-invoice";
import { UpdateInvoiceDTO } from "@/apis/validators/dtos/invoices/update-invoice";
import validateInvoiceDetailsDTO, {
  InvoiceDetailsDTO,
} from "@/apis/validators/dtos/invoices/invoice-details";
import validateInvoiceExcerptDTO, {
  InvoiceExcerptDTO,
} from "@/apis/validators/dtos/invoices/invoice-excerpt";
import InternalServerError from "@/apis/utils/errors/InternalServerError";

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

/** Converts an invoice model to an invoice excerpt DTO to be used in the web */
export const invoiceToInvoiceExcerptDTO = (
  savedInvoice: Invoice
): InvoiceExcerptDTO => {
  const res = validateInvoiceExcerptDTO(savedInvoice);

  if (!res.success) {
    throw new InternalServerError("The saved invoice has an unexpected schema");
  } else {
    return res.data;
  }
};
