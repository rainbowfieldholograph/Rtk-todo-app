import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      perfectionist.configs["recommended-natural"],
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "react-refresh/only-export-components": "off",
      "perfectionist/sort-imports": ["warn"],
      "perfectionist/sort-jsx-props": ["warn"],
      "perfectionist/sort-object-types": ["warn"],
      "perfectionist/sort-modules": ["warn"],
      "perfectionist/sort-objects": ["warn"],
    },
  },
]);
