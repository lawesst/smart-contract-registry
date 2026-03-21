"use client";

import { startTransition, useDeferredValue, useState } from "react";
import { ContractCard } from "@/components/contract-card";
import { getTrustBadgeLabel } from "@/lib/contracts";
import type { ContractRecord } from "@/types/contract";

type RegistryExplorerProps = {
  contracts: ContractRecord[];
  categories: string[];
  languages: string[];
  chains: string[];
  trustStatuses: ContractRecord["trustStatus"][];
};

type FilterValue<T extends string> = T | "All";

export function RegistryExplorer({
  contracts,
  categories,
  languages,
  chains,
  trustStatuses,
}: RegistryExplorerProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<FilterValue<string>>("All");
  const [selectedLanguage, setSelectedLanguage] =
    useState<FilterValue<string>>("All");
  const [selectedChain, setSelectedChain] = useState<FilterValue<string>>("All");
  const [selectedTrustStatus, setSelectedTrustStatus] =
    useState<FilterValue<ContractRecord["trustStatus"]>>("All");
  const deferredQuery = useDeferredValue(query);

  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const visibleContracts = contracts.filter((contract) => {
    const matchesCategory =
      selectedCategory === "All" || contract.category === selectedCategory;
    const matchesLanguage =
      selectedLanguage === "All" || contract.language === selectedLanguage;
    const matchesChain =
      selectedChain === "All" || contract.chains.includes(selectedChain);
    const matchesTrustStatus =
      selectedTrustStatus === "All" ||
      contract.trustStatus === selectedTrustStatus;

    const searchSpace = [
      contract.name,
      contract.category,
      contract.language,
      contract.trustStatus,
      contract.summary,
      contract.trustSummary ?? "",
      ...contract.chains,
      ...contract.learningFocus,
      ...(contract.auditReports?.map((audit) => audit.auditor) ?? []),
      ...(contract.deploymentAddresses?.map((deployment) => deployment.chain) ?? []),
      ...(contract.incidentHistory?.map((incident) => incident.title) ?? []),
      ...(contract.sourceLinks?.map((source) => source.label) ?? []),
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery =
      normalizedQuery.length === 0 || searchSpace.includes(normalizedQuery);

    return (
      matchesCategory &&
      matchesLanguage &&
      matchesChain &&
      matchesTrustStatus &&
      matchesQuery
    );
  });

  const activeFilters = [
    selectedCategory !== "All" ? `Sector: ${selectedCategory}` : null,
    selectedLanguage !== "All" ? `Language: ${selectedLanguage}` : null,
    selectedChain !== "All" ? `Chain: ${selectedChain}` : null,
    selectedTrustStatus !== "All"
      ? `Trust: ${getTrustBadgeLabel(selectedTrustStatus)}`
      : null,
  ].filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="panel-strong rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Search and filter</p>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
              Search protocol names, summaries, chains, verified sources, and
              study angles from one lightweight control surface.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
            <span className="rounded-full border border-line bg-white px-4 py-2">
              {visibleContracts.length} shown
            </span>
            <span className="rounded-full border border-line bg-white px-4 py-2">
              {contracts.length} total
            </span>
          </div>
        </div>

        <div className="mt-6 rounded-[1.7rem] border border-line bg-white p-4 sm:p-5">
          <div className="grid gap-4 xl:grid-cols-[1.25fr_0.32fr_0.32fr_0.4fr]">
            <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
              <span className="eyebrow">Search</span>
              <div className="flex items-center rounded-2xl border border-line bg-background px-4 py-3">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-3 h-4 w-4 text-muted"
                  aria-hidden="true"
                >
                  <circle
                    cx="9"
                    cy="9"
                    r="5.75"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M13.5 13.5L17 17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  value={query}
                  onChange={(event) => {
                    startTransition(() => setQuery(event.target.value));
                  }}
                  placeholder="Search contracts, patterns, or chains"
                  className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted"
                />
              </div>
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
              <span className="eyebrow">Language</span>
              <select
                value={selectedLanguage}
                onChange={(event) => {
                  startTransition(() => setSelectedLanguage(event.target.value));
                }}
                className="rounded-2xl border border-line bg-background px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-accent"
              >
                <option>All</option>
                {languages.map((language) => (
                  <option key={language}>{language}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
              <span className="eyebrow">Chain</span>
              <select
                value={selectedChain}
                onChange={(event) => {
                  startTransition(() => setSelectedChain(event.target.value));
                }}
                className="rounded-2xl border border-line bg-background px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-accent"
              >
                <option>All</option>
                {chains.map((chain) => (
                  <option key={chain}>{chain}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
              <span className="eyebrow">Trust status</span>
              <select
                value={selectedTrustStatus}
                onChange={(event) => {
                  startTransition(() =>
                    setSelectedTrustStatus(
                      event.target.value as FilterValue<
                        ContractRecord["trustStatus"]
                      >,
                    ),
                  );
                }}
                className="rounded-2xl border border-line bg-background px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-accent"
              >
                <option>All</option>
                {trustStatuses.map((status) => (
                  <option key={status} value={status}>
                    {getTrustBadgeLabel(status)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                startTransition(() => setSelectedCategory("All"));
              }}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                selectedCategory === "All"
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-background text-muted hover:text-foreground"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  startTransition(() => setSelectedCategory(category));
                }}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  selectedCategory === category
                    ? "border-accent bg-accent text-white"
                    : "border-line bg-background text-muted hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {activeFilters.length > 0 ? (
                activeFilters.map((filter) => (
                  <span
                    key={filter}
                    className="rounded-full border border-line bg-background px-3 py-2 text-xs font-medium uppercase tracking-[0.14em] text-muted"
                  >
                    {filter}
                  </span>
                ))
              ) : (
                <span className="rounded-full border border-line bg-background px-3 py-2 text-xs uppercase tracking-[0.14em] text-muted">
                  no active filters
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                startTransition(() => {
                  setQuery("");
                  setSelectedCategory("All");
                  setSelectedLanguage("All");
                  setSelectedChain("All");
                  setSelectedTrustStatus("All");
                });
              }}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>

      {visibleContracts.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
          {visibleContracts.map((contract) => (
            <ContractCard key={contract.slug} contract={contract} />
          ))}
        </div>
      ) : (
        <div className="panel-surface rounded-[2rem] border-dashed px-6 py-12 text-center text-muted">
          No entries matched that combination yet. Try clearing a filter or
          searching by protocol family instead.
        </div>
      )}
    </div>
  );
}
