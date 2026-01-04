import { getAllRevenues } from "@/app/lib/repositories/revenue";

/** Get all revenue data */
export const getRevenue = async () => {
  return await getAllRevenues();
};
