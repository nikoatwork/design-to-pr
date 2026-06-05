# Agent Workflow

Use this repo as a one-client design-system workspace.

## First-Time Setup

If the user is installing or personalizing this repo for the first time, read:

```text
docs/SETUP_INSTRUCTIONS.md
```

## Before Editing

1. Read `AGENTS.md`.
2. Read `docs/glossary.md` if terminology matters.
3. Read `client-design-system/style-guide.md`.
4. Read `client-design-system/catalog.json`. Treat it as the Gallery-facing source of truth for visible foundations such as Colors, Typography, and Spacing, as well as component and mockup metadata.
5. Inspect relevant files in `client-design-system/components/` and `client-design-system/theme/`. Theme files control rendering, but they do not automatically populate the Gallery overview unless matching metadata is in `catalog.json`.

## Creating A Mockup

Create one-off React/TSX mockups in:

```text
client-design-system/mockups/<mockup-name>/
```

Use local mock data only. Do not add APIs, auth, production routing, or client app business logic.

## Verifying Work

Run:

```bash
npm run dev
```

Then open:

```text
/
/component/<slug>
/mockup/<slug>
```

For screenshots, run:

```bash
npm run snapshot
```
