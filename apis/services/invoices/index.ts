import {
  countInvoicesBy,
  getInvoiceById,
  getAllInvoicesBy,
  insertInvoice,
  updateInvoiceById,
  deleteInvoiceById,
} from "@/apis/repositories/invoices";
import { getCustomerById } from "@/apis/repositories/customers";
import { CreateInvoiceDTO } from "@/apis/validators/dtos/invoices/create-invoice";
import { UpdateInvoiceDTO } from "@/apis/validators/dtos/invoices/update-invoice";
import NotFoundError from "@/apis/utils/errors/NotFoundError";
import {
  createInvoiceDTOToInvoice,
  invoiceToInvoiceDetailsDTO,
  updateInvoiceDTOToInvoice,
} from "../utils/transformers/invoices";
import getOffsetFromPage from "../utils/get-offset-from-page";

const DEFAULT_LIMIT = 5;

// TODO: Move all to use DTOs

/** Gets an invoice by id */
export const getInvoice = async (id: string) => {
  const invoice = await getInvoiceById(id);

  if (!invoice) return undefined;

  return invoiceToInvoiceDetailsDTO(invoice);
};

/** Gets the latest invoices with the given limit */
export const getLatestInvoices = async (limit = DEFAULT_LIMIT) => {
  const offset = getOffsetFromPage(1, limit);

  return getAllInvoicesBy(offset, limit, "");
};

/** Gets the invoices for the given page by query */
export const getInvoicesByQuery = async (
  query: string,
  page: number,
  limit = DEFAULT_LIMIT
) => {
  const offset = getOffsetFromPage(page, limit);

  return getAllInvoicesBy(offset, limit, query);
};

/** Gets the number of invoice pages for the given query and limit */
export const getInvoicePageCount = async (
  query: string,
  limit = DEFAULT_LIMIT
) => {
  const totalInvoices = await countInvoicesBy(query);

  return Math.ceil(totalInvoices / limit);
};

/** Creates a new invoice */
export const saveInvoice = async (NewInvoice: CreateInvoiceDTO) => {
  const foundCustomer = await getCustomerById(NewInvoice.customerId);

  if (!foundCustomer) {
    throw new NotFoundError("The customer couldn't be found");
  }

  const savedInvoice = await insertInvoice(
    createInvoiceDTOToInvoice(NewInvoice, foundCustomer)
  );

  return invoiceToInvoiceDetailsDTO(savedInvoice);
};

/** Updates an invoice by id */
export const updateInvoice = async (
  id: string,
  UpdatedInvoice: UpdateInvoiceDTO
) => {
  const foundCustomer = await getCustomerById(UpdatedInvoice.customerId);

  if (!foundCustomer) {
    throw new NotFoundError("The customer couldn't be found");
  }

  const savedInvoice = await updateInvoiceById(
    id,
    updateInvoiceDTOToInvoice(UpdatedInvoice, foundCustomer)
  );

  if (!savedInvoice) {
    throw new NotFoundError("The invoice couldn't be found");
  }

  return invoiceToInvoiceDetailsDTO(savedInvoice);
};

/** Deletes an invoice by id */
export const deleteInvoice = async (id: string) => {
  const deletedInvoice = await deleteInvoiceById(id);

  if (!deletedInvoice) {
    throw new NotFoundError("The invoice couldn't be found");
  }

  return invoiceToInvoiceDetailsDTO(deletedInvoice);
};
