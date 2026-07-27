# Deploying the prototype to GitHub Pages

This folder is a self-contained static site. No build step. These steps put it on a
free GitHub Pages URL you can send to the client.

The site is set to **public but not indexed** — reachable by anyone with the link, but
kept out of Google (via `noindex` on every page and `robots.txt`). Do not expect GitHub
privacy: on a free account a Pages site is publicly reachable. Only share the link with
people who should see it.

--------------------------------------------------------------------------------
## One-time setup
--------------------------------------------------------------------------------

### 1. Create an empty repo on your account
On github.com (signed in as engr.shaz89@gmail.com):
  New repository → name it `pray-prototype` → Public → do NOT add a README/.gitignore →
  Create.

(Public is required for free Pages. The `noindex` + `robots.txt` already added keep it
out of search results.)

### 2. Push this folder
A git repo has already been initialised here with a first commit. Add your new remote
and push. Replace <USERNAME> with your GitHub username:

    git remote add origin https://github.com/<USERNAME>/pray-prototype.git
    git branch -M main
    git push -u origin main

If you use the GitHub CLI, steps 1–2 collapse to one command run inside this folder:

    gh repo create pray-prototype --public --source . --remote origin --push

### 3. Turn on Pages
On the repo page: Settings → Pages →
  Source: "Deploy from a branch"
  Branch: `main`   Folder: `/ (root)`   → Save.

Wait ~1 minute. Your link will be:

    https://<USERNAME>.github.io/pray-prototype/

That opens `index.html` (the hub). Send that URL to the client.

--------------------------------------------------------------------------------
## Updating it later
--------------------------------------------------------------------------------

Make edits in this folder, then:

    git add -A
    git commit -m "Update prototype"
    git push

Pages redeploys automatically within a minute. Same URL.

--------------------------------------------------------------------------------
## Notes
--------------------------------------------------------------------------------

- `.nojekyll` tells Pages to serve the files as-is (no Jekyll processing).
- `robots.txt` + the `noindex` meta on every page keep it out of search engines.
- Fonts load from Google Fonts when online; offline they fall back cleanly.
- To take it down: Settings → Pages → set Source to "None", or delete the repo.
- This repo is intentionally separate from the four application repos
  (api / web / shared / infra). It is a design prototype only.
