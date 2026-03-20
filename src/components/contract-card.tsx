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
  return (
    <article className="group flex h-full flex-col justify-between rounded-[1.75rem] border border-line/80 bg-panel p-6 shadow-[0_20px_70px_rgba(18,33,28,0.08)] backdrop-blur transition-transform duration-200 hover:-translate-y-1">
      <div className="space-y-4">
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

        <div className="space-y-3">
          <h3 className="text-2xl font-semibold tracking-tight text-foreground">
            {contract.name}
          </h3>
          <p className="text-sm leading-7 text-muted">{contract.summary}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-medium ${getTrustBadgeClasses(contract.trustStatus)}`}
          >
            {getTrustBadgeLabel(contract.trustStatus)}
          </span>
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

      <div className="mt-8 flex items-center gap-3 text-sm">
        <Link
          href={`/contracts/${contract.slug}`}
          className="rounded-full bg-foreground px-4 py-2 font-medium text-background transition-colors group-hover:bg-accent"
        >
          View entry
        </Link>
        <a
          href={contract.repositoryUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-line px-4 py-2 font-medium text-foreground transition-colors hover:bg-background"
        >
          Repository
        </a>
      </div>
    </article>
  );
}
