# Repository and site delivery

Repository: https://github.com/RankaiHQ/rankai-ai-workbook (private).

The Documentation workflow builds pull requests and pushes to main. Its static-site artifact can be downloaded by authorized repository users and served with a local HTTP server. It is retained for 14 days.

The website is not publicly deployed. Choose hosting with RankAI member authentication before publishing a team-facing URL. Do not enable public GitHub Pages merely because the repository is private.

Build command: `npm ci && npm run docs:build`.
Output: `docs/.vitepress/dist/`.
For a subdirectory deployment, set `SITE_BASE` to its leading- and trailing-slash path at build time.

Use `gh-mowtwo` and `git-mowtwo` for repository operations. Verify member access when adding collaborators; do not publish ignored notes.
