import { LogOut } from "lucide-react";
import Link from "next/link";
import { links } from "@/lib/links";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";

export default function Sidebar() {
  return (
    <nav className="fixed hidden bg-background md:flex flex-col left-0 inset-y-0 w-72 border-r">
      <div className="h-16 flex items-center px-4 border-b justify-between">
        <Link href="/" className="text-2xl font-bold">
          RÖsz<span className="text-primary">TI</span>
        </Link>
        <div className="size-8 text-sm font-semibold rounded-full text-primary-foreground flex items-center justify-center bg-primary aspect-square">
          VB
        </div>
      </div>
      <div className="py-4 px-2 flex flex-col gap-y-1">
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
