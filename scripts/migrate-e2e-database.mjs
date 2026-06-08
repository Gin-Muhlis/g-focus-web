import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

const e2eDatabaseUrl = process.env.E2E_DATABASE_URL;
const prismaBin = join(
  fileURLToPath(new URL("..", import.meta.url)),
  "node_modules",
  ".bin",
  process.platform === "win32" ? "prisma.cmd" : "prisma",
);

function databaseUrlIsSafeForE2E(url) {
  if (!url) {
    return false;
  }

  const normalized = url.toLowerCase();
  const safeMarkers = [
    "localhost",
    "127.0.0.1",
    "::1",
    "test",
    "testing",
    "e2e",
    "ci",
  ];

  return safeMarkers.some((marker) => normalized.includes(marker));
}

if (!databaseUrlIsSafeForE2E(e2eDatabaseUrl)) {
  throw new Error(
    "Refusing to migrate E2E database without a clearly local/test E2E_DATABASE_URL.",
  );
}

if (!existsSync(prismaBin)) {
  throw new Error("Prisma CLI is not installed. Run npm install first.");
}

const result = spawnSync(prismaBin, ["migrate", "deploy"], {
  env: {
    ...process.env,
    DATABASE_URL: e2eDatabaseUrl,
  },
  stdio: "inherit",
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
