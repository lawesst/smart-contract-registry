# Smart Contract Registry

Smart Contract Registry is a Next.js project for building a curated, quality-verified reference layer for production Ethereum smart contracts.

This repository is no longer a markdown list of links. It now ships a live MVP with search, filters, detail pages, schema-validated data, and a verified flagship layer backed by official audits, deployment sources, and trust notes.

Live MVP: https://smart-contract-registry-rk9ncxh0p-mtuneccesarys-projects.vercel.app

## Current MVP

The live MVP target for this repository is a public registry experience with:

- full-text search across protocol names, categories, summaries, chains, and learning focus
- filters for category, language, chain, and audit status
- contract cards with GitHub and documentation links
- static detail pages for every contract entry
- verified flagship pages with audit reports, deployment addresses, source links, and security context
- repo-backed JSON data with schema validation and CI enforcement

## What This Repo Contains

- A Next.js 16 app scaffold in `src/app`
- A versioned registry dataset in `data/contracts.json`
- A typed loader in `src/data/contracts.ts`
- Shared UI components for the registry explorer
- An About route in `src/app/about/page.tsx`
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

The current dataset combines two layers:

- a broad seed layer that keeps ecosystem coverage intact
- a verified flagship layer for contracts with source-backed audits, deployments, and trust summaries

The product is already useful as a searchable reference. The next stage is expanding the verified layer, not rebuilding the foundation.

## Key Routes

- `/`
  Product landing page and searchable registry explorer
- `/contracts/[slug]`
  Individual contract entry pages with trust packets for verified entries
- `/about`
  Product framing, verification model, and current MVP scope
- `/contribute`
  Contribution principles, required entry fields, and verification packet fields

## Near-Term Build Priorities

1. Expand the number of verified flagship entries from the current core set.
2. Add more deployment coverage across chains for already-verified protocols.
3. Normalize onchain usage signals and ranking-friendly metadata.
4. Add contributor templates and review automation.

## License

MIT
