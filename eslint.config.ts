import eslint from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import jestPlugin from "eslint-plugin-jest";
import globals from "globals";
import type { Linter } from "eslint";

export default [
  // Global ignores
  {
    ignores: ["dist/", "node_modules/"]
  },

  // Base JS recommendations
  eslint.configs.recommended,

  // TypeScript files
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json"
      },
      globals: {
        ...globals.node
      }
    },
    rules: {
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
    },
  },

  // Jest test files
  {
    files: ["**/*.test.ts"],
    plugins: {
      jest: jestPlugin
    },
    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  }
] satisfies Linter.Config[];