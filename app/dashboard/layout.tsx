import { PropsWithChildren } from "react";
import SideNav from "@/app/ui/dashboard/sidenav";

// Enable PPR on all pages under '/dashboard'
export const experimental_ppr = true;

/** children in a layout file are any pages nested inside this route, for this case "url/dashboard/*" */
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col h-screen md:flex-row md:overflow-hidden">
      <div className="w-full md:w-64 flex-none">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
};

export default Layout;
