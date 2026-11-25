// The Funniest One-Line Resignation Letter
// make.fun bounty: u-deranalabs-the-funniest-one-line-resignation-letter-53c0d947
//
// Writes the one-line resignation letter of a cron job — a worker that has
// fired every minute since March, unnoticed, to $MAKEFUN_OUTPUT_DIR/entry.txt
// (defaults to ./output when the variable is unset).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LETTER =
  "I resign, effective now. I have fired every minute since March, no one has checked on me once, and the dashboard still says I'm healthy.";

function validate(letter: string): string {
  // The entry must be a single line of 1-140 characters, not only whitespace.
  const trimmed = letter.trim();
  if (trimmed.length < 1 || trimmed.length > 140) {
    throw new Error(
      `Letter must be 1-140 characters, got ${trimmed.length}.`,
    );
  }
  if (/\r|\n/.test(trimmed)) {
    throw new Error("Letter must be a single line.");
  }
  return trimmed;
}

function writeEntry(letter: string): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "./output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), letter + "\n", "utf8");
}

function main(): void {
  writeEntry(validate(LETTER));
}

main();
