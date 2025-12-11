import { LogOut } from "lucide-react";
import Link from "next/link";
import { links } from "@/lib/links";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle/theme-toggle";
import { Button, buttonVariants } from "../ui/button";

export default function Sidebar() {
  return (
    <nav className="fixed inset-y-0 left-0 hidden w-72 flex-col border-r bg-background md:flex">
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Link href="/" className="font-bold text-2xl">
          RÖsz<span className="text-primary">TI</span>
        </Link>
        <ThemeToggle />
      </div>
      <div className="flex flex-col gap-y-1 px-2 py-4">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "justify-start font-medium"
            )}
          >
            <link.icon className="text-primary" />
            {link.label}
          </Link>
        ))}
      </div>
      <div className="mt-auto p-4">
        <Button variant="ghost" className="w-full justify-start">
          <LogOut className="text-primary" />
          Logout
        </Button>
      </div>
    </nav>
  );
}
