import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

// Run after next build: node scripts/check-built-metadata.mjs
const root = ".next/server/app";
const pages = readdirSync(root, { recursive: true }).filter((file) => file.endsWith(".html"));
assert(pages.includes("index.html"), "Build must include homepage");
for (const file of pages) {
    const html = readFileSync(join(root, file), "utf8");
    const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
    assert(title?.trim(), `Missing title: ${file}`);
    if (file === "index.html") assert.equal(title, "MŠ Tyršovka");
}
console.log(`PASS: ${pages.length} built pages have titles; homepage title is exact`);
