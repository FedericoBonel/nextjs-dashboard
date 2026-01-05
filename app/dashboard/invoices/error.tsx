"use client";

import { BellAlertIcon } from "@heroicons/react/24/outline";
import Error from "@/components/error";

/**
 * This component is rendered when an error is thrown while rendering any component in the route
 * or its nested routes (if they don't have their own error boundary).
 *
 * Internally, Next.js wraps the nested route with an ErrorBoundary component from React and uses this as the fallback.
 */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Error
      icon={<BellAlertIcon className="w-24 text-gray-400" />}
      title="Unexpected Error"
      message="Oops, it seems something went wrong"
      onScape={reset}
      scapeLabel="Try again"
    />
  );
}
