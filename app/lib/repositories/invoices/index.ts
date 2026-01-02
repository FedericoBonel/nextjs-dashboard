import db from "@/app/lib/db/connection";
import { createInvoice } from "@/app/lib/models/invoices";
import { RowList } from "postgres";

/** Gets the invoices of the given page and limit for the given query */
export async function getInvoicesBy(
  limit: number,
  page: number,
  query: string
) {
  const offset = (page - 1) * limit;

  try {
    const invoices = await db`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.id as customer_id,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC, customers.name ASC
      LIMIT ${limit} OFFSET ${offset}
    `;

    return invoices.map((inv) =>
      createInvoice({
        id: inv.id,
        amount: Number(inv.amount),
        date: inv.date,
        status: inv.status,
        customer: {
          id: inv.customer_id,
          name: inv.name,
          email: inv.email,
          image_url: inv.image_url,
        },
      })
    );
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

/** Counts the total number of invoices for the given query */
export const countInvoicesBy = async (query?: string) => {
  try {
    let count: RowList<{ count: number }[]>;
    if (!query) {
      count = await db`SELECT COUNT(*) FROM invoices`;
    } else {
      count = await db`
      SELECT COUNT(*) FROM invoices 
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      `;
    }

    return Number(count[0].count ?? 0);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to count invoices.");
  }
};

/** Sums the total amount of invoices grouping by status */
export const getInvoicesAmountGroupByStatus = async () => {
  try {
    const counts = await db`
      SELECT 
        SUM(
          CASE WHEN status = 'paid' 
          THEN amount 
          ELSE 0 END
        ) as paid,
        SUM(
          CASE WHEN status = 'pending' 
          THEN amount 
          ElSE 0 END
        ) as pending
      FROM invoices
    `;

    return {
      paid: Number(counts[0].paid ?? 0),
      pending: Number(counts[0].pending ?? 0),
    };
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Failed to count invoices by status.");
  }
};
