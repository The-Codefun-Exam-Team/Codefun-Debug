/* eslint-disable tsdoc/syntax */
/** @type {import("@types/eslint").Linter.BaseConfig} */
module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: ["@typescript-eslint", "eslint-plugin-tsdoc", "simple-import-sort", "tailwindcss"],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        ignoreRestSiblings: true,
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["**/*.config.{cjs,mjs,js,ts}"] },
    ],
    // Doesn't really work with VSCode...
    "import/no-unresolved": "off",
    "import/no-named-as-default-member": "off",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/classnames-order": "off",
    "tsdoc/syntax": "warn",
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx", ".mjs", ".cjs", ".js"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: ["packages/*/tsconfig.json", "apps/*/tsconfig.json"],
      },
    },
    next: {
      rootDir: "apps/*",
    },
  },
  ignorePatterns: [
    // dependencies
    "node_modules",
    "!.ncurc.js",
    ".pnp",
    ".pnp.js",
    "pnpm-lock.yaml",
    // misc
    ".DS_Store",
    "*.pem",
    // debug
    "npm-debug.log*",
    "yarn-debug.log*",
    "yarn-error.log*",
    ".pnpm-debug.log*",
    // env
    ".env*",
    // production
    ".vercel",
    ".next/",
    "out/",
    "build",
    // coverage
    "coverage",
    // typescript
    "*.tsbuildinfo",
    "next-env.d.ts",
    // others
    "*.css",
    "*.json",
  ],
};
