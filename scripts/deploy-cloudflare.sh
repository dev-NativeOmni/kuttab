#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="${PROJECT_NAME:-kuttab}"

 echo "[1/3] Generating static site..."
 npm run generate

 echo "[2/3] Deploying to Cloudflare Pages..."
 npx wrangler pages deploy dist --project-name="$PROJECT_NAME"

 echo "[3/3] Deployment complete."
