import { spawn } from "node:child_process";
import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createServer } from "node:net";
import { fileURLToPath } from "node:url";
import { PGlite } from "@electric-sql/pglite";
import { PGLiteSocketServer } from "@electric-sql/pglite-socket";
import pg from "pg";

const { Client } = pg;
const rootDir = fileURLToPath(new URL("..", import.meta.url));
const migrationsDir = join(rootDir, "prisma", "migrations");

async function getAvailablePort() {
  const server = createServer();

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  const port = typeof address === "object" && address ? address.port : null;

  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });

  if (!port) {
    throw new Error("Unable to allocate a local E2E database port.");
  }

  return port;
}

async function applyMigrations(databaseUrl) {
  const client = new Client({ connectionString: databaseUrl });
  await client.connect();

  try {
    const migrationDirs = (
      await readdir(migrationsDir, { withFileTypes: true })
    )
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();

    for (const migrationDir of migrationDirs) {
      const migrationPath = join(migrationsDir, migrationDir, "migration.sql");
      const sql = await readFile(migrationPath, "utf8");
      await client.query(sql);
    }
  } finally {
    await client.end();
  }
}

function runPlaywright(databaseUrl, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      process.platform === "win32" ? "npm.cmd" : "npm",
      ["run", "e2e", "--", ...args],
      {
        cwd: rootDir,
        env: {
          ...process.env,
          DATABASE_URL: databaseUrl,
          E2E_DATABASE_URL: databaseUrl,
        },
        stdio: "inherit",
      },
    );

    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (signal) {
        reject(new Error(`Playwright exited with signal ${signal}.`));
        return;
      }

      resolve(code ?? 1);
    });
  });
}

const dbDir = await mkdtemp(join(tmpdir(), "g-focus-e2e-"));
const port = await getAvailablePort();
const databaseUrl = `postgresql://postgres:postgres@127.0.0.1:${port}/postgres`;
const db = await PGlite.create(dbDir);
const server = new PGLiteSocketServer({
  db,
  host: "127.0.0.1",
  port,
  maxConnections: 20,
});

let exitCode = 1;

try {
  await server.start();
  await applyMigrations(databaseUrl);
  exitCode = await runPlaywright(databaseUrl, process.argv.slice(2));
} finally {
  await server.stop().catch(() => {});
  await db.close().catch(() => {});
  await rm(dbDir, { force: true, recursive: true }).catch(() => {});
}

process.exit(exitCode);
