import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.{ts,cts,mts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        ...globals.node,
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/explicit-function-return-type": "warn",
    },
    extends: [
      "plugin:@typescript-eslint/recommended",
    ],
  },
  {
    files: ["**/*.{ts,mts,cts}"],
    plugins: { js },
    extends: ["ts/recommended"],
    rules: {
      'no-unused-vars': 2,
      'eqeqeq': 2,
      'no-var': 2,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      }
    }
  }
]);
