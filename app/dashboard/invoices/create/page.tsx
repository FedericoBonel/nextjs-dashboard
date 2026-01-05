import CreateInvoiceForm from "@/app/ui/invoices/create-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { getCustomers } from "@/apis/services/customers";

const BREADCRUMBS = [
  { label: "Invoices", href: "/dashboard/invoices" },
  { label: "Create Invoice", href: "/dashboard/invoices/create", active: true },
];

const CreateInvoicePage = async () => {
  const allCustomers = await getCustomers();

  return (
    <main>
      <Breadcrumbs breadcrumbs={BREADCRUMBS} />
      <CreateInvoiceForm customers={allCustomers} />
    </main>
  );
};

export const dynamic = "force-dynamic";

export default CreateInvoicePage;
