"use client";
import { useRouter } from "next/navigation";

import { FaceFrownIcon } from "@heroicons/react/24/outline";

import Error from "@/components/error";

/**
 * This component renders when the nested segment uses `notFound()`.
 *
 * This doesn't need to be a client component, but we need to use the `useRouter` hook here so that's why it is.
 *
 * This will take precedence over the nearest error boundary (`error.tsx`).
 */
export default function NotFound() {
  const router = useRouter();

  return (
    <Error
      icon={<FaceFrownIcon className="w-24 text-gray-400" />}
      title="404 Not Found"
      message="We couldn't find what you were looking for."
      className="h-[100dvh]"
      scapeHref="/"
    />
  );
}
