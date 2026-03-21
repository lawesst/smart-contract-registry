import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { contracts } from "@/data/contracts";
import { verifiedContracts } from "@/lib/contracts";

const principles = [
  {
    title: "Curated production references",
    body:
      "The registry focuses on contracts that already matter in production, not toy examples or tutorial repos.",
  },
  {
    title: "Primary-source verification",
    body:
      "Verified entries are backed by official repos, docs, deployment manifests, or first-party security material whenever possible.",
  },
  {
    title: "Useful to builders first",
    body:
      "Each page is designed to answer the practical study questions: what the system does, what to inspect, and why the trust status looks the way it does.",
  },
];

const methodology = [
  "Promote flagship entries from seeded to verified only after attaching source-backed audit links, deployment addresses, and trust notes.",
  "Keep trust status explicit: audited, unaudited, exploit history, or still needing verification.",
  "Prefer leaving a field blank over filling it with unsourced reputation or guesswork.",
  "Treat the registry as a public-good reference layer for Solidity and Vyper developers, not a ranking feed or token dashboard.",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="panel-strong accent-ring rounded-[2rem] px-6 py-8 sm:px-10 sm:py-10">
            <p className="eyebrow">About the registry</p>
            <h1 className="font-display mt-4 max-w-4xl text-5xl leading-none tracking-[-0.05em] text-foreground sm:text-6xl">
              A public reference layer for real Ethereum contracts.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
              Smart Contract Registry is a curated, quality-verified reference
              of production Ethereum smart contracts. It is built for Solidity
              and Vyper developers who need trustworthy implementations to
              study once OpenZeppelin-level basics are no longer enough.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.4rem] border border-line bg-white px-5 py-5">
                <p className="eyebrow">Current dataset</p>
                <p className="mt-3 text-3xl font-semibold text-foreground">
                  {contracts.length}
                </p>
                <p className="mt-2 text-sm text-muted">Structured entries</p>
              </div>
              <div className="rounded-[1.4rem] border border-line bg-white px-5 py-5">
                <p className="eyebrow">Verified layer</p>
                <p className="mt-3 text-3xl font-semibold text-foreground">
                  {verifiedContracts.length}
                </p>
                <p className="mt-2 text-sm text-muted">
                  Flagship entries with trust packets
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-line bg-white px-5 py-5">
                <p className="eyebrow">What it solves</p>
                <p className="mt-3 text-lg font-medium text-foreground">
                  One place to compare battle-tested contracts
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-3">
            {principles.map((principle) => (
              <article
                key={principle.title}
                className="panel-surface rounded-[1.9rem] px-6 py-6"
              >
                <p className="eyebrow">{principle.title}</p>
                <p className="mt-4 text-base leading-8 text-foreground">
                  {principle.body}
                </p>
              </article>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="panel-surface rounded-[2rem] p-7">
              <p className="eyebrow">Methodology</p>
              <h2 className="font-display mt-3 text-4xl tracking-[-0.04em] text-foreground">
                How entries get verified
              </h2>
              <div className="mt-5 space-y-4">
                {methodology.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.4rem] border border-line bg-background px-5 py-4 text-sm leading-7 text-muted"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <article className="panel-surface rounded-[2rem] p-7">
              <p className="eyebrow">Live MVP</p>
              <h2 className="font-display mt-3 text-4xl tracking-[-0.04em] text-foreground">
                What reviewers can inspect today
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-muted">
                <p>
                  The MVP already supports search, filters, static contract
                  pages, typed registry data, schema validation, and verified
                  metadata for a core set of flagship entries.
                </p>
                <p>
                  Seed entries still exist so the registry keeps broad ecosystem
                  coverage while the verified layer expands.
                </p>
                <p>
                  The next product step is increasing the number of verified
                  entries, not rebuilding the data model from scratch.
                </p>
              </div>
            </article>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
