# RankAI AI Workbook

A practical collection of AI workflows for everyday work at RankAI.

[English guides](docs/en/README.md) · [中文对照](README.zh-CN.md)

This workbook turns firsthand working practices into clear, reusable guides. Each published guide includes Chinese and English versions, with diagrams where they help explain the process.

## Contents

1. [Let Go, Recognize Risk, and Communicate Clearly](docs/en/01-working-with-ai.md) — Draft

2. [Let Agents Keep the Work Moving](docs/en/02-agent-loops.md) — Draft

- [English guides — primary edition](docs/en/README.md)
- [Chinese companion guides](docs/zh-CN/README.md)
- [Article template](templates/workflow.md)
- [Contributing](CONTRIBUTING.md)

Status: draft chapters in a private RankAI repository.

English is the primary edition and source of truth. Chinese versions are maintained as companion translations.

## Read as a book

```bash
npm ci
npm run docs:dev
```

Open the local URL printed by VitePress. The site includes chapter navigation, English and Chinese editions, local keyword search, dark mode, and Mermaid diagrams.

```bash
npm run docs:build
npm run docs:preview
```

The static output is `docs/.vitepress/dist/`. Set `SITE_BASE=/your-path/` when building for a subdirectory. Only `docs/` is included; private notes and repository instructions are excluded.

## CI and delivery

GitHub Actions builds every pull request and push to `main`, and can be run manually. Each successful run publishes the static site as a repository-access-controlled Actions artifact named `rankai-ai-workbook-site`, retained for 14 days.

No public website is deployed. Use authenticated hosting for a team website; a private source repository does not by itself make GitHub Pages private.

Vite is overridden to the patched 6.4 series because VitePress 1.6.4 otherwise resolves an older development server dependency. Keep the lockfile and verify the site build when updating dependencies.
