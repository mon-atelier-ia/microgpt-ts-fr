import { TrainDemo } from "@/components/demo/demo";

export default function Page() {
  return (
    <main className="flex min-h-0 flex-1 flex-col items-center px-6 py-8">
      <p className="mb-8 text-muted-foreground">
        Train a tiny GPT on names and generate new ones — right in your browser.
      </p>
      <TrainDemo />
    </main>
  );
}
