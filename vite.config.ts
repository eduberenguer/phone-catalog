import { defineConfig, coverageConfigDefaults } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    minify: mode === "production" ? "esbuild" : false,
    sourcemap: mode !== "production",
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    coverage: {
      exclude: [
        ...coverageConfigDefaults.exclude,
        "src/types/**",
        "src/components/Navbar/LogoMark.tsx",
        "src/main.tsx",
        "src/router.tsx",
        "commitlint.config.cjs",
      ],
    },
  },
}));
