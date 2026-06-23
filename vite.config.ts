// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

import fs from "fs";
import path from "path";

function copyTslibIntoVercelFunction() {
  const vercelFunctionDir = path.resolve(__dirname, ".vercel/output/functions/__server.func");

  if (!fs.existsSync(vercelFunctionDir)) {
    return;
  }

  fs.cpSync(
    path.resolve(__dirname, "node_modules/tslib"),
    path.join(vercelFunctionDir, "node_modules/tslib"),
    { recursive: true },
  );
}

export default defineConfig({
  vite: {
    plugins: [
      {
        name: "copy-tslib-into-vercel-function",
        closeBundle: copyTslibIntoVercelFunction,
      },
    ],
    resolve: {
      alias: {
        tslib: path.resolve(__dirname, "node_modules/tslib/tslib.es6.mjs"),
      },
    },
    ssr: {
      noExternal: ["@radix-ui/*", "tslib"],
    },
  },
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: "vercel",
    noExternals: ["tslib"],
    traceDeps: ["tslib"],
  } as any,
});
