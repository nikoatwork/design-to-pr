# Agent Workflow

Use this repo as a one-client design-system workspace.

## Before Editing

1. Read `AGENTS.md`.
2. Read `client-design-system/style-guide.md`.
3. Read `client-design-system/catalog.json`.
4. Inspect relevant files in `client-design-system/components/` and `client-design-system/theme/`.

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
