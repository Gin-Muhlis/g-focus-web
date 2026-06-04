import "server-only";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";

type RateLimit = {
  scope: string;
  identifier: string;
  limit: number;
  windowMs: number;
};

type RateLimitRow = {
  attempts: number;
};

function rateLimitKey(scope: string, identifier: string) {
  return createHash("sha256").update(`${scope}:${identifier}`).digest("hex");
}

export async function getRequestIp() {
  const requestHeaders = await headers();

  return (
    requestHeaders.get("x-real-ip")?.trim() ||
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

export async function isRateLimited({
  scope,
  identifier,
  limit,
  windowMs,
}: RateLimit) {
  const key = rateLimitKey(scope, identifier);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + windowMs);
  const rows = await prisma.$queryRaw<RateLimitRow[]>`
    INSERT INTO "AuthRateLimit" ("key", "attempts", "windowStart", "expiresAt")
    VALUES (${key}, 1, ${now}, ${expiresAt})
    ON CONFLICT ("key") DO UPDATE SET
      "attempts" = CASE
        WHEN "AuthRateLimit"."expiresAt" <= ${now} THEN 1
        ELSE "AuthRateLimit"."attempts" + 1
      END,
      "windowStart" = CASE
        WHEN "AuthRateLimit"."expiresAt" <= ${now} THEN ${now}
        ELSE "AuthRateLimit"."windowStart"
      END,
      "expiresAt" = CASE
        WHEN "AuthRateLimit"."expiresAt" <= ${now} THEN ${expiresAt}
        ELSE "AuthRateLimit"."expiresAt"
      END
    RETURNING "attempts"
  `;

  return (rows[0]?.attempts ?? limit + 1) > limit;
}
