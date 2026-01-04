import {
  getAllCustomers,
  getAllCustomersWithInvoiceSums,
} from "@/api/repositories/customers";
import { MAX_ENTITY_LOAD } from "@/api/services/utils/constants";

/** Gets all customers */
export const getCustomers = async () => {
  return await getAllCustomers(0, MAX_ENTITY_LOAD);
};

/** Gets all customers with the amount of paid and unpaid invoices for a text query */
export const getCustomersByQuery = (query: string) => {
  return getAllCustomersWithInvoiceSums(0, MAX_ENTITY_LOAD, query);
};
