import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { strings } from "@/lib/strings";

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col items-center overflow-y-auto px-6 py-12">
      <article className="flex max-w-xl flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">
            {strings.about.title}
          </h1>

          <p className="leading-relaxed text-muted-foreground">
            <code className="text-foreground/80">microgpt-ts</code>
            {strings.about.intro1a}
            <Link
              href="https://karpathy.github.io/2026/02/12/microgpt/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              microgpt
            </Link>
            {strings.about.intro1b}
          </p>

          <p className="leading-relaxed text-muted-foreground">
            {strings.about.intro2a}
            <Link
              href="https://github.com/dubzdubz/microgpt-ts"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              GitHub
            </Link>
            {strings.about.intro2b}
            <Link
              href="/playground"
              className="underline underline-offset-4 hover:text-foreground"
            >
              playground
            </Link>
            {strings.about.intro2c}
          </p>
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">{strings.about.whatsInside}</h2>

          <ul className="list-inside list-disc space-y-2 leading-relaxed text-muted-foreground">
            <li>
              {strings.about.insideLibThe}
              <strong className="text-foreground/80">microgpt-ts</strong>
              {strings.about.insideLib}
              <code className="text-foreground/80">Value</code>
              {strings.about.insideLibDesc}
            </li>
            <li>
              {strings.about.insidePlaygroundA}
              <strong className="text-foreground/80">
                {strings.about.insidePlayground}
              </strong>
              {strings.about.insidePlaygroundDesc}
            </li>
          </ul>
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">{strings.about.learnTitle}</h2>

          <p className="leading-relaxed text-muted-foreground">
            {strings.about.learnIntro}
          </p>

          <ol className="list-inside list-decimal space-y-1 text-sm text-muted-foreground">
            <li>
              <Link
                href="https://github.com/dubzdubz/microgpt-ts/pull/1"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-foreground"
              >
                {strings.about.step1}
              </Link>
              {strings.about.step1desc}
            </li>
            <li>
              <Link
                href="https://github.com/dubzdubz/microgpt-ts/pull/2"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-foreground"
              >
                {strings.about.step2}
              </Link>
            </li>
            <li>
              <Link
                href="https://github.com/dubzdubz/microgpt-ts/pull/3"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-foreground"
              >
                {strings.about.step3}
              </Link>
              {strings.about.step3desc}
              <code className="text-foreground/80">Value</code>
              {strings.about.step3descEnd}
            </li>
            <li>
              <Link
                href="https://github.com/dubzdubz/microgpt-ts/pull/4"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-foreground"
              >
                {strings.about.step4}
              </Link>
              {strings.about.step4desc}
            </li>
            <li>
              <Link
                href="https://github.com/dubzdubz/microgpt-ts/pull/5"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-foreground"
              >
                {strings.about.step5}
              </Link>
              {strings.about.step5desc}
            </li>
            <li>
              <Link
                href="https://github.com/dubzdubz/microgpt-ts/pull/6"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-foreground"
              >
                {strings.about.step6}
              </Link>
            </li>
          </ol>
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">{strings.about.diffTitle}</h2>

          <p className="leading-relaxed text-muted-foreground">
            {strings.about.diff1a}
            <code className="text-foreground/80">microgpt-ts</code>
            {strings.about.diff1b}
            <code className="text-foreground/80">dotProduct</code>,{" "}
            <code className="text-foreground/80">transpose</code>
            {strings.about.diff1bAnd}
            <code className="text-foreground/80">mean</code>.
          </p>

          <p className="leading-relaxed text-muted-foreground">
            {strings.about.diff2}
          </p>
        </div>

        <Separator />

        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">
            {strings.about.creditsTitle}
          </h2>

          <p className="leading-relaxed text-muted-foreground">
            {strings.about.creditsInspired}{" "}
            <Link
              href="https://karpathy.github.io/2026/02/12/microgpt/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              microgpt
            </Link>
            {strings.about.creditsInspiredEnd}.
          </p>

          <p className="text-muted-foreground">
            {strings.about.creditsBuilt}{" "}
            <Link
              href="https://github.com/dubzdubz"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              @dubzdubz
            </Link>
            {strings.about.creditsSource}{" "}
            <Link
              href="https://github.com/dubzdubz/microgpt-ts"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
      </article>
    </main>
  );
}
