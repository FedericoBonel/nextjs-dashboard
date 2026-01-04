import { z } from "zod";

export const revenueSchema = z.object({
  month: z.string(),
  revenue: z.coerce.number().int(),
});

export type Revenue = z.infer<typeof revenueSchema>;

export const createRevenue = (row: unknown): Revenue => {
  const isRevenue = revenueSchema.safeParse(row);

  if (!isRevenue.success) {
    throw new Error(
      `Invalid revenue data: ${JSON.stringify(isRevenue.error, undefined, 2)}`
    );
  }

  return isRevenue.data;
};
