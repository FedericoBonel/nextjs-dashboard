import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/breadcrumbs";
import { getInvoice } from "@/apis/services/invoices";
import { getCustomers } from "@/apis/services/customers";
import { verifyUserExists } from "@/lib/auth";

import UpdateInvoiceForm from "./edit-form";

const createBreadcrumbs = (invoiceId: string) => [
  { label: "Invoices", href: "/dashboard/invoices" },
  {
    label: "Update Invoice",
    href: `/dashboard/invoices/${invoiceId}/update`,
    active: true,
  },
];

export default async function UpdateInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await verifyUserExists();

  const { id } = await params;
  const [customers, invoice] = await Promise.all([
    getCustomers(),
    getInvoice(id),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs breadcrumbs={createBreadcrumbs(id)} />
      <UpdateInvoiceForm customers={customers} invoice={invoice} />
    </main>
  );
}
