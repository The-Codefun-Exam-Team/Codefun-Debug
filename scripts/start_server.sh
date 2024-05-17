#!/bin/bash
set -e

npm prisma migrate deploy
node server.js
