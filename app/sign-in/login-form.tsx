"use client";

import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { lusitana } from "@/components/fonts";
import { AtSymbolIcon, KeyIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

import { initialState } from "@/apis/controllers/action-state";
import { authenticateUser } from "@/apis/controllers/auth/actions";
import Form from "@/components/form/Form";
import FormError from "@/components/form/FormError";

export default function LoginForm() {
  const searchParams = useSearchParams();
  // This can be attached by NextAuth automatically or by us on authorized (@/lib/auth)
  const redirectUrl = searchParams.get("redirectTo") || "/dashboard";

  const [state, authenticateAction, isPending] = useActionState(
    authenticateUser,
    initialState
  );

  return (
    <Form
      action={authenticateAction}
      isPending={isPending}
      hideCancel
      fullWidthActions
      submitLabel="Sign in"
      submitIcon={<ArrowRightIcon className="ml-auto h-5 w-5" />}
      className="flex-1 rounded-lg bg-gray-50 p-4 md:p-6"
    >
      <h1 className={`${lusitana.className} mb-3 text-2xl`}>
        Please log in to continue.
      </h1>
      <div className="w-full">
        <div>
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        <div className="mt-4">
          <label
            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              required
              minLength={4}
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
        {/* NextAuth uses the "redirectTo" value to redirect the user to that page after signing in, if not provided we must manually handle this either in action or here */}
        <input type="hidden" name="redirectTo" value={redirectUrl} />
      </div>
      <hr />
      <FormError message={state.message} />
    </Form>
  );
}
