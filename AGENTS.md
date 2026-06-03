# Agent Map

This repo is a one-client design-system workspace. Use this file as a map, then follow the linked docs.

## First-Time Setup

If a user is installing or personalizing this repo for the first time, start here:

```text
docs/SETUP_INSTRUCTIONS.md
```

That file is the guided onboarding flow for getting a non-technical designer to a populated localhost Gallery.

## Two Planes

Keep these separate:

```text
docs/                   Meta documentation about how to use this repository
client-design-system/   Everything about the client's design-system instantiation
```

All client-specific design work belongs in `client-design-system/`.

## Where To Look

### Repo usage

- `docs/README.md` - Repo documentation index.
- `docs/SETUP_INSTRUCTIONS.md` - First-time guided setup.
- `docs/glossary.md` - Shared terms: Gallery, Mockup, Component page, reusable item.
- `docs/repository-architecture.md` - Visual architecture and source-of-truth model.
- `docs/agent-workflow.md` - Agent workflow for normal work.
- `docs/designer-workflow.md` - Designer workflow for using the Gallery.

### Client design system

- `client-design-system/README.md` - Client design-system folder overview.
- `client-design-system/style-guide.md` - Agent-facing design instructions.
- `client-design-system/catalog.json` - Structured metadata for Gallery, components, and mockups.
- `client-design-system/theme/` - Tokens, CSS, fonts, and visual foundations.
- `client-design-system/components/` - Reusable components.
- `client-design-system/mockups/` - One-off React/TSX mockups.

### Localhost Gallery app

- `app/src/App.tsx` - Gallery shell, routes, and pages.
- `app/src/discovery.ts` - Filesystem discovery and metadata mapping.
- `app/src/examples.tsx` - Starter component examples.
- `scripts/snapshot.js` - Screenshot capture.

Only edit `app/` or `scripts/` when changing repo tooling or the Gallery interface itself.

## Hard Rules

- `npm run dev` opens the Gallery by default.
- Do not require separate commands for individual mockups.
- Keep client work inside `client-design-system/` unless tooling changes are required.
- Use local mock data only. Do not add APIs, auth, production routing, or client app business logic.
