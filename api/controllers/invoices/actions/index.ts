// ! EVERY FUNCTION EXPORTED FROM HERE 'use server' WILL BE AN EXPOSED POST HTTP ENDPOINT FROM THE SERVER
// ! THIS MEANS YOU SHOULD EXERCISE SAME LEVEL OF SECURITY AND CHECKS AS ANY HTTP API, DON'T THINK THIS IS ONLY REACHABLE FROM WHEREVER YOU CALL IT
"use server";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { deleteInvoice, saveInvoice, updateInvoice } from "@/api/services/invoices";
import validateCreateInvoiceDTO from "@/api/validators/dtos/invoices/create-invoice";
import validateUpdateInvoiceDTO from "@/api/validators/dtos/invoices/update-invoice";
import validateIdDTO from "@/api/validators/dtos/shared/id";
import currencyToDiscrete from "@/app/lib/utils/formatters/currency-to-discrete";
import NotFoundError from "@/api/utils/errors/NotFoundError";
import {
  createBadRequestError,
  createInternalServerError,
} from "../../action-state";
import { ActionState } from "../../types";

export async function createInvoice(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Validate and format the data
  const rawData = {
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  };

  const validationRes = validateCreateInvoiceDTO(rawData);

  if (!validationRes.success) {
    return createBadRequestError(validationRes.errors);
  }

  validationRes.data.amount = currencyToDiscrete["usd"](
    validationRes.data.amount
  );

  try {
    await saveInvoice(validationRes.data);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return notFound();
    }
    return createInternalServerError();
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function updateInvoiceById(
  id: string,
  _previousState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // Validate and format the data
  const rawData = {
    id,
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  };

  const validationRes = validateUpdateInvoiceDTO(rawData);

  if (!validationRes.success) {
    return createBadRequestError(validationRes.errors);
  }

  validationRes.data.amount = currencyToDiscrete["usd"](
    validationRes.data.amount
  );

  try {
    await updateInvoice(id, validationRes.data);
  } catch (error) {
    if (error instanceof NotFoundError) {
      return notFound();
    }

    return createInternalServerError();
  }

  // Revalidate the invoices path to show latest data, and redirect to it
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoiceById(id: string) {
  try {
    // validate the id
    const validationRes = validateIdDTO(id);

    if (!validationRes.success) {
      return createBadRequestError(validationRes.errors);
    }

    // delete the invoice
    await deleteInvoice(id);
  } catch (e) {
    if (e instanceof NotFoundError) {
      return notFound();
    }
    return createInternalServerError();
  }

  // revalidate the path
  revalidatePath("/dashboard/invoices");
}
