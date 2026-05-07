# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project purpose

This is a [Ponder](https://ponder.sh) indexer for Alchemix V3 contracts on Ethereum mainnet. Ponder consumes onchain events, writes them to Postgres, and exposes the resulting data via auto-generated GraphQL and a SQL-over-HTTP endpoint.

The repo was scaffolded with `create-ponder` and is still mostly the template — the canonical specification of what to index lives in `alchemixv3mk2.json` (subgraph name `alchemixv3`, contracts like `alchemistV3` with multiple labelled instances such as `alETH` at `0xfa995B6ABc387376C3e7De5f6d394Ab5B6beE26B`). When implementing indexing, drive `ponder.config.ts`, ABIs under `abis/`, the schema, and event handlers from that JSON spec.

## Commands

- `pnpm dev` — run the indexer in watch mode against the local SQLite/Postgres instance
- `pnpm start` — production mode (no hot reload)
- `pnpm codegen` — regenerate Ponder's virtual modules (`ponder:registry`, `ponder:schema`, `ponder:api`) after schema/config changes
- `pnpm db` — Ponder DB CLI (migrations, status, etc.); see `pnpm db --help`
- `pnpm typecheck` — `tsc` (no emit, strict + `noUncheckedIndexedAccess`)
- `pnpm lint` — `eslint .` using `eslint-config-ponder`

There are no tests in this repo; do not invent a test command.

`PONDER_RPC_URL_1` (mainnet RPC) must be set in `.env.local` before `dev`/`start` will work.

## Architecture

Ponder's runtime is wired through three tightly coupled files plus virtual modules generated from them:

- **`ponder.config.ts`** — declares chains and contracts. Each `contracts[name]` entry binds an ABI + address + `startBlock` to a chain key. The contract `name` becomes the namespace under which event handlers are registered (e.g. `ponder.on("ExampleContract:Transfer", …)`).
- **`ponder.schema.ts`** — declarative table schema using `onchainTable(...)`. This becomes both the Postgres DDL and the typed `ponder:schema` virtual module consumed by handlers and the API.
- **`src/index.ts`** — event-handler entry point. Imports `ponder` from `ponder:registry` (a virtual module typed from `ponder.config.ts`) and registers handlers via `ponder.on("<ContractName>:<EventName>", async ({ event, context }) => …)`. The handler writes through `context.db` using the schema tables.
- **`src/api/index.ts`** — Hono app mounted by Ponder. `client({ db, schema })` exposes a SQL-over-HTTP endpoint at `/sql/*`; `graphql({ db, schema })` is mounted at both `/` and `/graphql`. Add custom REST routes by attaching them to this `app` before the default export.

When you add a contract to `ponder.config.ts`, you also need (a) its ABI file under `abis/` exported `as const` so viem can infer event types, and (b) handlers in `src/index.ts` (or a file imported from it) — Ponder will warn about unhandled events but still index them. After any of those changes, rerun `pnpm codegen` (or just keep `pnpm dev` running, which regenerates automatically).

## Conventions specific to this repo

- **Strict TS, `noUncheckedIndexedAccess: true`** — array/record access yields `T | undefined`. Don't paper over this with `!`; narrow explicitly.
- **`pnpm-workspace.yaml` enforces supply-chain hardening** — `minimumReleaseAge: 10080` (7 days), `blockExoticSubdeps: true`, `trustPolicy: no-downgrade`. Newly published packages will fail to install for a week; this is intentional. Don't relax these to unblock yourself — surface the constraint to the user.
- **ABIs must be `as const`** for viem's type inference to flow into handler `event.args`.
- **Don't hand-edit `ponder-env.d.ts`** — it's regenerated on Ponder upgrades and the file itself says to commit any auto-changes rather than edit.
