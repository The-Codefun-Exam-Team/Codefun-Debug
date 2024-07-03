#!/bin/sh

set -e

# Deploy migrations
npx --yes prisma migrate deploy

# Run the server
node server.js
