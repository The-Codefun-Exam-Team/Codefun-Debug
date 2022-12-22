# syntax=docker/dockerfile:1

# Stage 1: Build
FROM node:19-alpine AS build
WORKDIR /app

# Copy only package files to cache npm install
COPY next-app/package.json next-app/package-lock.json ./
ENV NODE_ENV=production
RUN npm install

# Build a standalone version of the project
COPY next-app/ .
ENV BUILD_STANDALONE=true
RUN npm run build
ENTRYPOINT [""]
# Stage 2: Production
FROM node:19-alpine AS prod

WORKDIR /deploy
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 80
ENV PORT=80
ENTRYPOINT ["node", "server.js", "start"]
