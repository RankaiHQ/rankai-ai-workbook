# Contributing

English is the primary edition and source of truth. Chinese is a companion translation.

1. Start from `templates/workflow.md` and write the English article under `docs/en/`.
2. Add the Chinese companion under `docs/zh-CN/` with the same filename.
3. Add links to both language indexes and mark unfinished content as Draft.
4. Include practical examples and validation steps. Distinguish measured results from impressions.
5. Use Mermaid for process diagrams where useful. Place other images under `assets/` and provide descriptive alt text.
6. Preview Markdown and diagrams, and verify relative links before submitting a pull request.

Keep source notes in the ignored `notes/` directory. Remove credentials and confidential details from examples before sharing.

Repository access is intended for RankAI members through a private GitHub repository.

## Site checks

Run `npm ci` and `npm run docs:build` before submitting a change. The build validates internal links and creates the local search index. For browser review, run `npm run docs:preview` and check navigation, search, and diagrams. Add new chapters to the language indexes and `docs/.vitepress/config.mts` sidebar. Keep the two editions aligned.
