import { getRevenueBy } from "@/app/lib/repositories/revenue";

/** Get all revenue data */
export const getRevenue = async () => {
  return await getRevenueBy();
};
