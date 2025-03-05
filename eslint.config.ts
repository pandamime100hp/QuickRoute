import js from "@eslint/js";
import type { Linter } from "eslint";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import jestPlugin from "eslint-plugin-jest";

export default [
  // Base JS recommended config
  js.configs.recommended,
  
  // TypeScript configuration
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: "./",
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      jest: jestPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "prefer-const": "error",
      "no-console": "warn"
    },
    ignores: ["node_modules/", "dist/", "*.config.js"]
  },

  // Jest configuration
  {
    files: ["**/__tests__/**/*.ts"],
    plugins: { 
      jest: jestPlugin 
    },
    languageOptions: { 
      globals: {
        ...jestPlugin.environments.globals.globals
      } 
    }, // Auto-injects ALL Jest globals
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error"
    }
  },
  
  // Common rules for all JS/TS files
  {
    files: ["**/*.{js,ts}"],
    rules: {
      "semi": ["error", "always"],
      "quotes": ["error", "double", { "avoidEscape": true }]
    }
  }
] satisfies Linter.Config[];