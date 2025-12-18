# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/4229bd85-1790-4a3f-a952-527ef4d654ef

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/4229bd85-1790-4a3f-a952-527ef4d654ef) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deploy to Vercel (recommended)

1. Push this repository to GitHub (or connect the existing repo) if not already pushed.
2. In Vercel dashboard -> New Project -> Import Git Repository -> select this repo.
3. Set the following Build Settings:
	- **Framework**: Vite (or Other)
	- **Build Command**: `npm run build`
	- **Output Directory**: `dist`
4. In Project Settings -> Environment Variables, add these variables (Preview/Production):
	- `VITE_SUPABASE_URL`
	- `VITE_SUPABASE_ANON_KEY`
	- `VITE_CLOUDINARY_CLOUD_NAME`
	- `VITE_CLOUDINARY_UPLOAD_PRESET`

Files added to help deployment:
- [vercel.json](vercel.json) — config for static build and SPA fallback to `index.html`.
- [.env.example](.env.example) — example environment variables for local development.

Quick CLI deploy (optional):
```bash
npm i -g vercel
vercel login
vercel --prod
# then add env vars with `vercel env add` or via Dashboard
```

Security notes:
- Do NOT commit real `.env.local` files. This repo now ignores `.env.local` and `dist/` via `.gitignore`.
- If secret values were previously committed (e.g., inside `dist/`), remove them from the repo and history:
  ```bash
  # remove tracked dist and push
  git rm -r --cached dist
  git commit -m "Remove committed build output"
  git push
  # to purge secrets from history, consider using the BFG Repo-Cleaner or git filter-repo
  ```

If you want, I can run the git commands to remove `dist/` from tracking and prepare the repo for push.
