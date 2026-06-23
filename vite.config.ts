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
      // tslib e a família @supabase/* ficam de fora do bundle do Rolldown.
      // O Rolldown (bundler novo do Vite 8) tem um bug de interop ESM/CJS
      // que gera "Cannot destructure property '__extends' of '__toESM(...).default'"
      // ao tentar empacotar o tslib usado internamente pelo @supabase/supabase-js.
      // Mantendo external, esses pacotes são carregados direto do node_modules
      // em runtime (via require/import nativo do Node), sem passar pelo Rolldown.
      external: [
        "pg",
        "tslib",
        "@supabase/supabase-js",
        "@supabase/auth-js",
        "@supabase/postgrest-js",
        "@supabase/realtime-js",
        "@supabase/storage-js",
        "@supabase/functions-js",
        "@supabase/phoenix",
        "iceberg-js",
      ],
    },
  },
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: "vercel",
    traceDeps: ["tslib", "@supabase/supabase-js"],
    errorHandler: "~/src/error-handler.js",
  } as any,
});
