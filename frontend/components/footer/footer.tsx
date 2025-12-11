import Link from "next/link";
import { links } from "@/lib/links";

export default function Footer() {
  return (
    <div className="fixed bottom-0 grid h-16 w-full grid-cols-3 border-t bg-background px-2 md:hidden">
      {links
        .filter((link) => link.onFooter)
        .map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="flex flex-col items-center justify-center gap-y-1 text-muted-foreground text-xs"
          >
            <link.icon className="text-primary" />
            {link.label}
          </Link>
        ))}
      <Link
        href="/profile"
        className="flex flex-col items-center justify-center gap-y-1 text-muted-foreground text-xs"
      >
        <div className="flex aspect-square size-6 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground text-xs">
          VB
        </div>
        Profile
      </Link>
    </div>
  );
}
