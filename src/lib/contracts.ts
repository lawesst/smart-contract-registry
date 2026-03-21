import { contracts } from "@/data/contracts";
import type {
  ContractRecord,
  TrustStatus,
  VerificationStage,
} from "@/types/contract";

export const categories = [...new Set(contracts.map((contract) => contract.category))];
export const languages = [...new Set(contracts.map((contract) => contract.language))];
export const chains = [
  ...new Set(contracts.flatMap((contract) => contract.chains)),
].sort((left, right) => left.localeCompare(right));
export const trustStatusOptions: TrustStatus[] = [
  "researching",
  "audited",
  "unaudited",
  "exploit-history",
];
export const verifiedContracts = contracts.filter(
  (contract) => contract.verificationStage === "verified",
);

export function getContractBySlug(slug: string): ContractRecord | undefined {
  return contracts.find((contract) => contract.slug === slug);
}

export function getTrustBadgeLabel(status: TrustStatus): string {
  switch (status) {
    case "audited":
      return "Audited";
    case "unaudited":
      return "Unaudited";
    case "exploit-history":
      return "Exploit History";
    case "researching":
      return "Needs Verification";
  }
}

export function getTrustBadgeClasses(status: TrustStatus): string {
  switch (status) {
    case "audited":
      return "border-emerald-500/35 bg-emerald-500/12 text-emerald-900";
    case "unaudited":
      return "border-amber-500/35 bg-amber-500/12 text-amber-900";
    case "exploit-history":
      return "border-rose-500/35 bg-rose-500/12 text-rose-900";
    case "researching":
      return "border-sky-500/35 bg-sky-500/12 text-sky-900";
  }
}

export function getVerificationStageLabel(stage: VerificationStage): string {
  switch (stage) {
    case "verified":
      return "Verified Entry";
    case "seeded":
      return "Seeded Entry";
  }
}

export function getVerificationStageClasses(stage: VerificationStage): string {
  switch (stage) {
    case "verified":
      return "border-emerald-500/35 bg-emerald-500/12 text-emerald-900";
    case "seeded":
      return "border-slate-500/25 bg-slate-500/10 text-slate-800";
  }
}
