# syntax=docker/dockerfile:1

# Stage 1: Build
FROM node:19-alpine AS build

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

FROM node:19-alpine

WORKDIR /deploy
RUN npm install next
COPY --from=build /app/.next ./.next
COPY --from=build /app/package.json ./package.json

EXPOSE 80
ENTRYPOINT ["npm", "run", "start"]
