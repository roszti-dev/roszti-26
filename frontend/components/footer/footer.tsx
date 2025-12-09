import Link from "next/link";
import { links } from "@/lib/links";

export default function Footer() {
  return (
    <div className="fixed bg-background bottom-0 h-16 w-full md:hidden border-t grid grid-cols-3 px-2">
      {links
        .filter((link) => link.onFooter)
        .map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-xs flex flex-col items-center justify-center gap-y-1 text-muted-foreground"
          >
            <link.icon className="text-primary" />
            {link.label}
          </Link>
        ))}
      <Link
        href="/profile"
        className="text-xs flex flex-col items-center justify-center gap-y-1 text-muted-foreground"
      >
        <div className="size-6 shrink-0 text-xs font-semibold rounded-full text-primary-foreground flex items-center justify-center bg-primary aspect-square">
          VB
        </div>
        Profile
      </Link>
    </div>
  );
}
