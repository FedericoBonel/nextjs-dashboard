import { Suspense } from "react";
import Header from "@/app/ui/header";
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from "@/app/ui/skeletons";
import MESSAGES from "@/app/constants/messages";
import CardWrapper from "./components/cards";
import RevenueChart from "./components/revenue-chart";
import LatestInvoices from "./components/latest-invoices";

const Dashboard = async () => {
  return (
    <main>
      <Header>{MESSAGES.dashboardTitle}</Header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
};

export const dynamic = "force-dynamic";

export default Dashboard;
