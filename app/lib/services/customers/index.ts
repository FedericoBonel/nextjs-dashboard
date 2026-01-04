import { getAllCustomers } from "../../repositories/customers";

/** Gets all customers */
export const getCustomers = async () => {
  return await getAllCustomers();
};
