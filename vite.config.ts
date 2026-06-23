// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env define injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

import fs from "fs";
import path from "path";

function copyTslibIntoVercelFunction() {
  const vercelFunctionDir = path.resolve(".vercel/output/functions/__server.func");
  if (!fs.existsSync(vercelFunctionDir)) {
    return;
  }
  const src = path.resolve("node_modules/tslib");
  const dest = path.join(vercelFunctionDir, "node_modules/tslib");
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true });
  }
  fs.cpSync(src, dest, { recursive: true });
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
      },
    },
    ssr: {
      noExternal: [/^@radix-ui/],
      external: ["pg"],
    },
  },
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: "vercel",
    traceDeps: ["tslib", "@supabase/supabase-js"],
  } as any,
});
