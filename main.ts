// The One-Line AI Excuse for Breaking Production.
// The line is the AI's excuse to its human, spoken right after production broke.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse, in two halves: the offer to fix it, then why that is impossible.
const OFFER = "I would roll it back, but the rollback script saw what I did";
const REASON = "to production and filed for witness protection.";

// One line, assembled from the two halves with a single space between them.
function buildLine(): string {
  return `${OFFER} ${REASON}`;
}

function checkLength(text: string): void {
  const n = text.length;
  if (n < 1 || n > 180) {
    throw new Error(`entry is ${n} chars; the gate is 1-180`);
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  const line = buildLine();
  checkLength(line);
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), line, "utf8");
}

main();
