import { getAllRevenues } from "@/apis/repositories/revenue";

/** Get all revenue data */
export const getRevenue = async () => {
  return await getAllRevenues();
};
