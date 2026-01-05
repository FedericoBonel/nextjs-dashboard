import { notFound } from "next/navigation";
import UpdateInvoiceForm from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { getInvoice } from "@/apis/services/invoices";
import { getCustomers } from "@/apis/services/customers";

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
