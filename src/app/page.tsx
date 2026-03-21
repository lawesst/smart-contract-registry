import Link from "next/link";
import { RegistryExplorer } from "@/components/registry-explorer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { contracts } from "@/data/contracts";
import {
  categories,
  chains,
  languages,
  trustStatusOptions,
  verifiedContracts,
} from "@/lib/contracts";

const productStats = [
  {
    value: contracts.length,
    label: "Contracts indexed",
  },
  {
    value: verifiedContracts.length,
    label: "Verified entries",
  },
  {
    value: categories.length,
    label: "Categories tracked",
  },
  {
    value: chains.length,
    label: "Chains surfaced",
  },
];

const framingCards = [
  {
    title: "What exists now",
    body:
      "A searchable MVP with verified flagship entries, structured seed entries, and detail pages for audits, deployments, incidents, and source links.",
  },
  {
    title: "Who it is for",
    body:
      "Solidity and Vyper developers who need trustworthy implementations to study, compare, and ship against.",
  },
  {
    title: "Why it matters",
    body:
      "There still is not one place to find audited, battle-tested contracts across the ecosystem once you move beyond OpenZeppelin basics.",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <SiteHeader />

      <main className="pb-16">
        <section className="px-4 pb-6 pt-8 sm:px-6 lg:px-8 lg:pt-12">
          <div className="mx-auto max-w-7xl">
            <div className="panel-strong accent-ring rounded-[2rem] px-6 py-8 sm:px-10 sm:py-10">
              <div className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="eyebrow rounded-full border border-line bg-white px-4 py-2 text-foreground">
                    Production Ethereum reference layer
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm text-muted">
                    <span className="status-led text-success" />
                    live MVP
                  </span>
                </div>

                <h1 className="font-display mt-8 max-w-4xl text-5xl leading-none tracking-[-0.05em] text-foreground sm:text-6xl lg:text-7xl">
                  Find smart contracts worth studying.
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-8 text-muted sm:text-xl">
                  Smart Contract Registry is a curated, quality-verified
                  reference for production Ethereum contracts, built for
                  Solidity and Vyper developers who need trustworthy examples
                  beyond the usual basics. The live MVP now combines a broad
                  seed dataset with a smaller verified layer backed by official
                  audits, deployment sources, and security notes.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#explorer"
                    className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-secondary"
                  >
                    Browse registry
                  </a>
                  <Link
                    href="/contribute"
                    className="rounded-full border border-line bg-white px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    Submit a contract
                  </Link>
                </div>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {productStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.4rem] border border-line bg-white px-5 py-5"
                  >
                    <p className="eyebrow">{stat.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
            {framingCards.map((card) => (
              <article
                key={card.title}
                className="panel-surface rounded-[1.9rem] px-6 py-6"
              >
                <p className="eyebrow">{card.title}</p>
                <p className="mt-4 text-lg leading-8 text-foreground">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="explorer" className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-3xl">
              <p className="eyebrow">Registry explorer</p>
              <h2 className="font-display mt-3 text-4xl tracking-[-0.04em] text-foreground sm:text-5xl">
                Explore production contracts in one place.
              </h2>
              <p className="mt-4 text-base leading-8 text-muted sm:text-lg">
                Search by protocol, category, language, chain, or trust status
                and open a structured detail page for each entry, with verified
                contracts linking out to primary-source audits and deployment
                references.
              </p>
            </div>

            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <p className="max-w-2xl text-sm leading-7 text-muted">
                The goal is simple: fewer scattered GitHub tabs, more reliable
                contract references, and enough source-backed context to decide
                what is worth studying next.
              </p>

              <Link
                href="/contribute"
                className="w-fit rounded-full border border-line bg-white px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Help expand the dataset
              </Link>
            </div>

            <RegistryExplorer
              contracts={contracts}
              categories={categories}
              chains={chains}
              languages={languages}
              trustStatuses={trustStatusOptions}
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
