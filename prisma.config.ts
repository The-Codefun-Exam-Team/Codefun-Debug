import "dotenv/config";

import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "src/database/prisma/schema",
  migrations: {
    seed: "tsx src/database/prisma/seed/main.ts",
    path: "src/database/prisma/migrations",
  },
});
