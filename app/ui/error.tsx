"use client";

import { Button } from "./button";

interface ErrorProps {
  title: string;
  message: string;
  onScape?: () => void;
  scapeLabel?: string;
  icon?: React.ReactNode;
}

export default function Error({
  title,
  message,
  onScape,
  scapeLabel,
  icon,
}: ErrorProps) {
  return (
    <div className="flex flex-col justify-center items-center h-full gap-4 md:gap-6">
      {icon}
      <h2 className="text-xl md:text-2xl text-center font-semibold">
        {title}
      </h2>
      <p className="text-center text-muted-foreground max-w-sm">
        {message}
      </p>
      <Button onClick={onScape}>{scapeLabel}</Button>
    </div>
  );
}
