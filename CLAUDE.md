# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project purpose

This is a [Ponder](https://ponder.sh) indexer for Alchemix V3 across **mainnet, Optimism, and Arbitrum One**. Ponder consumes onchain events, writes them to Postgres, and exposes the resulting data via auto-generated GraphQL and a SQL-over-HTTP endpoint.

Indexed contracts (each with two address instances per chain — typically the alETH and alUSD/USDC variants):

- `alchemistV3` — core CDP contract (Deposit/Withdraw/Mint/Burn/Repay/Liquidated/…)
- `transmuterV3` — synthetic redemption (PositionCreated/PositionClaimed/AlchemistUpdated)
- `MYT` — yield vault (Deposit/Withdraw/Allocate/Deallocate/AccrueInterest, plus governance events)
- `AlchemistV3Position` — position NFT (Transfer)

`PONDER_HOWTO.md` is the end-user walkthrough for running this indexer locally; keep it in sync when changing setup steps, env vars, or chain list.

## Commands

- `pnpm dev` — run the indexer in watch mode (regenerates virtual modules on change)
- `pnpm start` — production mode (no hot reload)
- `pnpm codegen` — regenerate Ponder's virtual modules (`ponder:registry`, `ponder:schema`, `ponder:api`) after schema/config changes
- `pnpm db` — Ponder DB CLI (migrations, status, etc.); see `pnpm db --help`
- `pnpm typecheck` — `tsc` (no emit, strict + `noUncheckedIndexedAccess`)
- `pnpm lint` — `eslint .` using `eslint-config-ponder`

There are no tests in this repo; do not invent a test command.

`.env.local` must define before `dev`/`start`:

- `DATABASE_URL` — Postgres connection string (the config hardcodes `kind: "postgres"`; SQLite is not used)
- `PONDER_RPC_URL_1` — Ethereum mainnet RPC
- `PONDER_RPC_URL_10` — Optimism RPC
- `PONDER_RPC_URL_42161` — Arbitrum One RPC

## Architecture

Ponder's runtime is wired through three tightly coupled files plus virtual modules generated from them:

- **`ponder.config.ts`** — declares chains and contracts. Each `contracts[name]` entry binds an ABI to multiple `chain.<chainKey>` blocks, each with `address` (array of instances) and `startBlock`. The contract `name` becomes the namespace under which event handlers are registered (e.g. `ponder.on("alchemistV3:Deposit", …)`).
- **`ponder.schema.ts`** — declarative table schema using `onchainTable(...)`. Every table carries a `chain` column with a `chainIdx` index because the same contract is indexed across three chains and rows need to be disambiguated. This becomes both the Postgres DDL and the typed `ponder:schema` virtual module.
- **`src/index.ts`** — single-file event-handler entry point (~2.7k lines). Imports `ponder` from `ponder:registry` and registers handlers via `ponder.on("<ContractName>:<EventName>", …)`. Writes through `context.db` using schema tables; reads onchain state via `context.client.readContract`.
- **`src/api/index.ts`** — Hono app mounted by Ponder. `client({ db, schema })` exposes a SQL-over-HTTP endpoint at `/sql/*`; `graphql({ db, schema })` is mounted at both `/` and `/graphql`. Add custom REST routes by attaching them to this `app` before the default export.

`:setup` handlers (currently `MYT:setup`, `transmuterV3:setup`) run **once before indexing begins**, get `context.db` but **no `event`**, and are the place to seed initial state.

When you add a contract to `ponder.config.ts`, you also need (a) its ABI file under `abis/` exported `as const` so viem can infer event types, and (b) handlers in `src/index.ts` — Ponder will warn about unhandled events but still index them. After any of those changes, rerun `pnpm codegen` (or just keep `pnpm dev` running, which regenerates automatically).

## Conventions specific to this repo

- **`src/index.ts` handlers look auto-generated.** Variable names like `_contractread_43__out_param0`, `_typecast_45__result`, `_strconcat_48__result`, and the repeated `for (let __n = 1; ; __n++)` retry-on-`UniqueConstraintError` insert pattern recur across handlers verbatim. Treat the file as machine output: prefer regenerating from the upstream spec (rather than hand-editing) if possible, and if you must edit by hand, keep changes surgical and match the existing shape so a future regeneration diff stays small. Ask before refactoring stylistically.
- **Multi-chain row IDs.** The same logical event fires on three chains; many handlers compose IDs from `event.transaction.hash`, `event.log.address`, and `event.block.timestamp` and rely on the unique-constraint retry loop to disambiguate. Don't simplify this without understanding why it's there.
- **Strict TS, `noUncheckedIndexedAccess: true`** — array/record access yields `T | undefined`. Don't paper over this with `!`; narrow explicitly.
- **`pnpm-workspace.yaml` enforces supply-chain hardening** — `minimumReleaseAge: 10080` (7 days), `blockExoticSubdeps: true`, `trustPolicy: no-downgrade`. Newly published packages will fail to install for a week; this is intentional. Don't relax these to unblock yourself — surface the constraint to the user.
- **ABIs must be `as const`** for viem's type inference to flow into handler `event.args`.
- **Don't hand-edit `ponder-env.d.ts`** — it's regenerated on Ponder upgrades and the file itself says to commit any auto-changes rather than edit.
