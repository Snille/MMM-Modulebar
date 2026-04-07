import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["node_modules/**"],
  },
  {
    files: ["*.js"],
    ...js.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
        Module: "readonly",
        MM: "readonly",
      },
      ecmaVersion: 2022,
      sourceType: "script",
    },
    rules: {
      "sort-keys": "off",
    },
  },
]);
