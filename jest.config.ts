import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1" // Maps "@/file" to "src/file"
  }
};

export default config;