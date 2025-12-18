#!/usr/bin/env bash
set -euo pipefail

echo "This script will help you add Vercel environment variables interactively."
echo "Make sure you've run 'vercel login' in your browser and linked the project with 'vercel link'."

check_cmd() {
  command -v "$1" >/dev/null 2>&1 || { echo "Please install $1 and try again."; exit 1; }
}

check_cmd vercel

read_env() {
  local name="$1"
  local env
  printf "Enter value for %s (leave empty to skip): " "$name"
  read -r env
  echo "$env"
}

add_env_if() {
  local name="$1";
  local env_value
  env_value=$(read_env "$name")
  if [ -n "$env_value" ]; then
    echo "Adding $name to Vercel (you will be prompted for which environment)..."
    vercel env add "$name" <<< "$env_value" || true
  else
    echo "Skipped $name"
  fi
}

echo
echo "We'll add the following variables:"
echo " - VITE_SUPABASE_URL"
echo " - VITE_SUPABASE_ANON_KEY"
echo " - VITE_CLOUDINARY_CLOUD_NAME"
echo " - VITE_CLOUDINARY_UPLOAD_PRESET"
echo
add_env_if VITE_SUPABASE_URL
add_env_if VITE_SUPABASE_ANON_KEY
add_env_if VITE_CLOUDINARY_CLOUD_NAME
add_env_if VITE_CLOUDINARY_UPLOAD_PRESET

echo
echo "Deploying to production now (vercel --prod)..."
vercel --prod || echo "Deployment failed or cancelled. Check Vercel output."

echo "Done. If you previously pasted a Vercel token publicly, please revoke it immediately in Account Settings -> Tokens."
