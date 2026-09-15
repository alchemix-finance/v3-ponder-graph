import { db } from "ponder:api";
import schema from "ponder:schema";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { client, graphql } from "ponder";

const envNumber = (value: string | undefined, fallback: number): number => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

// --- Rate limiting: fixed window per client IP, in-memory (single instance) ---
const RATE_LIMIT = envNumber(process.env.API_RATE_LIMIT, 100);
const RATE_WINDOW_MS = envNumber(process.env.API_RATE_WINDOW_MS, 10_000);

const hits = new Map<string, { count: number; reset: number }>();
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of hits) {
    if (now >= entry.reset) hits.delete(key);
  }
}, 60_000).unref();

const app = new Hono();

// CORS first: preflights answered without burning rate budget, and 429s
// still carry CORS headers so browser clients can read them.
app.use("*", cors());

app.use("*", async (c, next) => {
  const ip =
    c.req.header("cf-connecting-ip") ??
    c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const now = Date.now();
  let entry = hits.get(ip);
  if (entry === undefined || now >= entry.reset) {
    entry = { count: 0, reset: now + RATE_WINDOW_MS };
    hits.set(ip, entry);
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT) {
    c.header("Retry-After", String(Math.ceil((entry.reset - now) / 1000)));
    return c.text("Too Many Requests", 429);
  }
  return next();
});

// --- CDN caching: mark /sql/db responses cacheable so Cloudflare (set to
// "respect origin cache-control") serves repeats from the edge. /sql/live is
// SSE and never gets this header, so it stays uncached. ---
const CACHE_SMAXAGE = envNumber(process.env.API_CACHE_SMAXAGE, 10);

app.use("/sql/db", async (c, next) => {
  await next();
  if (c.res.status === 200) {
    c.res.headers.set(
      "Cache-Control",
      `public, max-age=0, s-maxage=${CACHE_SMAXAGE}`,
    );
  }
});

app.use("/sql/*", client({ db, schema }));

// Query limits for public exposure. The schema declares no relations, so data
// queries cannot nest beyond ~5 levels regardless of the depth cap; the cap
// exists to bound introspection, which Ponder does not exempt. The depth
// plugin counts each fragment spread as an extra level, which puts the standard
// introspection query at 21, so 25 keeps the playground's schema tab working.
// Aliases are the real fan-out guard.
const graphqlMiddleware = graphql(
  { db, schema },
  { maxOperationDepth: 25, maxOperationTokens: 1000, maxOperationAliases: 10 },
);
app.use("/", graphqlMiddleware);
app.use("/graphql", graphqlMiddleware);

export default app;
