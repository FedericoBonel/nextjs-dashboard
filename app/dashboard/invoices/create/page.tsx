import CreateInvoiceForm from "@/app/ui/invoices/create-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers } from "@/app/lib/data";

const BREADCRUMBS = [
  { label: "invoices", href: "/dashboard/invoices" },
  { label: "create", href: "/dashboard/invoices/create", active: true },
];

const CreateInvoicePage = async () => {
  const allCustomers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs breadcrumbs={BREADCRUMBS} />
      <CreateInvoiceForm customers={allCustomers} />
    </main>
  );
};

export default CreateInvoicePage;
