export function SiteFooter() {
  return (
    <footer className="border-t border-line/80 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 text-sm text-muted lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <p className="eyebrow">Registry Status</p>
          <p>
            A searchable MVP with verified flagship entries and a growing seed
            registry.
          </p>
        </div>
        <div className="space-y-1 text-left lg:text-right">
          <p className="eyebrow">Mode</p>
          <p>Public-good infrastructure for Solidity and Vyper developers.</p>
        </div>
      </div>
    </footer>
  );
}
