"use client";

import { useActionState } from "react";
import Link from "next/link";
import clsx from "clsx";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import { CustomerField } from "@/app/lib/definitions";
import { createInvoice } from "@/app/lib/controllers/invoices/actions";
import { ActionState } from "@/app/lib/controllers/types";
import Form from "@/app/ui/form/Form";
import FieldErrors from "@/app/ui/form/FieldErrors";
import FormError from "../form/FormError";

const initialState: ActionState = {
  message: null,
  errors: {},
};

export default function CreateInvoiceForm({
  customers,
}: {
  customers: CustomerField[];
}) {
  const [actionState, createInvoiceAction, isPending] = useActionState<
    ActionState,
    FormData
  >(createInvoice, initialState);

  return (
    <Form
      action={createInvoiceAction}
      isPending={isPending}
      submitLabel="Create Invoice"
    >
      {/* Customer Name */}
      <div className="mb-4">
        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
          Choose customer
        </label>
        <div className="relative">
          <select
            id="customer"
            name="customerId"
            className={clsx(
              "peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500",
              actionState.errors.customerId && "border-red-600"
            )}
            defaultValue=""
            aria-describedby="customerId-errors"
          >
            <option value="" disabled>
              Select a customer
            </option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
        <FieldErrors
          id="customerId-errors"
          errors={actionState.errors.customerId}
        />
      </div>

      {/* Invoice Amount */}
      <div className="mb-4">
        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
          Choose an amount
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              placeholder="Enter USD amount"
              className={clsx(
                "peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500",
                actionState.errors.amount && "border-red-600"
              )}
              aria-describedby="amount-errors"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <FieldErrors id="amount-errors" errors={actionState.errors.amount} />
        </div>
      </div>

      {/* Invoice Status */}
      <fieldset aria-describedby="status-errors">
        <legend className="mb-2 block text-sm font-medium">
          Set the invoice status
        </legend>
        <div
          className={clsx(
            "rounded-md border border-gray-200 bg-white px-[14px] py-3",
            actionState.errors.status && "border-red-600"
          )}
        >
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <input
                id="pending"
                name="status"
                type="radio"
                value="pending"
                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
              />
              <label
                htmlFor="pending"
                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
              >
                Pending <ClockIcon className="h-4 w-4" />
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="paid"
                name="status"
                type="radio"
                value="paid"
                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
              />
              <label
                htmlFor="paid"
                className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
              >
                Paid <CheckIcon className="h-4 w-4" />
              </label>
            </div>
          </div>
        </div>
        <FieldErrors id="status-errors" errors={actionState.errors.status} />
      </fieldset>

      <FormError className="mt-4" message={actionState.message} />
    </Form>
  );
}
