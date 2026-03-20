# Smart Contract Registry

Smart Contract Registry is a Next.js project for building a curated, quality-verified reference layer for production Ethereum smart contracts.

This repository is no longer just a markdown table of links. It now has a real product scaffold, typed contract entries, route structure, contribution docs, and the first pass of a reusable data model.

## What This Repo Contains

- A Next.js 16 app scaffold in `src/app`
- A versioned registry dataset in `data/contracts.json`
- A typed loader in `src/data/contracts.ts`
- Shared UI components for the registry explorer
- A contribution route at `src/app/contribute/page.tsx`
- A schema draft for contract entries in `schemas/contract.schema.json`
- CI-friendly validation in `scripts/validate-contracts.mjs`
- The project brief in `docs/project-brief.md`

## Product Direction

- What it is:
  A curated, quality-verified reference of production Ethereum smart contracts
- Who it is for:
  Solidity and Vyper developers who need trustworthy reference implementations
- What problem it solves:
  There is no single place to find audited, battle-tested contracts across the ecosystem once you move beyond OpenZeppelin basics

## Local Development

```bash
npm install
npm run validate-data
npm run dev
```

Then open `http://localhost:3000`.

## Current State

The current dataset is a structured seed layer built from the original contract list and stored as versioned JSON. It is already searchable and filterable in the app, and now has a validation path before merge, but deeper security metadata, deployment addresses, and onchain usage stats still need to be normalized before the registry can claim full quality verification.

## Key Routes

- `/`
  Product landing page and searchable registry explorer
- `/contracts/[slug]`
  Individual contract entry pages
- `/contribute`
  Contribution principles and required entry fields

## Near-Term Build Priorities

1. Add audit metadata and trust badge criteria to each contract.
2. Introduce deployment addresses and onchain usage signals.
3. Expand the schema for exploit history, bug bounties, and audit dates.
4. Add contributor templates and review automation.

## License

MIT
