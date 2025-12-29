"use client";

import { FormHTMLAttributes, PropsWithChildren } from "react";
import Link from "next/link";

import { Button } from "../button";
import { useRouter } from "next/navigation";

interface FormProps {
  action: FormHTMLAttributes<HTMLFormElement>["action"];
  isPending?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  cancelHref?: string;
}

const Form = ({
  action,
  children,
  isPending,
  cancelHref,
  cancelLabel = "Cancel",
  submitLabel = "Submit",
}: PropsWithChildren<FormProps>) => {
  const router = useRouter();

  const cancelButton = cancelHref ? (
    <Link
      href={cancelHref}
      className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
    >
      {cancelLabel}
    </Link>
  ) : (
    <Button
      type="button"
      className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
      onClick={router.back}
    >
      {cancelLabel}
    </Button>
  );

  return (
    <form action={action} aria-describedby="form-errors">
      <div className="rounded-md bg-gray-50 p-4 md:p-6">{children}</div>
      <div className="mt-6 flex justify-end gap-4">
        {cancelButton}
        <Button type="submit" disabled={isPending}>
          {submitLabel}
          {isPending && (
            <svg
              className="animate-spin h-5 w-5 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </Button>
      </div>
    </form>
  );
};

export default Form;
