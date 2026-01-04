import db from "@/app/lib/db/connection";
import { createCustomer } from "@/app/lib/models/customer";

/** Counts the number of customers */
export const countCustomers = async () => {
  try {
    const count = await db`SELECT COUNT(*) FROM customers`;

    return Number(count[0].count ?? 0);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to count customers.");
  }
};

/** Gets all the customers */
export const getAllCustomers = async () => {
  try {
    const customers = await db`SELECT * FROM customers ORDER BY name ASC`;

    return customers.map(createCustomer);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch customers.");
  }
};
