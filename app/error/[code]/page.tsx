import { ReactNode } from "react";
import { BellAlertIcon, FaceFrownIcon } from "@heroicons/react/24/outline";
import Error from "@/app/ui/error";

const defaultMessages = {
  icon: <BellAlertIcon className="w-24 text-gray-400" />,
  title: "Unexpected Error",
  message: "Oops, it seems something went wrong.",
};

const messagesForErrors: Record<
  string,
  { icon: ReactNode; title: string; message: string }
> = {
  "500": defaultMessages,
  "404": {
    icon: <FaceFrownIcon className="w-24 text-gray-400" />,
    title: "404 Not found",
    message: "We couldn't find what you were looking for.",
  },
};

export default async function ErrorPage(props: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await props.params;

  const messagesForCode = messagesForErrors[code] || defaultMessages;

  return (
    <Error
      icon={messagesForCode.icon}
      title={messagesForCode.title}
      message={messagesForCode.message}
      scapeHref="/"
      scapeLabel="Go back home"
      className="h-[100dvh]"
    />
  );
}
