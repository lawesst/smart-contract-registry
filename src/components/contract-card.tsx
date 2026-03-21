import Link from "next/link";
import type { ContractRecord } from "@/types/contract";
import {
  getTrustBadgeClasses,
  getTrustBadgeLabel,
  getVerificationStageClasses,
  getVerificationStageLabel,
} from "@/lib/contracts";

type ContractCardProps = {
  contract: ContractRecord;
};

export function ContractCard({ contract }: ContractCardProps) {
  const trustFacts = [
    contract.auditReports?.length
      ? `${contract.auditReports.length} audit${contract.auditReports.length === 1 ? "" : "s"}`
      : null,
    contract.deploymentAddresses?.length
      ? `${contract.deploymentAddresses.length} deployment${contract.deploymentAddresses.length === 1 ? "" : "s"}`
      : null,
    contract.incidentHistory?.length
      ? `${contract.incidentHistory.length} incident${contract.incidentHistory.length === 1 ? "" : "s"}`
      : null,
    contract.bugBountyUrl ? "bug bounty" : null,
  ].filter(Boolean);

  return (
    <article className="panel-surface group flex h-full flex-col justify-between rounded-[1.6rem] p-6 transition-transform duration-200 hover:-translate-y-1">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <p className="eyebrow">Registry entry</p>
            <h3 className="font-display text-[2rem] leading-none tracking-[-0.04em] text-foreground">
              {contract.name}
            </h3>
          </div>

          <span
            className={`rounded-full border px-3 py-1 text-xs font-medium ${getTrustBadgeClasses(contract.trustStatus)}`}
          >
            {getTrustBadgeLabel(contract.trustStatus)}
          </span>
        </div>

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
        </div>

        <p className="text-sm leading-7 text-muted">{contract.summary}</p>

        {trustFacts.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {trustFacts.slice(0, 3).map((fact) => (
              <span
                key={fact}
                className="rounded-full border border-line bg-white px-3 py-2 text-xs text-muted"
              >
                {fact}
              </span>
            ))}
          </div>
        ) : null}

        <div className="rounded-[1.3rem] border border-line bg-background px-4 py-4">
          <p className="eyebrow">What to study</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {contract.learningFocus.slice(0, 3).map((focus) => (
              <span
                key={focus}
                className="rounded-full border border-line bg-white px-3 py-2 text-xs text-muted"
              >
                {focus}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {contract.chains.slice(0, 2).map((chain) => (
            <span
              key={chain}
              className="rounded-full border border-line bg-background px-3 py-1 text-xs text-muted"
            >
              {chain}
            </span>
          ))}
          {contract.chains.length > 2 ? (
            <span className="rounded-full border border-line bg-background px-3 py-1 text-xs text-muted">
              +{contract.chains.length - 2} more
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
        <Link
          href={`/contracts/${contract.slug}`}
          className="rounded-full bg-accent px-4 py-2 font-medium text-white transition-colors hover:bg-secondary"
        >
          View entry
        </Link>
        <a
          href={contract.repositoryUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-line bg-white px-4 py-2 font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Repository
        </a>
        <a
          href={contract.docsUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-line bg-white px-4 py-2 font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Docs
        </a>
      </div>
    </article>
  );
}
