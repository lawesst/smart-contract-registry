import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { contracts } from "@/data/contracts";
import {
  getContractBySlug,
  getTrustBadgeClasses,
  getTrustBadgeLabel,
  getVerificationStageClasses,
  getVerificationStageLabel,
} from "@/lib/contracts";

type ContractPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return contracts.map((contract) => ({
    slug: contract.slug,
  }));
}

export async function generateMetadata({
  params,
}: ContractPageProps): Promise<Metadata> {
  const { slug } = await params;
  const contract = getContractBySlug(slug);

  if (!contract) {
    return {
      title: "Entry not found | Smart Contract Registry",
    };
  }

  return {
    title: `${contract.name} | Smart Contract Registry`,
    description: contract.summary,
  };
}

export default async function ContractPage({ params }: ContractPageProps) {
  const { slug } = await params;
  const contract = getContractBySlug(slug);

  if (!contract) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="px-6 pb-16 pt-4 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl space-y-8">
          <Link href="/" className="text-sm text-muted transition-colors hover:text-foreground">
            Back to registry
          </Link>

          <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[2.25rem] border border-line/80 bg-panel p-8 shadow-[0_28px_100px_rgba(18,33,28,0.08)]">
              <div className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.18em]">
                <span className="rounded-full border border-line bg-background px-3 py-1 text-muted">
                  {contract.category}
                </span>
                <span className="rounded-full border border-line bg-background px-3 py-1 text-muted">
                  {contract.language}
                </span>
                <span
                  className={`rounded-full border px-3 py-1 ${getVerificationStageClasses(contract.verificationStage)}`}
                >
                  {getVerificationStageLabel(contract.verificationStage)}
                </span>
                <span
                  className={`rounded-full border px-3 py-1 ${getTrustBadgeClasses(contract.trustStatus)}`}
                >
                  {getTrustBadgeLabel(contract.trustStatus)}
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {contract.name}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
                {contract.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={contract.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-accent"
                >
                  Open repository
                </a>
                <a
                  href={contract.docsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-line bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent"
                >
                  Read documentation
                </a>
                {contract.walkthroughUrl ? (
                  <a
                    href={contract.walkthroughUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-line bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent"
                  >
                    Watch walkthrough
                  </a>
                ) : null}
              </div>
            </div>

            <aside className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                {
                  label: "Chains",
                  value: contract.chains.length,
                  note: contract.chains.join(" • "),
                },
                {
                  label: "Learning angles",
                  value: contract.learningFocus.length,
                  note: contract.learningFocus.join(" • "),
                },
                {
                  label: "Current stage",
                  value: contract.verificationStage === "seeded" ? "Seed" : "Live",
                  note:
                    "This entry is already structured, but deeper security and onchain metadata still need normalization.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.75rem] border border-line/80 bg-panel p-6 shadow-[0_18px_70px_rgba(18,33,28,0.06)]"
                >
                  <p className="font-mono text-sm uppercase tracking-[0.22em] text-muted">
                    {item.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-foreground">
                    {item.value}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted">{item.note}</p>
                </div>
              ))}
            </aside>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-[2rem] border border-line/80 bg-panel-strong p-7">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                What to study
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {contract.learningFocus.map((focus) => (
                  <span
                    key={focus}
                    className="rounded-full border border-line bg-background px-4 py-2 text-sm text-muted"
                  >
                    {focus}
                  </span>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border border-line/80 bg-panel-strong p-7">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Why this entry exists
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                The registry is being built so developers can compare real
                production systems without guessing which implementation is the
                right one to study. This entry has already been promoted from a
                README row into a structured object with room for audits,
                exploit history, deployment addresses, and usage metrics.
              </p>
            </article>
          </section>

          <section className="rounded-[2rem] border border-line/80 bg-panel p-7 shadow-[0_18px_70px_rgba(18,33,28,0.05)]">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Data still to verify
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                "Independent audit reports",
                "Last audit date and trust badge",
                "Deployment addresses by chain",
                "Onchain usage and battle-testedness stats",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] border border-dashed border-line bg-background px-5 py-4 text-sm leading-7 text-muted"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
