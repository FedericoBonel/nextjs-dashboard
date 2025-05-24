import { PropsWithChildren } from "react";
import { lusitana } from "@/app/ui/fonts";

const Header = ({ children }: PropsWithChildren) => {
  return (
    <div className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
      {children}
    </div>
  );
};

export default Header;
