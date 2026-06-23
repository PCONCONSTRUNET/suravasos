import fs from "fs";
import path from "path";

const vercelFunctionDir = path.resolve(".vercel/output/functions/__server.func");
const dest = path.join(vercelFunctionDir, "node_modules/tslib");
const src = path.resolve("node_modules/tslib");

if (fs.existsSync(vercelFunctionDir)) {
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true });
  }
  fs.cpSync(src, dest, { recursive: true });
  console.log("tslib copied into .vercel/output/functions/__server.func/node_modules/tslib");
} else {
  console.log("No Vercel function output found, skipping tslib copy.");
}
