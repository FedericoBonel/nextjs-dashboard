import {
  countInvoicesBy,
  getInvoiceById,
  getInvoicesBy,
} from "@/app/lib/repositories/invoices";

const DEFAULT_LIMIT = 5;

/** Gets an invoice by id */
export const getInvoice = async (id: string) => {
  return getInvoiceById(id);
};

/** Gets the latest invoices with the given limit */
export const getLatestInvoices = async (limit = DEFAULT_LIMIT) => {
  return getInvoicesBy(limit, 1, "");
};

/** Gets the invoices for the given page by query */
export const getInvoicesByQuery = async (query: string, page: number) => {
  return getInvoicesBy(DEFAULT_LIMIT, page, query);
};

/** Gets the number of invoice pages for the given query and limit */
export const getInvoicePageCount = async (
  query: string,
  limit = DEFAULT_LIMIT
) => {
  const totalInvoices = await countInvoicesBy(query);

  return Math.ceil(totalInvoices / limit);
};
