#!/usr/bin/env node

const [major, minor] = process.versions.node.split(".").map(Number);

const supported =
  (major === 20 && minor >= 9) ||
  (major === 21) ||
  (major === 22);

if (!supported) {
  console.error(
    [
      "Unsupported Node.js version for governed.",
      `Detected: ${process.version}`,
      "Required: >=20.9.0 <23",
      "Use `nvm use` in this repo (see .nvmrc) or switch to Node 20/22 LTS.",
    ].join("\n"),
  );
  process.exit(1);
}

console.log(`Node version OK: ${process.version}`);
