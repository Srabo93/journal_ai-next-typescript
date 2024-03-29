"use client";
import Link from "next/link";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { RxPinLeft, RxHamburgerMenu } from "react-icons/rx";
import { NavigationProps } from "@/global";

const Navigation = ({ links }: NavigationProps) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      {!open && (
        <aside className="hidden w-auto border-r border-black/10 md:block">
          <div className="mx-2 my-2 flex items-center justify-between text-2xl font-bold">
            {!open && (
              <RxHamburgerMenu
                size="1.5em"
                title="open menu"
                onClick={() => setOpen(true)}
                className="hover:cursor-pointer"
              />
            )}
          </div>
        </aside>
      )}
      {open && (
        <aside className="hidden w-auto border-r border-black/10 md:block">
          <div className="mx-2 my-2 flex items-center justify-between text-2xl font-bold">
            {open && (
              <RxPinLeft
                size="1.5em"
                title="close menu"
                onClick={() => setOpen(false)}
                className="ml-auto self-end hover:cursor-pointer"
              />
            )}
          </div>
          <NavigationMenu
            className="flex max-w-full flex-col place-items-end"
            style={{ alignItems: "flex-start" }}
          >
            <NavigationMenuList className="flex flex-col">
              {links.map((link) => (
                <NavigationMenuItem key={link.label}>
                  <Link href={link.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${navigationMenuTriggerStyle()} text-xl font-normal`}
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </aside>
      )}
    </>
  );
};

export default Navigation;
