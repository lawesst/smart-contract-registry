import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-white text-sm font-semibold tracking-[0.28em] text-foreground">
            SCR
          </span>

          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">
              Smart Contract Registry
            </p>
            <div className="flex items-center gap-2 text-xs text-muted">
              <span className="status-led text-success" />
              <span>Production Ethereum references</span>
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          <nav className="flex items-center gap-6 text-sm text-muted">
            <a
              href="#explorer"
              className="transition-colors hover:text-foreground"
            >
              Explorer
            </a>
            <Link
              href="/contribute"
              className="transition-colors hover:text-foreground"
            >
              Contribute
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-foreground"
            >
              About
            </Link>
            <a
              href="https://github.com/lawesst/smart-contract-registry"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-foreground"
            >
              GitHub
            </a>
          </nav>

          <a
            href="#explorer"
            className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-secondary"
          >
            Browse registry
          </a>
        </div>
      </div>
    </header>
  );
}
