# How to Run "alchemixv3" with Ponder

**What this is:** Ponder is a blockchain indexer.  It connects to the Ethereum
network (or other EVM chains), reads every event emitted by the smart contracts
you configured, runs your handler code for each event, and stores the results in
a database.  Once it's running, you can query all that data instantly through a
GraphQL API — no waiting for RPC calls, no parsing raw transaction logs yourself.

**What you'll end up with:**
- A running indexer that stays up to date with the chain in real time
- A GraphQL API at `http://localhost:42069/graphql`
- An interactive query playground in your browser where you can explore the data

> **Setup handlers:** One or more contracts have a `:setup` handler that runs
> once before indexing begins (at `startBlock`).  This is used to seed initial
> state.  The handler has access to `context.db` but **not** `event` — any
> generated code using `event.*` inside setup will need manual adjustment.

---

## Step 1 — Install Node.js and pnpm

Ponder requires **Node.js 18 or later**.  The easiest way to install it is via
`nvm` (Node Version Manager), which lets you switch Node versions without
touching your system install.

```bash
# 1. Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# 2. Close and reopen your terminal, then install Node 20
nvm install 20
nvm use 20

# 3. Install pnpm (the package manager Ponder uses)
npm install -g pnpm

# 4. Verify everything installed correctly
node --version    # should print v20.x.x
pnpm --version    # should print 8.x.x or later
```

If `nvm` is not found after reopening the terminal, run:
```bash
source ~/.bashrc    # Linux / WSL
source ~/.zshrc     # macOS with zsh
```

---

## Step 2 — Get an RPC endpoint

To read blockchain data, Ponder needs to connect to a blockchain node via an
**RPC (Remote Procedure Call) endpoint** — a URL that lets your indexer send
requests like "give me all events from block 18000000 to 18001000".

This project indexes: **mainnet**, **optimism**, **arbitrum-one**.
You need one RPC URL per chain.

### Get a free endpoint from Alchemy

[Alchemy](https://alchemy.com) provides free RPC endpoints and is the easiest
option for getting started.

1. Go to <https://alchemy.com> and sign up for a free account.
2. Click **"Create new app"**.
3. Give it a name (anything, e.g. *my-ponder-app*).
4. Select the network(s) you need (match the chain(s) listed above).
5. Click **"Create app"**.
6. On the app dashboard, click **"API key"** (top right).
7. Copy the **HTTPS** URL — it looks like:
   `https://eth-mainnet.g.alchemy.com/v2/abc123XYZ...`

Repeat for each chain if you need more than one.

> **Alternatives:** [Infura](https://infura.io), [QuickNode](https://quicknode.com),
> [Ankr](https://ankr.com), and [drpc.org](https://drpc.org) all offer free tiers.
> Any HTTPS RPC endpoint works — just paste the URL in the next step.

You'll paste these URLs into `.env.local` in Step 3.

---

## Step 3 — Set up PostgreSQL and configure environment variables

This project uses PostgreSQL as its database.  You need a running Postgres
server before starting the indexer.

### 3a — Install PostgreSQL

**macOS (Homebrew):**
```bash
brew install postgresql@16
brew services start postgresql@16
```

**Ubuntu / Debian (including WSL on Windows):**
```bash
sudo apt update && sudo apt install -y postgresql
sudo systemctl start postgresql
sudo systemctl enable postgresql   # auto-start on reboot
```

**Managed cloud (no local install — easiest option):**
- [Supabase](https://supabase.com) — free tier, includes a connection string
- [Neon](https://neon.tech) — free tier, serverless Postgres
- [Railway](https://railway.app) — free tier, one-click Postgres

If you use a managed service, skip to step 3c and use the connection string
they provide.

### 3b — Create the database and user

> **Linux note — "Peer authentication failed":**
> On Linux, PostgreSQL only lets you log in as the `postgres` superuser if you
> are *also* running as the `postgres` Linux system user.  Typing
> `psql -U postgres` in a normal terminal will fail.  Use `sudo -u postgres psql`
> instead — this switches to the postgres system user first.

```bash
sudo -u postgres psql
```

> **macOS (Homebrew) note:** Try `psql postgres` (no sudo) — Homebrew makes
> your own macOS username the superuser.

You should see a prompt like `postgres=#`.  Now type these commands exactly,
pressing Enter after each one.  Replace `yourpassword` with a password you
choose (write it down — you'll need it again):

```sql
CREATE DATABASE ponder;
CREATE USER ponder WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE ponder TO ponder;
\c ponder
GRANT ALL ON SCHEMA public TO ponder;
\q
```

**What each line does:**
- `CREATE DATABASE ponder` — creates a new empty database called `ponder`
- `CREATE USER ponder WITH PASSWORD ...` — creates a login for Ponder to use
- `GRANT ALL PRIVILEGES ON DATABASE ponder TO ponder` — lets that user access the database
- `\c ponder` — switches psql into the `ponder` database
- `GRANT ALL ON SCHEMA public TO ponder` — lets the user create tables (required on PostgreSQL 15+)
- `\q` — exits psql

### 3c — Verify the connection

Before going further, confirm Ponder can actually reach the database:

```bash
psql "postgresql://ponder:yourpassword@localhost:5432/ponder"
```

Replace `yourpassword` with the password you chose above.
You should see a `ponder=>` prompt.  Type `\q` to exit.

If you get an error, see the Troubleshooting section at the bottom of this file.

Do not proceed until this command works.

### 3d — Create `.env.local`

```bash
cd "/tmp/p"
cp .env.example .env.local
```

Open `.env.local` in any text editor and fill in every blank value:

```
# ── RPC endpoints ─────────────────────────────────────────────────────────
# Paste your Alchemy (or other provider) HTTPS URLs here.
PONDER_RPC_URL_1=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
PONDER_RPC_URL_10=https://eth-optimism.g.alchemy.com/v2/YOUR_KEY
PONDER_RPC_URL_42161=https://eth-arbitrum-one.g.alchemy.com/v2/YOUR_KEY
PONDER_RPC_URL_8453=https://base-mainnet.g.alchemy.com/v2/YOUR_KEY

# ── Database ───────────────────────────────────────────────────────────────
# The connection string for your PostgreSQL database.
DATABASE_URL=postgresql://ponder:yourpassword@localhost:5432/ponder

# The schema (namespace) Ponder will use inside the database.
# 'public' is fine for a single instance.  Use a different name
# if you run multiple Ponder instances against the same database.
DATABASE_SCHEMA=public
```

> **Important:** Ponder reads `.env.local`, not `.env`.
> Make sure the file is named exactly `.env.local`.

---

## Step 4 — Install project dependencies

This downloads Ponder and all the other packages this project needs.

```bash
cd "/tmp/p"
pnpm install
```

This may take a minute.  When it finishes you should see something like
`Done in Xs`.

> **Supply-chain tip:** commit `pnpm-lock.yaml` to your repository after this
> step.  The lockfile records the exact content hash of every installed package,
> making future installs fully reproducible and tamper-evident.
> ```bash
> git add pnpm-lock.yaml && git commit -m "chore: add pnpm lockfile"
> ```

> **"Ignored build scripts: esbuild"** — if you see this warning, run:
> ```bash
> pnpm approve-builds
> ```
> Select all `esbuild` entries and approve them.  Ponder may not start
> correctly without this step.

---

## Step 5 — Start the indexer

```bash
pnpm dev
```

> **`pnpm dev` vs `pnpm start`:**
> - `pnpm dev` — for local development.  Supports hot-reload (automatically
>   restarts when you edit handler code).  Uses PGlite if no database config
>   is set, otherwise uses your `DATABASE_URL`.
> - `pnpm start` — for production servers only.  Always requires PostgreSQL
>   and `DATABASE_SCHEMA`.  Do not use this for local development.

### What you'll see in the terminal

A healthy startup looks like this:

```
INFO  Connected to database type=postgres ...
INFO  Connected to JSON-RPC chain=mainnet ...
INFO  Started syncing ...  startBlock=18000000
```

Then it will show a progress bar as it works through historical blocks:

```
INFO  Syncing ... 12% (block 18120000 / 19000000)
INFO  Syncing ... 34% (block 18620000 / 19000000)
```

**This can take a long time** (minutes to hours) depending on how many blocks
it needs to process.  The further back your `startBlock` is, the longer it takes.
Leave the terminal open and let it run.

Once it catches up to the current block it will print:

```
INFO  Realtime sync started
```

At that point your data is live and the GraphQL API is ready to query.

### How to stop the indexer

Press **Ctrl + C** in the terminal.  Your data is saved in the database and
will still be there when you restart.  The next time you run `pnpm dev` or
`pnpm start`, Ponder will pick up from where it left off.

---

## Step 6 — View and query your data

Once the indexer is running (even before it finishes syncing historical data),
open your browser and go to:

**<http://localhost:42069/graphql>**

You will see the **GraphiQL playground** — an interactive query editor built
into Ponder.  It looks like a split-screen text editor.

### What is GraphQL?

GraphQL is a query language for APIs.  Instead of fixed endpoints like REST
(`/api/transfers`, `/api/users`), you write a query that describes exactly which
fields you want, and the API returns just those fields.

### Your first query

Click in the left panel of the playground and type:

```graphql
{
  deposits(limit: 10) {
    items {
      id
      chain
      alchemist
      amount
    }
  }
}
```

Then press the **▶ Run** button (or Ctrl+Enter).  The right panel will show
the results as JSON.

### Discover all available tables and fields

Click the **"Schema"** tab on the right side of the playground (or the book
icon).  This shows every table and every field available to query — it's
generated automatically from the entities you defined on the canvas.

You can also click **"Docs"** to browse the full auto-generated API documentation.

### Useful query patterns

**Get the most recent 20 records:**
```graphql
{
  deposits(limit: 20, orderBy: "id", orderDirection: "desc") {
    items {
      id
      chain
      alchemist
      amount
    }
  }
}
```

**Filter by chain (if you index multiple networks):**
```graphql
{
  deposits(where: { chain: "mainnet" }, limit: 10) {
    items {
      id
      chain
      alchemist
      amount
    }
  }
}
```

**Get the total count:**
```graphql
{
  deposits(limit: 1) {
    totalCount
  }
}
```

> **Auto `chain` field:** Every table has a `chain` column automatically added
> by the generator (`chain: context.chain.name` on every insert).  Use it to
> separate data from different networks in your queries.

### Query via curl (command line)

If you prefer the command line over the browser playground:

```bash
curl -X POST http://localhost:42069/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ deposits(limit: 5) { items { id chain alchemist amount } } }"}'
```

---

## Step 7 — Production deployment

Your project is already configured for PostgreSQL, so production is
straightforward.  You just need a server that can run Node.js and reach
your database.

### Environment variables

Make sure these are set on your production server (or in your hosting
platform's secrets / environment variables dashboard):

```
DATABASE_URL=postgresql://ponder:yourpassword@host:5432/ponder
DATABASE_SCHEMA=public
PONDER_RPC_URL_1=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
PONDER_RPC_URL_10=https://eth-optimism.g.alchemy.com/v2/YOUR_KEY
PONDER_RPC_URL_42161=https://eth-arbitrum-one.g.alchemy.com/v2/YOUR_KEY
PONDER_RPC_URL_8453=https://base-mainnet.g.alchemy.com/v2/YOUR_KEY
```

Optional API tuning for the public endpoint (safe to omit — defaults shown):

```
API_RATE_LIMIT=100        # max requests per client IP per window
API_RATE_WINDOW_MS=10000  # rate-limit window in milliseconds
API_CACHE_SMAXAGE=10      # Cache-Control s-maxage (seconds) on /sql/db responses
```

> **Managed Postgres (Supabase, Neon, Railway):** Use the connection string
> they give you.  If connections fail, try adding `?sslmode=require` to the URL.

> **PostgreSQL 15+ schema permissions:** If Ponder fails with
> `permission denied for schema public`, run this once on the database:
> ```sql
> GRANT ALL ON SCHEMA public TO ponder;
> ```
> On managed databases, look for a "Schema privileges" option in the dashboard.

### Start

```bash
pnpm start
```

**Popular hosting options:**
- [Railway](https://railway.app) — add a Postgres service and a Node.js service, set env vars in the dashboard
- [Render](https://render.com) — Web Service + Render Postgres (free tier available)
- [Fly.io](https://fly.io) — `fly launch` then `fly postgres create`

> **Schema conflicts:** If you run two Ponder instances against the same database,
> give each a different `DATABASE_SCHEMA` (e.g. `staging`, `prod`).
> Two instances cannot share the same schema at the same time.

---

## Quick reference

| Command        | Description                                      |
|----------------|--------------------------------------------------|
| `pnpm dev`     | Start indexer with hot-reload (development)      |
| `pnpm start`   | Start indexer in production mode                 |
| `pnpm codegen` | Regenerate TypeScript types after schema changes |
| Ctrl + C       | Stop the indexer                                 |

| URL | What it is |
|---|---|
| `http://localhost:42069/graphql` | GraphiQL playground + GraphQL API |

---

## Troubleshooting

**Indexing is slow / taking a long time**
→ This is normal.  The time depends on how many blocks Ponder needs to process.
  If `startBlock` is set to a very early block number, it may take hours.
  To speed up: open `ponder.config.ts`, find your contract's `startBlock`,
  and set it to a more recent block (closer to the current block number).
  You can look up a contract's deployment block on Etherscan.

**GraphQL returns empty results**
→ The indexer may still be syncing.  Check the terminal — if it still shows
  a progress percentage, wait until it reaches 100% (or at least until it
  has passed the blocks where your events occurred).  Alternatively, query
  `totalCount` to see if any records exist yet.

**GraphQL playground shows "Network error"**
→ The indexer is not running.  Start it with `pnpm dev` and wait for the
  `Realtime sync started` line before opening the playground.

**`Error: Invalid RPC URL`**
→ Check that your `PONDER_RPC_URL_*` variable(s) are set in `.env.local` and
  are valid HTTPS URLs.  Required variable(s) for this project:
  `PONDER_RPC_URL_1`, `PONDER_RPC_URL_10`, `PONDER_RPC_URL_42161`, `PONDER_RPC_URL_8453`

**`Peer authentication failed for user "postgres"`** (when running `psql -U postgres`)
→ On Linux, PostgreSQL only allows you to log in as the `postgres` database user
  if you are also the `postgres` Linux system user.  Use `sudo` instead:
  ```bash
  sudo -u postgres psql
  ```

**`BuildError: Database schema required`** (when running `pnpm start`)
→ `DATABASE_SCHEMA` is missing from `.env.local`.  Add it:
  ```
  DATABASE_SCHEMA=public
  ```
  Note: only `pnpm start` requires this — `pnpm dev` does not.

**`Error: DATABASE_URL is not set`**
→ Add `DATABASE_URL` to `.env.local`.  See Step 3 for the correct format.

**`Connection terminated unexpectedly`** (repeats 5 times then exits)
→ Ponder connected to PostgreSQL but was immediately rejected.  Work through
  this checklist:

  1. Is PostgreSQL running?
     ```bash
     sudo systemctl status postgresql
     sudo systemctl start postgresql   # if inactive
     ```
  2. Check the PostgreSQL log for the real error:
     ```bash
     sudo journalctl -u postgresql -n 30
     ```
  3. Test the credentials directly:
     ```bash
     psql "postgresql://ponder:yourpassword@localhost:5432/ponder"
     ```
     - `password authentication failed` → wrong password; reset with:
       `sudo -u postgres psql -c "ALTER USER ponder WITH PASSWORD 'new';"`
     - `database does not exist` → re-run Step 3b
     - `connection refused` → PostgreSQL is not running (see step 1 above)
  4. Make sure `.env.local` exists and has the correct `DATABASE_URL`:
     ```bash
     cat .env.local
     ```

**`permission denied for schema public`**
→ PostgreSQL 15+ revoked the default schema `CREATE` privilege.  Run:
  ```bash
  sudo -u postgres psql -d ponder -c "GRANT ALL ON SCHEMA public TO ponder;"
  ```

**`SyntaxError` in generated handler code**
→ Regenerate from the canvas.  Some complex type combinations may need
  manual adjustment in `src/index.ts`.

**BigDecimal fields show as text**
→ Ponder has no native arbitrary-precision decimal type.  BigDecimal fields
   are stored as text strings.  To do arithmetic, parse with a library such
   as `decimal.js`, or store values in base units (e.g. wei as BigInt).
