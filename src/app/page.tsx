import Link from "next/link";
import { RegistryExplorer } from "@/components/registry-explorer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { contracts } from "@/data/contracts";
import { categories, languages } from "@/lib/contracts";

const productStats = [
  {
    value: contracts.length,
    label: "Seed contracts",
    description: "Structured entries replacing the inherited markdown table.",
  },
  {
    value: 4,
    label: "Data layers",
    description: "Discovery, security, onchain usage, and architecture learning.",
  },
  {
    value: categories.length,
    label: "Tracked categories",
    description: "From DEXes and lending markets to libraries and escrow flows.",
  },
  {
    value: languages.length,
    label: "Languages",
    description: "Starting with Solidity, Vyper, and mixed-language systems.",
  },
];

const framingCards = [
  {
    title: "What the registry is",
    body:
      "A curated, quality-verified reference layer for production Ethereum contracts instead of a bare list of links.",
  },
  {
    title: "Who it is for",
    body:
      "Solidity and Vyper developers who need trustworthy implementations they can study before building from scratch.",
  },
  {
    title: "What problem it solves",
    body:
      "There is still no single home for audited, battle-tested contract references once you move beyond OpenZeppelin basics.",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <SiteHeader />

      <main className="pb-16">
        <section className="px-6 pb-14 pt-4 sm:px-10 lg:px-16">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[2.25rem] border border-line/80 bg-panel p-8 shadow-[0_28px_100px_rgba(18,33,28,0.08)] backdrop-blur sm:p-10">
              <span className="inline-flex rounded-full border border-accent/20 bg-accent-soft px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-accent">
                Production Ethereum reference layer
              </span>

              <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Searchable contract references for builders shipping beyond the
                basics.
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted sm:text-xl">
                Smart Contract Registry takes a hand-curated list and turns it
                into a real product surface: structured protocol entries,
                quality signals, contribution rails, and room for deeper
                security and onchain metadata.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#explorer"
                  className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-accent"
                >
                  Explore the seed registry
                </a>
                <Link
                  href="/contribute"
                  className="rounded-full border border-line bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent"
                >
                  View contribution flow
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {productStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.75rem] border border-line/80 bg-panel p-6 shadow-[0_18px_70px_rgba(18,33,28,0.06)]"
                >
                  <p className="font-mono text-sm uppercase tracking-[0.22em] text-muted">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-4xl font-semibold text-foreground">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-6 sm:px-10 lg:px-16">
          <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-3">
            {framingCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[1.75rem] border border-line/80 bg-panel-strong p-6 shadow-[0_18px_60px_rgba(18,33,28,0.05)]"
              >
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  {card.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted">{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-line/80 bg-panel p-7 shadow-[0_20px_80px_rgba(18,33,28,0.06)] sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="font-mono text-sm uppercase tracking-[0.24em] text-muted">
                  Four information layers
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                  Built to grow from discovery into evaluation.
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Discovery metadata for category, source, language, and docs.",
                  "Security context for audits, reports, and exploit history.",
                  "Onchain usage signals to rank battle-testedness by data.",
                  "Architecture summaries explaining patterns and tradeoffs.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.5rem] border border-line bg-background px-5 py-4 text-sm leading-7 text-muted"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="explorer" className="px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="font-mono text-sm uppercase tracking-[0.24em] text-muted">
                  Registry explorer
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Browse the structured seed dataset.
                </h2>
              </div>

              <p className="max-w-2xl text-sm leading-7 text-muted">
                This is the first break from the upstream repository shape: data
                is now typed, filterable, and ready for richer audit and
                onchain layers instead of being trapped in a markdown table.
              </p>
            </div>

            <RegistryExplorer
              contracts={contracts}
              categories={categories}
              languages={languages}
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
