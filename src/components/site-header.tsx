import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
      <Link href="/" className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/25 bg-accent-soft text-sm font-semibold tracking-[0.24em] text-accent">
          SCR
        </span>
        <span className="max-w-[13rem] text-sm leading-5 text-muted sm:max-w-none">
          Smart Contract Registry
        </span>
      </Link>

      <nav className="flex items-center gap-5 text-sm text-muted">
        <a href="#explorer" className="transition-colors hover:text-foreground">
          Registry
        </a>
        <Link href="/contribute" className="transition-colors hover:text-foreground">
          Contribute
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
    </header>
  );
}
