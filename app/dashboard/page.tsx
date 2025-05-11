import { lusitana } from "@/app/ui/fonts";
import { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import {
  fetchRevenue,
  fetchLatestInvoices,
  fetchCardData,
} from "@/app/lib/data";
import MESSAGES from "@/app/constants/messages";

const Dashboard = async () => {
  const [
    {
      totalPendingInvoices,
      totalPaidInvoices,
      numberOfInvoices,
      numberOfCustomers,
    },
    revenue,
    invoices,
  ] = await Promise.all([
    fetchCardData(),
    fetchRevenue(),
    fetchLatestInvoices(),
  ]);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        {MESSAGES.dashboardTitle}
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          title={MESSAGES.dashboardCollectInvTitle}
          value={totalPaidInvoices}
          type="collected"
        />
        <Card
          title={MESSAGES.dashboardPendingInvTitle}
          value={totalPendingInvoices}
          type="pending"
        />
        <Card
          title={MESSAGES.dashboardTotalInvTitle}
          value={numberOfInvoices}
          type="customers"
        />
        <Card
          title={MESSAGES.dashboardCustomersTitle}
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={invoices} />
      </div>
    </main>
  );
};

export default Dashboard;
