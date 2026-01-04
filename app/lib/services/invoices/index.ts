import {
  countInvoicesBy,
  getInvoiceById,
  getAllInvoicesBy,
} from "@/app/lib/repositories/invoices";
import getOffsetFromPage from "../utils/get-offset-from-page";

const DEFAULT_LIMIT = 5;

/** Gets an invoice by id */
export const getInvoice = async (id: string) => {
  return getInvoiceById(id);
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
