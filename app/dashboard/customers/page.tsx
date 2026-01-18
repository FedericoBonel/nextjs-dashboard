import { verifyUserExists } from "@/lib/auth";

const Customers = async () => {
  await verifyUserExists();

  return <div>Customers Page</div>;
};

export default Customers;
