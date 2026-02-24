"use client";

import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { strings } from "@/lib/strings";

export function HeroCta() {
  return (
    <div className="flex items-center gap-3">
      <Button
        size="lg"
        nativeButton={false}
        render={<Link href="/playground" />}
      >
        {strings.nav.openPlayground}
        <ArrowRight className="ml-2 size-4" />
      </Button>

      <Button
        variant="outline"
        size="lg"
        nativeButton={false}
        render={
          // biome-ignore lint/a11y/useAnchorContent: children injected by Base UI render prop
          <a
            href="https://github.com/mon-atelier-ia/microgpt-ts-fr"
            target="_blank"
            rel="noopener noreferrer"
          />
        }
      >
        <Github className="size-4" />
        {strings.nav.github}
      </Button>
    </div>
  );
}
