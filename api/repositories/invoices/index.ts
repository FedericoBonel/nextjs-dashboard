import { RowList } from "postgres";
import db from "@/api/db/connection";
import { createInvoice, Invoice } from "@/api/models/invoices";
import { getCustomerById } from "@/api/repositories/customers";
import dateToUTCDateString from "@/app/lib/utils/formatters/date-to-utc-date-string";

/** Gets an invoice by id */
export const getInvoiceById = async (id: string) => {
  if (!id) {
    throw new Error("An id for the invoice to get wasn't provided");
  }

  try {
    const data = await db`
      SELECT 
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.id as customer_id,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices JOIN customers ON invoices.customer_id = customers.id 
      WHERE invoices.id = ${id}
    `;

    if (!data[0]) return undefined;

    return createInvoice({
      id: data[0].id,
      amount: Number(data[0].amount),
      date: data[0].date,
      status: data[0].status,
      customer: {
        id: data[0].customer_id,
        name: data[0].name,
        email: data[0].email,
        image_url: data[0].image_url,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoice.");
  }
};

/** Gets the invoices that match the text search query */
export async function getAllInvoicesBy(
  offset: number,
  limit: number,
  textSearch: string
) {
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
        customers.name ILIKE ${`%${textSearch}%`} OR
        customers.email ILIKE ${`%${textSearch}%`} OR
        invoices.amount::text ILIKE ${`%${textSearch}%`} OR
        invoices.date::text ILIKE ${`%${textSearch}%`} OR
        invoices.status ILIKE ${`%${textSearch}%`}
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

/** Counts the total number of invoices for the given text search query */
export const countInvoicesBy = async (textSearch?: string) => {
  try {
    let count: RowList<{ count: number }[]>;
    if (!textSearch) {
      count = await db`SELECT COUNT(*) FROM invoices`;
    } else {
      count = await db`
      SELECT COUNT(*) FROM invoices 
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${textSearch}%`} OR
        customers.email ILIKE ${`%${textSearch}%`} OR
        invoices.amount::text ILIKE ${`%${textSearch}%`} OR
        invoices.date::text ILIKE ${`%${textSearch}%`} OR
        invoices.status ILIKE ${`%${textSearch}%`}
      `;
    }

    return Number(count[0].count ?? 0);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to count invoices.");
  }
};

/** Sums the total money amount of invoices grouping by status */
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
    console.error("Database Error:", error);
    throw new Error("Failed to count invoices by status.");
  }
};

/** Creates an invoice */
export const insertInvoice = async (newInvoice: Omit<Invoice, "id">) => {
  try {
    const createdAt = dateToUTCDateString(newInvoice.date);

    const savedInvoice = await db`
      INSERT INTO invoices (customer_id, amount, status, date) 
      VALUES (${newInvoice.customer.id}, ${newInvoice.amount}, ${newInvoice.status}, ${createdAt})
      RETURNING *
    `;

    return createInvoice({ ...savedInvoice[0], customer: newInvoice.customer });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create invoice.");
  }
};

/** Updates an invoice by id */
export const updateInvoiceById = async (
  id: string,
  updatedInvoice: Omit<Invoice, "id" | "date">
) => {
  if (!id) {
    throw new Error("An id for the invoice to be updated wasn't provided");
  }

  try {
    const savedInvoice = await db`
      UPDATE invoices 
      SET customer_id = ${updatedInvoice.customer.id}, amount = ${updatedInvoice.amount}, status = ${updatedInvoice.status} 
      WHERE id = ${id}
      RETURNING *
    `;

    if (!savedInvoice[0]) return undefined;

    return createInvoice({
      ...savedInvoice[0],
      customer: updatedInvoice.customer,
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update invoice.");
  }
};

/** Deletes an invoice by id */
export const deleteInvoiceById = async (id: string) => {
  if (!id) {
    throw new Error("An id for the invoice to be deleted wasn't provided");
  }

  try {
    const deletedInvoice = await db`
      DELETE 
      FROM invoices
      WHERE id = ${id}
      RETURNING *
    `;

    if (!deletedInvoice[0] || !deletedInvoice[0].customer_id) return undefined;

    const customer = await getCustomerById(deletedInvoice[0].customer_id);

    return createInvoice({ ...deletedInvoice[0], customer });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete invoice.");
  }
};
