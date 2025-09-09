import { FastifyRequest, FastifyReply } from "fastify";

interface Bucket {
  capacity: number;
  tokens: number;
  lastChecked: number;
}

const buckets = new Map<string, Bucket>();

const CAPACITY = 5;
const LEAK_RATE = 1 / 10;
const CLEANUP_AFTER = 60;

setInterval(() => {
  const now = Date.now();
  for (const [userId, bucket] of buckets) {
    const elapsed = (now - bucket.lastChecked) / 1000;
    const leaked = elapsed * LEAK_RATE;

    bucket.tokens = Math.max(0, bucket.tokens - leaked);
    bucket.lastChecked = now;

    if (bucket.tokens === 0 && elapsed > CLEANUP_AFTER) {
      buckets.delete(userId);
    }
  }
}, 1000);

export async function rateLimiter(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const userId = request.headers["x-user-id"] as string | undefined;

  if (!userId) {
    return reply.status(400).send({ error: "x-user-id header required" });
  }

  let bucket = buckets.get(userId);

  if (!bucket) {
    bucket = { capacity: CAPACITY, tokens: 0, lastChecked: Date.now() };
    buckets.set(userId, bucket);
  }

  if (Math.ceil(bucket.tokens) < bucket.capacity) {
    bucket.tokens += 1;
    return;
  }

  return reply.status(429).send({ error: "Too Many Requests" });
}
