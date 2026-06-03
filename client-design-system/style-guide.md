# Design System Style Guide

Agent-facing instructions for working with this client's design system.

Designers may review this file for transparency, but it is primarily maintained by coding agents after project direction is clarified.

## Current Context

This repo is being simplified into a one-client design-system workspace.

The designer-facing surface is the localhost **Gallery**. It should show the current state of the design system visually and help designers find reusable components and one-off mockups.

The agent-facing source of truth lives in this folder:

```text
client-design-system/
├── style-guide.md
├── catalog.json
├── theme/
├── components/
└── mockups/
```

Repo-level usage docs live separately in `docs/`.

## Core Terms

### Gallery

The design-system overview/home page at `/` on localhost. Designers use it to understand the current visual state of the design system and navigate to component pages and mockups.

### Component page

A page for a reusable design-system item, routed as `/component/:slug`. Component pages are for abstracted, reusable items such as Button, Card, Input, or ProfileCard.

### Mockup

A one-off instantiation of a design, routed as `/mockup/:slug`. Mockups use reusable components but are not themselves necessarily reusable.

### Reusable item

A component or pattern intended to be used across multiple mockups.

### One-off mockup

A disposable design exploration using local mock data only.

## Agent Operating Rules

Before creating or changing a mockup:

1. Read this file.
2. Read `client-design-system/catalog.json`.
3. Inspect relevant files in `client-design-system/components/`.
4. Inspect `client-design-system/theme/` for visual foundations if present.
5. Work inside `client-design-system/mockups/` for one-off design explorations.

## Design System Boundaries

Do:

- Use local mock data.
- Compose mockups from `client-design-system/components/`.
- Keep reusable components separate from one-off mockups.
- Update `catalog.json` when component labels, variants, states, or descriptions change.
- Keep the Gallery useful for non-technical designers.

Do not:

- Add API calls.
- Add auth logic.
- Add production routing architecture.
- Copy client business logic into this repo.
- Create abstractions for multiple clients or multiple design systems.

## Gallery Expectations

The Gallery should be polished enough for designers to use as their visual map of the design system.

It should provide:

- a high-level visual overview
- a reusable component inventory
- one-off mockup inventory
- clear distinction between reusable items and mockups
- links to relevant component and mockup routes
- a future-friendly place to render this style guide for transparency

## Mockup Expectations

Mockups should be React/TSX and should render inside the Gallery shell.

Use a standardized viewing environment so designers can compare mockups over time. Mockups should not need their own dev command. They should be reachable from routes such as:

```text
/mockup/profile-card
```

## Component Page Expectations

Component pages should be routed from reusable component names, such as:

```text
/component/button
/component/card
/component/profile-card
```

Use `catalog.json` for labels, descriptions, variants, states, usage guidance, and designer prompts when available. Fall back to filenames when metadata is missing.

## Planning Links

Repo agent instructions:

```text
AGENTS.md
```

Current implementation task list:

```text
tasks/todo/tasks-repository-simplification-gallery.md
```
