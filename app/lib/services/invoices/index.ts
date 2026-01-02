import { getInvoicesBy } from "@/app/lib/repositories/invoices";

const DEFAULT_LIMIT = 5;

/** Gets the latest invoices with the given limit */
export const getLatestInvoices = async (limit = DEFAULT_LIMIT) => {
  return getInvoicesBy(limit, 1, "");
};

/** Gets the invoices for the given page by query */
export const getInvoicesByQuery = async (query: string, page: number) => {
  return getInvoicesBy(DEFAULT_LIMIT, page, query);
};
