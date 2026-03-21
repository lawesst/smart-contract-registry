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

  const audits = contract.auditReports ?? [];
  const deployments = contract.deploymentAddresses ?? [];
  const incidents = contract.incidentHistory ?? [];
  const sources = contract.sourceLinks ?? [];
  const trustSignals = [
    {
      label: "Chains",
      value: contract.chains.length,
      note: contract.chains.join(" • "),
    },
    {
      label: "Audit reports",
      value: audits.length,
      note:
        audits.length > 0
          ? audits.map((audit) => audit.auditor).join(" • ")
          : "No public audit links attached to this entry yet.",
    },
    {
      label: "Deployments",
      value: deployments.length,
      note:
        deployments.length > 0
          ? deployments.map((deployment) => deployment.chain).join(" • ")
          : "No deployment addresses attached to this entry yet.",
    },
    {
      label: "Sources",
      value: sources.length,
      note:
        sources.length > 0
          ? sources.map((source) => source.label).join(" • ")
          : "No canonical source links attached to this entry yet.",
    },
  ];

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <Link
            href="/"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            Back to registry
          </Link>

          <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="panel-strong accent-ring rounded-[2.2rem] p-8 sm:p-10">
              <p className="eyebrow">Registry entry</p>
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

              <h1 className="font-display mt-6 text-5xl leading-none tracking-[-0.05em] text-foreground sm:text-6xl">
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
                  className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-secondary"
                >
                  Open repository
                </a>
                <a
                  href={contract.docsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-line bg-white px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  Read documentation
                </a>
                {contract.walkthroughUrl ? (
                  <a
                    href={contract.walkthroughUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-line bg-white px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    Watch walkthrough
                  </a>
                ) : null}
              </div>
            </div>

            <aside className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {trustSignals.map((item) => (
                <div
                  key={item.label}
                  className="panel-surface rounded-[1.75rem] p-6"
                >
                  <p className="eyebrow">{item.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-foreground">
                    {item.value}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted">{item.note}</p>
                </div>
              ))}
            </aside>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <article className="panel-surface rounded-[2rem] p-7">
              <p className="eyebrow">Study prompts</p>
              <h2 className="font-display mt-3 text-4xl tracking-[-0.04em] text-foreground">
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

            <article className="panel-surface rounded-[2rem] p-7">
              <p className="eyebrow">Trust packet</p>
              <h2 className="font-display mt-3 text-4xl tracking-[-0.04em] text-foreground">
                What is verified
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                {contract.trustSummary ??
                  "This entry is still a structured seed and needs audit links, deployment addresses, and source-backed verification before it should be treated as a trusted reference."}
              </p>
            </article>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <article className="panel-surface rounded-[2rem] p-7">
              <p className="eyebrow">Audit reports</p>
              <h2 className="font-display mt-3 text-4xl tracking-[-0.04em] text-foreground">
                Security reviews
              </h2>
              <div className="mt-5 space-y-4">
                {audits.length > 0 ? (
                  audits.map((audit) => (
                    <div
                      key={`${audit.auditor}-${audit.reportUrl}`}
                      className="rounded-[1.4rem] border border-line bg-background px-5 py-4"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-base font-medium text-foreground">
                            {audit.auditor}
                          </p>
                          <p className="mt-1 text-sm text-muted">
                            {audit.date ?? "Date not attached in registry"}
                          </p>
                        </div>

                        <a
                          href={audit.reportUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="w-fit rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                        >
                          Open report
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[1.4rem] border border-dashed border-line bg-background px-5 py-4 text-sm leading-7 text-muted">
                    No public audit reports are attached to this entry yet.
                  </div>
                )}
              </div>
            </article>

            <article className="panel-surface rounded-[2rem] p-7">
              <p className="eyebrow">Deployments</p>
              <h2 className="font-display mt-3 text-4xl tracking-[-0.04em] text-foreground">
                Canonical addresses
              </h2>
              <div className="mt-5 space-y-4">
                {deployments.length > 0 ? (
                  deployments.map((deployment) => (
                    <div
                      key={`${deployment.chain}-${deployment.address}`}
                      className="rounded-[1.4rem] border border-line bg-background px-5 py-4"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-base font-medium text-foreground">
                            {deployment.chain}
                          </p>
                          <a
                            href={deployment.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-accent transition-colors hover:text-secondary"
                          >
                            Source
                          </a>
                        </div>
                        <code className="overflow-x-auto rounded-2xl border border-line bg-white px-4 py-3 text-xs text-muted">
                          {deployment.address}
                        </code>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-[1.4rem] border border-dashed border-line bg-background px-5 py-4 text-sm leading-7 text-muted">
                    No deployment addresses are attached to this entry yet.
                  </div>
                )}
              </div>
            </article>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <article className="panel-surface rounded-[2rem] p-7">
              <p className="eyebrow">Security context</p>
              <h2 className="font-display mt-3 text-4xl tracking-[-0.04em] text-foreground">
                Bounties and incidents
              </h2>
              <div className="mt-5 space-y-4">
                {contract.bugBountyUrl ? (
                  <a
                    href={contract.bugBountyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-[1.4rem] border border-line bg-background px-5 py-4 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    <span>Open bug bounty program</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <div className="rounded-[1.4rem] border border-dashed border-line bg-background px-5 py-4 text-sm leading-7 text-muted">
                    No first-party bug bounty link is attached to this entry yet.
                  </div>
                )}

                {incidents.length > 0 ? (
                  incidents.map((incident) => (
                    <div
                      key={`${incident.title}-${incident.date}`}
                      className="rounded-[1.4rem] border border-line bg-background px-5 py-4"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-base font-medium text-foreground">
                            {incident.title}
                          </p>
                          <span className="text-sm text-muted">
                            {incident.date}
                          </span>
                        </div>
                        <p className="text-sm leading-7 text-muted">
                          {incident.summary}
                        </p>
                        <a
                          href={incident.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="w-fit text-sm text-accent transition-colors hover:text-secondary"
                        >
                          Open source
                        </a>
                      </div>
                    </div>
                  ))
                ) : null}
              </div>
            </article>

            <article className="panel-surface rounded-[2rem] p-7">
              <p className="eyebrow">Canonical sources</p>
              <h2 className="font-display mt-3 text-4xl tracking-[-0.04em] text-foreground">
                What to inspect next
              </h2>
              <div className="mt-5 space-y-4">
                {sources.length > 0 ? (
                  sources.map((source) => (
                    <a
                      key={source.url}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-[1.4rem] border border-line bg-background px-5 py-4 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                    >
                      <span>{source.label}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))
                ) : (
                  <div className="rounded-[1.4rem] border border-dashed border-line bg-background px-5 py-4 text-sm leading-7 text-muted">
                    No source links are attached to this entry yet.
                  </div>
                )}
              </div>
            </article>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
