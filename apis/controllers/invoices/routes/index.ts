import { NextRequest, NextResponse } from "next/server";

import { getInvoicesByQuery } from "@/apis/services/invoices";
import { validatePaginatedTextSearchDTO } from "@/apis/validators/dtos/shared/textSearch";

import {
  createBadRequestResponse,
  createFailedResponse,
  createSuccessResponse,
} from "../../utils/responses";

/** Request handler that gets a list of invoices by text search, page, and limit */
export const getInvoicesByTextSearchPageAndLimit = async (
  request: NextRequest
) => {
  // Validate query params
  const page = request.nextUrl.searchParams.get("page");
  const limit = request.nextUrl.searchParams.get("limit");
  const textSearch = request.nextUrl.searchParams.get("textSearch");

  const validQuery = validatePaginatedTextSearchDTO(textSearch, page, limit);

  if (!validQuery.success) {
    return NextResponse.json(createBadRequestResponse(validQuery.errors), {
      status: 400,
    });
  }

  // Get invoices and return them
  try {
    const invoices = await getInvoicesByQuery(
      validQuery.data.textSearch,
      validQuery.data.page,
      validQuery.data.limit
    );
    return NextResponse.json(createSuccessResponse(invoices), { status: 200 });
  } catch (error) {
    let message = "";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json(createFailedResponse(message), {
      status: 500,
    });
  }
};
