"use client";

import { useDebouncedCallback } from "use-debounce";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import MESSAGES from "@/app/constants/messages";
import { ChangeEventHandler } from "react";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback<
    ChangeEventHandler<HTMLInputElement>
  >((e) => {
    const params = new URLSearchParams(searchParams);

    if (e.target.value) {
      params.set("query", e.target.value);
    } else {
      params.delete("query");
    }
    params.set("page", "1");

    // Navigate to the new url with the search state without pushing into history
    // This will do SSR and merge server state with client one
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        {MESSAGES.searchLabel}
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        defaultValue={searchParams.get("query")?.toString()}
        onChange={handleSearch}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
