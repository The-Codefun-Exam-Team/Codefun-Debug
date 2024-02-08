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
  plugins: ["@typescript-eslint", "simple-import-sort", "tailwindcss"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: ["@/providers/*/*", "@/hooks/*", "@/redux/*/*"],
      },
    ],
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
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          Array: "Use T[] instead",
        },
        extendDefaults: true,
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
