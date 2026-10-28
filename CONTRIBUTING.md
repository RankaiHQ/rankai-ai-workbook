# Contributing

English is the primary edition and source of truth. Chinese is a companion translation.

1. Start from `templates/workflow.md` and write the English article under `docs/en/`.
2. Add the Chinese companion under `docs/zh-CN/` with the same filename.
3. Add links to both language indexes and keep both editions aligned.
4. Include practical examples and validation steps. Distinguish measured results from impressions.
5. Use Mermaid for process diagrams where useful. Place other images under `assets/` and provide descriptive alt text.
6. Preview Markdown and diagrams, and verify relative links before submitting a pull request.

Keep source notes in the ignored `notes/` directory. Remove credentials and confidential details from examples before sharing.

Repository access is intended for RankAI members through a private GitHub repository.

## Site checks

Run `npm ci` and `npm run docs:build` before submitting a change. The build validates internal links and creates the local search index. For browser review, run `npm run docs:preview` and check navigation, search, and diagrams. Add new chapters to the language indexes and `docs/.vitepress/config.mts` sidebar. Keep the two editions aligned.

## Authors and editing time

Add an `authors` list to each article's YAML frontmatter, using consistent author display names. Include all coauthors and use identical names in both language editions. The site generates author labels and the author directory automatically; no central registry is required.

```yaml
---
authors:
  - Your Name
  - Coauthor Name
---
```

The displayed last-edit time comes from the most recent Git commit affecting that language's Markdown file, shown in UTC+8. It is not the build time or an uncommitted filesystem timestamp. CI checks out full Git history. Do not set a manual date for routine edits.
