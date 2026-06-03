# Agent Instructions

This repo is a one-client design-system workspace. It exists so designers and coding agents can inspect a client design system visually, create small React/TSX mockups, and adjust the design system without touching the client's production app.

## Two Documentation Planes

There are two separate planes. Keep them separate.

```text
docs/                   Meta documentation about how to use this repository
client-design-system/   The actual client design-system instantiation
```

### `docs/`: repo usage only

Use `docs/` for instructions about this starter repo, workflow, setup, and how designers/agents should operate the project.

Do not put client-specific component guidance, brand decisions, reusable component documentation, mockup content, or theme instructions in `docs/`.

### `client-design-system/`: client design system only

Everything pertaining to the client design system belongs in `client-design-system/`, including:

```text
client-design-system/
├── README.md           Overview of the client design-system folder
├── style-guide.md      Agent-facing design instructions and project context
├── catalog.json        Structured metadata for Gallery, components, and mockups
├── theme/              Tokens, CSS, Tailwind config, fonts, and visual foundations
├── components/         Reusable design-system components
└── mockups/            One-off React/TSX mockups
```

When changing the client design system, work inside `client-design-system/` unless repo tooling itself must change.

## Product Model

- **Gallery:** The localhost design-system home at `/`. Designers use it as the visual interface for understanding the current design-system state.
- **Component page:** A route such as `/component/button` for a reusable item from `client-design-system/components/`.
- **Mockup:** A one-off design instantiation from `client-design-system/mockups/`, routed as `/mockup/:slug`.
- **Reusable item:** A component or pattern intended to be reused across mockups.
- **One-off mockup:** A disposable design exploration or example using local data only.

## Localhost App Expectations

`npm run dev` should open the Gallery by default. Users should navigate from the Gallery to component pages and mockup pages. Do not require designers to run separate commands for individual mockups.

Mockups should render inside the Gallery app shell so designers keep sidebar/navigation context. Use a standardized viewing environment so mockups and components are easy to compare over time.

## Agent Workflow

Before creating or changing mockups:

1. Read `client-design-system/style-guide.md`.
2. Read `client-design-system/catalog.json`.
3. Inspect relevant files in `client-design-system/components/` and `client-design-system/theme/`.
4. Create or edit mockups under `client-design-system/mockups/`.
5. Use local mock data only. Do not add APIs, auth, production routing, or client app state machines.

## Current Planning Context

The current simplification plan is tracked in:

```text
tasks/todo/tasks-repository-simplification-gallery.md
```

Important decisions from that plan:

- One repo serves one client design system.
- The Gallery is designer-facing and visual.
- `client-design-system/style-guide.md` is mostly agent-facing and read-only for designers.
- Routes are discovered from filesystem structure; metadata comes from `catalog.json`.
- First implementation supports React/TSX mockups only.
