import db from "@/api/db/connection";
import { createCustomer } from "@/api/models/customer";

/** Gets a customer by id */
export const getCustomerById = async (id: string) => {
  if (!id) {
    throw new Error("An id for the customer to get wasn't provided")
  }

  try {
    const foundCustomer = await db`SELECT * FROM customers WHERE id = ${id}`;

    if (!foundCustomer[0]) {
      return undefined;
    }

    return createCustomer(foundCustomer[0]);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch customer by id.");
  }
};

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
export const getAllCustomers = async (offset: number, limit: number) => {
  try {
    const customers =
      await db`SELECT * FROM customers ORDER BY name ASC OFFSET ${offset} LIMIT ${limit}`;

    return customers.map(createCustomer);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch customers.");
  }
};

/** Gets all customers for the given query and their total money debt and paid */
export const getAllCustomersWithInvoiceSums = async (
  offset: number,
  limit: number,
  textSearch: string
) => {
  try {
    const result = await db`
      SELECT 
        customers.id,
        customers.name,
        customers.email,
        customers.image_url,
        SUM(
          CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END
        ) as total_paid,
        SUM(
          CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END
        ) as total_pending
      FROM customers JOIN invoices ON customers.id = invoices.customer_id
      WHERE 
        customers.name ILIKE ${`%${textSearch}%`} OR
        customers.email ILIKE ${`%${textSearch}%`}
      GROUP BY customers.id, customers.name, customers.email, customers.image_url
      ORDER BY customers.name ASC
      OFFSET ${offset} LIMIT ${limit}
    `;

    return result.map(createCustomer);
  } catch (error) {
    console.error(`Database error: ${error}}`);
    throw new Error("Failed to fetch customers with invoice sums");
  }
};
