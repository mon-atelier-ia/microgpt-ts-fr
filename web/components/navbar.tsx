import { Github } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";

export function Navbar() {
  return (
    <header>
      <nav className="flex items-center justify-between px-6 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight">
          microgpt
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href="https://github.com/dubzdubz/microgpt-ts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="GitHub"
          >
            <Github className="size-4" />
          </a>
          <Link
            href="/about"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
        </div>
      </nav>
      <Separator />
    </header>
  );
}
