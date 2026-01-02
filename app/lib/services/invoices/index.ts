import { getInvoicesBy } from "@/app/lib/repositories/invoices";

/** Gets the latest invoices with the given limit */
export const getLatestInvoices = async (limit = 5) => {
  return getInvoicesBy(limit, 1, "");
};
