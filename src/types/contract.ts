export const contractCategories = [
  "DEX",
  "Derivatives",
  "Escrow",
  "Lending",
  "Library",
  "NFT",
  "NFT Marketplace",
  "Restaking",
  "Stablecoin",
  "Streaming",
  "Token",
  "Yield Farming",
] as const;

export const contractLanguages = ["Solidity", "Vyper", "Mixed"] as const;

export const trustStatuses = [
  "researching",
  "audited",
  "unaudited",
  "exploit-history",
] as const;

export const verificationStages = ["seeded", "verified"] as const;

export type ContractCategory = (typeof contractCategories)[number];
export type ContractLanguage = (typeof contractLanguages)[number];
export type TrustStatus = (typeof trustStatuses)[number];
export type VerificationStage = (typeof verificationStages)[number];

export type ContractAuditReport = {
  auditor: string;
  date?: string;
  reportUrl: string;
};

export type ContractDeployment = {
  chain: string;
  address: string;
  sourceUrl: string;
};

export type ContractIncident = {
  title: string;
  date: string;
  summary: string;
  sourceUrl: string;
};

export type ContractSourceLink = {
  label: string;
  url: string;
};

export type ContractRecord = {
  slug: string;
  name: string;
  category: ContractCategory;
  language: ContractLanguage;
  chains: string[];
  repositoryUrl: string;
  docsUrl: string;
  walkthroughUrl?: string;
  summary: string;
  learningFocus: string[];
  trustStatus: TrustStatus;
  verificationStage: VerificationStage;
  trustSummary?: string;
  auditReports?: ContractAuditReport[];
  deploymentAddresses?: ContractDeployment[];
  bugBountyUrl?: string;
  incidentHistory?: ContractIncident[];
  sourceLinks?: ContractSourceLink[];
};
