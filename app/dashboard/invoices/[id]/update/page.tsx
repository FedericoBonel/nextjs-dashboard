import UpdateInvoiceForm from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import { notFound } from "next/navigation";

const createBreadcrumbs = (invoiceId: string) => [
  { label: "invoices", href: "/dashboard/invoices" },
  {
    label: "update",
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
    fetchCustomers(),
    fetchInvoiceById(id),
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
