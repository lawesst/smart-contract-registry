import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const contributionPrinciples = [
  {
    title: "Add production references, not toy examples",
    body:
      "Prioritize contracts that power real systems, have public documentation, and teach an architectural pattern worth studying.",
  },
  {
    title: "Prefer verifiable facts over reputation",
    body:
      "If audit, exploit, or deployment data cannot be sourced publicly, mark it unknown rather than filling the gap with assumptions.",
  },
  {
    title: "Keep the entry useful to developers",
    body:
      "A strong entry helps someone decide why the contract matters, what to study, and which source links are canonical.",
  },
];

const requiredFields = [
  "slug",
  "name",
  "category",
  "language",
  "chains",
  "repositoryUrl",
  "docsUrl",
  "summary",
  "learningFocus",
  "verificationStage",
  "trustStatus",
];

export default function ContributePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="px-6 pb-16 pt-4 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl space-y-8">
          <section className="rounded-[2.25rem] border border-line/80 bg-panel p-8 shadow-[0_28px_100px_rgba(18,33,28,0.08)] sm:p-10">
            <p className="font-mono text-sm uppercase tracking-[0.24em] text-muted">
              Contribution flow
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Help turn the seed registry into a real public reference layer.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
              The repository is no longer just a markdown list. New submissions
              should arrive as structured entries that can power search, detail
              pages, future trust badges, and eventually onchain ranking data.
            </p>
          </section>

          <section className="grid gap-5 lg:grid-cols-3">
            {contributionPrinciples.map((principle) => (
              <article
                key={principle.title}
                className="rounded-[1.75rem] border border-line/80 bg-panel-strong p-6"
              >
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  {principle.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {principle.body}
                </p>
              </article>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <article className="rounded-[2rem] border border-line/80 bg-panel p-7">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Required entry fields
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {requiredFields.map((field) => (
                  <span
                    key={field}
                    className="rounded-full border border-line bg-background px-4 py-2 font-mono text-sm text-muted"
                  >
                    {field}
                  </span>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border border-line/80 bg-panel p-7">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Working repo paths
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-7 text-muted">
                <p>
                  Seed data now lives in <code>data/contracts.json</code>.
                </p>
                <p>
                  The schema lives in <code>schemas/contract.schema.json</code>.
                </p>
                <p>
                  The product intent is captured in{" "}
                  <code>docs/project-brief.md</code>.
                </p>
                <p>
                  CI now validates the dataset before merge, so malformed or
                  duplicate entries can be rejected automatically.
                </p>
              </div>
            </article>
          </section>

          <section className="rounded-[2rem] border border-line/80 bg-panel-strong p-7">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Next steps after the scaffold
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                "Attach security metadata and trust badge criteria to every entry.",
                "Add deploy addresses, onchain stats, and ranking signals.",
                "Expand the schema to cover bug bounties, exploits, and audit dates.",
                "Create a public PR template and contributor review checklist.",
              ].map((step) => (
                <div
                  key={step}
                  className="rounded-[1.5rem] border border-line bg-background px-5 py-4 text-sm leading-7 text-muted"
                >
                  {step}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/"
                className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-accent"
              >
                Back to registry
              </Link>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
