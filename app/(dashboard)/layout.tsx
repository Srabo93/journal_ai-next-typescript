import Navigation from "@/components/Navigation";
import NavigationMobile from "@/components/NavigationMobile";
import { NavLinks } from "@/global";
import { UserButton } from "@clerk/nextjs";
import { PropsWithChildren } from "react";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const links: NavLinks = [
    { href: "/journal", label: "Journal" },
    { href: "/history", label: "History" },
  ];

  return (
    <div className="h-screen sm:flex-row md:flex">
      <Navigation links={links} />
      <div className="flex flex-1 flex-col">
        <header className="border-b  border-black/10 sm:h-auto md:h-20">
          <div className="flex h-full w-full items-center justify-between px-6  py-4">
            <h3 className="hidden pr-2 text-3xl md:inline-block">JournalAI</h3>
            <NavigationMobile links={links} />
            <UserButton />
          </div>
        </header>
        <div className="flex-1  p-4 md:p-8 lg:p-12">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
