import { countCustomers } from "@/app/lib/repositories/customers";
import {
  countInvoicesBy,
  getInvoicesAmountGroupByStatus,
} from "@/app/lib/repositories/invoices";

/** Gets the total amount of customers and invoices as well as the revenue grouped by status */
export const countCustomersAndInvoicesAndRevenue = async () => {
  const totalInvoicesPromise = countInvoicesBy();
  const invoicesByStatusPromise = getInvoicesAmountGroupByStatus();
  const totalCustomersPromise = countCustomers();

  const [totalAmountByStatus, totalInvoices, totalCustomers] =
    await Promise.all([
      invoicesByStatusPromise,
      totalInvoicesPromise,
      totalCustomersPromise,
    ]);

  return {
    totalCustomers,
    totalInvoices,
    totalAmountByStatus,
  };
};
