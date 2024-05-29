#!/bin/sh

set -e

# Baseline the database and deploy migrations
# npx --yes prisma migrate deploy

# Run the server
node server.js
