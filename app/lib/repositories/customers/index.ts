import db from "@/app/lib/db/connection";

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
