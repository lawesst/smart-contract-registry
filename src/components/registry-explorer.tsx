"use client";

import { startTransition, useDeferredValue, useState } from "react";
import { ContractCard } from "@/components/contract-card";
import type { ContractRecord } from "@/types/contract";

type RegistryExplorerProps = {
  contracts: ContractRecord[];
  categories: string[];
  languages: string[];
};

export function RegistryExplorer({
  contracts,
  categories,
  languages,
}: RegistryExplorerProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const deferredQuery = useDeferredValue(query);

  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const visibleContracts = contracts.filter((contract) => {
    const matchesCategory =
      selectedCategory === "All" || contract.category === selectedCategory;
    const matchesLanguage =
      selectedLanguage === "All" || contract.language === selectedLanguage;

    const searchSpace = [
      contract.name,
      contract.category,
      contract.language,
      contract.summary,
      ...contract.learningFocus,
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery =
      normalizedQuery.length === 0 || searchSpace.includes(normalizedQuery);

    return matchesCategory && matchesLanguage && matchesQuery;
  });

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-line/80 bg-panel p-6 shadow-[0_24px_90px_rgba(18,33,28,0.08)] backdrop-blur sm:p-8">
        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.3fr_0.3fr]">
          <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
            Search the registry
            <input
              value={query}
              onChange={(event) => {
                startTransition(() => setQuery(event.target.value));
              }}
              placeholder="Search protocols, categories, or learning focus"
              className="rounded-2xl border border-line bg-background px-4 py-3 text-base outline-none transition-colors placeholder:text-muted focus:border-accent"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
            Category
            <select
              value={selectedCategory}
              onChange={(event) => {
                startTransition(() => setSelectedCategory(event.target.value));
              }}
              className="rounded-2xl border border-line bg-background px-4 py-3 text-base outline-none transition-colors focus:border-accent"
            >
              <option>All</option>
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-foreground">
            Language
            <select
              value={selectedLanguage}
              onChange={(event) => {
                startTransition(() => setSelectedLanguage(event.target.value));
              }}
              className="rounded-2xl border border-line bg-background px-4 py-3 text-base outline-none transition-colors focus:border-accent"
            >
              <option>All</option>
              {languages.map((language) => (
                <option key={language}>{language}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-muted">
          <p>
            {visibleContracts.length} result
            {visibleContracts.length === 1 ? "" : "s"} from the current seed
            registry.
          </p>
          <p>Audit metadata and onchain stats will layer in next.</p>
        </div>
      </div>

      {visibleContracts.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleContracts.map((contract) => (
            <ContractCard key={contract.slug} contract={contract} />
          ))}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-dashed border-line bg-panel px-6 py-12 text-center text-muted">
          No entries matched that combination yet. Try clearing a filter or
          searching by protocol family instead.
        </div>
      )}
    </div>
  );
}
