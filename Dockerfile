# syntax=docker/dockerfile:1
FROM node:18-alpine AS base

# Stage 1: Install dependencies then build
FROM base AS builder
WORKDIR /app

# Support multiple package managers
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm 
RUN pnpm i --frozen-lockfile

# Initialize Prisma
COPY src/database/prisma/schema/ src/database/prisma/schema/
RUN pnpm prisma generate

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1
ENV BUILD_STANDALONE=true

# Also copies .env file with format specified in .env.example. Better solutions welcomed.
COPY . .
RUN pnpm build

# Stage 2: Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

# Copy migration folder
COPY src/database/prisma/ src/database/prisma/

# Uncomment the following line should the `public/` folder be re-added.
COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 80

ENV PORT=80

COPY scripts/start_server.sh .

ENTRYPOINT [ "./start_server.sh" ]
