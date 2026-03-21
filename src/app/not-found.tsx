import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16 sm:px-10">
      <div className="w-full max-w-2xl rounded-[2.25rem] border border-line/80 bg-panel p-10 text-center shadow-[0_28px_100px_rgba(18,33,28,0.08)]">
        <p className="font-mono text-sm uppercase tracking-[0.24em] text-muted">
          Entry not found
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          That contract page does not exist yet.
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          The registry is still in its early public MVP stage. Head back to the
          explorer and browse the seeded entries that already have structured
          pages.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-secondary"
          >
            Return to registry
          </Link>
        </div>
      </div>
    </main>
  );
}
