import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/components/fonts";
import { countCustomersAndInvoicesAndRevenue } from "@/apis/services/reports";
import MESSAGES from "@/app/constants/messages";
import { formatCurrency } from "@/app/lib/utils";

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const { totalCustomers, totalInvoices, totalAmountByStatus } =
    await countCustomersAndInvoicesAndRevenue();

  return (
    <>
      <Card
        title={MESSAGES.dashboardCollectInvTitle}
        value={formatCurrency(totalAmountByStatus.paid)}
        type="collected"
      />
      <Card
        title={MESSAGES.dashboardPendingInvTitle}
        value={formatCurrency(totalAmountByStatus.pending)}
        type="pending"
      />
      <Card
        title={MESSAGES.dashboardTotalInvTitle}
        value={totalInvoices}
        type="invoices"
      />
      <Card
        title={MESSAGES.dashboardCustomersTitle}
        value={totalCustomers}
        type="customers"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "invoices" | "customers" | "pending" | "collected";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
