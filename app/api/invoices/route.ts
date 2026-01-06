import { NextRequest } from "next/server";
import { getInvoicesByTextSearchPageAndLimit } from "@/apis/controllers/invoices/routes";

export async function GET(req: NextRequest) {
  return getInvoicesByTextSearchPageAndLimit(req);
}
