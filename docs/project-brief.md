# Smart Contract Registry Project Brief

## Product Definition

Smart Contract Registry is a curated, quality-verified reference of production Ethereum smart contracts. It is meant to be the developer-facing discovery layer for battle-tested Solidity and Vyper code across the ecosystem.

## Who It Is For

- Solidity developers looking for trustworthy reference implementations
- Vyper developers studying real-world production patterns
- Auditors and security researchers comparing architectures and exploit history
- Learners who want plain-English explanations of production contracts

## Problem It Solves

There is no single reliable place to find audited, battle-tested smart contracts across the broader Ethereum ecosystem. OpenZeppelin is an excellent foundation, but it intentionally covers only a narrow slice of common primitives and utilities. Once developers need real protocol patterns like AMMs, lending markets, vaults, governance systems, or streaming payments, discovery becomes fragmented and trust becomes guesswork.

The registry solves that by collecting trustworthy protocol references in one searchable place with structured metadata, audit context, and ecosystem usage signals.

## Product Promise

Each contract entry should help a developer answer four questions quickly:

1. What is this contract or protocol?
2. Can I trust it?
3. How battle-tested is it onchain?
4. What can I learn from its architecture?

## Core Data Layers

### 1. Discovery Metadata

- protocol name
- category
- language
- chain compatibility
- license
- GitHub repository
- documentation links

### 2. Security Metadata

- audit firm names
- audit report links
- last audit date
- known exploits
- bug bounty links
- trust badge

### 3. Onchain Usage Data

- TVL
- unique callers
- total transactions
- deployment count across chains
- deployment addresses by network

### 4. Architecture Summary

- 150 to 300 word explanation
- design patterns used
- tradeoffs
- implementation details worth studying

## Trust Badge System

- `Audited`: at least one independent audit from a recognized firm
- `Unaudited`: no known independent audit
- `Exploit History`: known exploit or major vulnerability history

## Non-Goals

- not a contract deployment tool
- not a code generator
- not a replacement for protocol repositories
- not a competing smart contract library
- not a paid product

## Proposed Technical Direction

- Framework: Next.js with App Router
- Language: TypeScript
- Styling: Tailwind CSS
- Hosting: Vercel
- Primary data store: versioned JSON in the repo
- Automation: GitHub Actions for validation and scheduled stats refresh
- External data sources: Dune Analytics, The Graph, protocol docs, Solodit, Code4rena, Sherlock

## MVP Scope

The first usable version should deliver:

- a homepage with search and filters
- structured entries for the initial contract set
- contract detail pages
- trust badges on list and detail views
- a contribution guide
- a validated JSON schema for submissions

## Suggested Information Architecture

- `/`
  Searchable contract index
- `/contracts/[slug]`
  Contract detail page with metadata, security context, and architecture summary
- `/contribute`
  Contribution rules, schema, and submission instructions

## Milestone Translation

### M1: Searchable Registry

- scaffold the web app
- define the contract schema
- import the initial list
- build search, filters, and contract cards

### M2: Security Metadata

- add audits, exploit history, and bug bounty fields
- implement trust badge logic
- surface security details on contract pages

### M3: Onchain Stats

- add stats ingestion pipeline
- store normalized usage metrics
- show deployments and battle-testedness signals

### M4: Scale and Community

- expand to 100 plus entries
- add architecture summaries for all entries
- document review process and maintainer workflow

## Product Principles

- quality over quantity
- verifiable facts over curator opinion
- plain-English explanations over jargon
- open contribution model with strong validation
- free and public by default

## Immediate Build Priorities

1. Define the JSON schema for a contract entry.
2. Create the initial dataset from the current README.
3. Scaffold the Next.js frontend around that dataset.
4. Add search, filters, and contract detail pages.
5. Add contribution docs and validation in CI.
