import db from "@/app/lib/db/connection";
import { createRevenue } from "@/app/lib/models/revenue";

/** Gets all revenue data */
export const getAllRevenues = async () => {
  try {
    // This is a super bad query, and also the revenue sucks internally, but is just for tutorial purposes
    const data = await db`SELECT * FROM revenue`;

    return data.map(createRevenue);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
};
