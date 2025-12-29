"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/app/lib/utils";
import { Button } from "./button";
import Link from "next/link";

interface ErrorProps {
  title: string;
  message: string;
  scapeHref?: string;
  onScape?: () => void;
  scapeLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function Error({
  title,
  message,
  onScape,
  scapeHref,
  scapeLabel = "Go back",
  icon,
  className,
}: ErrorProps) {
  const router = useRouter();

  const scapeButton = scapeHref ? (
    <Link
      className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
      href={scapeHref}
    >
      {scapeLabel}
    </Link>
  ) : (
    <Button onClick={onScape || router.back}>{scapeLabel}</Button>
  );

  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center h-full gap-4 md:gap-6",
        className
      )}
    >
      {icon}
      <h2 className="text-xl md:text-2xl text-center font-semibold">{title}</h2>
      <p className="text-center text-muted-foreground max-w-sm">{message}</p>
      {scapeButton}
    </div>
  );
}
