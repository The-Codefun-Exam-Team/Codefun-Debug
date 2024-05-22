#!/bin/sh

set -e

# Baseline the database and deploy migrations
prisma migrate resolve --applied 0_init || echo "Database already baselined. Skipping..."
prisma migrate deploy

# Run the server
node server.js
