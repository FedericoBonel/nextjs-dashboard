import { getAllRevenues } from "@/api/repositories/revenue";

/** Get all revenue data */
export const getRevenue = async () => {
  return await getAllRevenues();
};
