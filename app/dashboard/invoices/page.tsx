import { Suspense } from "react";
import Header from "@/app/ui/header";
import Search from "@/app/ui/search";
import Pagination from "@/app/ui/pagination";
import { getInvoicePageCount } from "@/apis/services/invoices";
import MESSAGES from "@/app/constants/messages";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { CreateInvoice } from "./components/buttons";
import Table from "./components/table";

const Invoices = async (props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) => {
  // Use async search params in server to fetch and render list server side
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  const numberPages = await getInvoicePageCount(query);

  return (
    <div className="w-full">
      <Header>{MESSAGES.invoicesTitle}</Header>
      <div className="flex items-center justify-between gap-2 md:mt-2">
        <Search placeholder={MESSAGES.invoicesSearchTip} />
        <CreateInvoice />
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={page} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={numberPages} />
      </div>
    </div>
  );
};

export default Invoices;
