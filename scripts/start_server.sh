#!/bin/sh

set -e

# Deploy migrations
npm install prisma --no-save --no-audit --no-fund --force
npx --yes prisma migrate deploy

# Run the server
node server.js
