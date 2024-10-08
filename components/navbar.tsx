"use client";

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const routes = [
  {
    name: "Read me",
    path: "/read-me",
  },
  {
    name: "Chatt",
    path: "/",
  },
  {
    name: "Inställningar",
    path: "/settings",
  },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center bg-black-theme text-white dark:bg-hero dark:text-black-theme px-2 py-4 lg:p-4">
      <Link href={"/"}>
        <h1 className="text-lg lg:text-2xl font-bold">Fast & Fit</h1>
      </Link>
      <div className="space-x-2 lg:space-x-6 flex items-center text-sm lg:text-lg">
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={cn(
              "p-1",
              pathname === route.path &&
                "border-b-2 border-hero dark:border-white"
            )}
          >
            {route.name}
          </Link>
        ))}

        {/* <ThemeToggle /> */}

        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
