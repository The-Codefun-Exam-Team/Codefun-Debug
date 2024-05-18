#!/bin/bash
set -e

# Baseline the database and deploy migrations
npm prisma migrate resolve --applied 0_init || echo "Database already baselined. Skipping..."
npm prisma migrate deploy

# Start serving
node server.js
