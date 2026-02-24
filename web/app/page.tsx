import Link from "next/link";
import { DottedGlowBackground } from "@/components/aceternity/dotted-glow-background";
import { HeroCta } from "@/components/hero-cta";
import { Separator } from "@/components/ui/separator";
import { strings } from "@/lib/strings";

export default function HomePage() {
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center px-6">
      <DottedGlowBackground
        className="pointer-events-none"
        opacity={0.7}
        gap={14}
        radius={1.4}
        colorLightVar="--color-neutral-400"
        glowColorLightVar="--color-neutral-500"
        colorDarkVar="--color-neutral-500"
        glowColorDarkVar="--color-sky-700"
        speedMin={0.3}
        speedMax={1.2}
        speedScale={0.8}
      />

      {/* Radial fade: clears the center for readable text */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,var(--color-background)_60%,transparent_100%)] sm:bg-[radial-gradient(ellipse_50%_45%_at_50%_50%,var(--color-background)_60%,transparent_100%)]" />

      <div className="relative z-10 flex max-w-xl flex-col items-center gap-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          {strings.home.heading}
        </h1>

        <p className="text-lg text-muted-foreground">{strings.home.sub}</p>

        <Separator className="w-24" />

        <p className="text-sm leading-relaxed text-muted-foreground">
          {strings.home.desc}
        </p>

        <p className="text-xs text-muted-foreground/60">
          {strings.home.inspired}{" "}
          <Link
            href="https://karpathy.github.io/2026/02/12/microgpt/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-muted-foreground"
          >
            microgpt
          </Link>
          {strings.home.inspiredEnd}
        </p>

        <HeroCta />
      </div>
    </main>
  );
}
