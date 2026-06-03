# Design-to-PR

A starter repo for giving design agencies and AI coding agents a safe, visual workspace for one client's design system.

The repo has one job: help people inspect a client design system, create small React/TSX mockups, and review design-system changes without touching the client's production app, APIs, auth, or business logic.

## Start Here

```bash
npm install
npm run dev
```

`npm run dev` should open the local design-system **Gallery** at `localhost:5173`.

The Gallery is the designer-facing visual interface for:

- seeing the current design-system state
- browsing reusable components
- opening one-off mockups
- understanding where design-system work should happen

## Repository Architecture

There are two documentation planes:

```text
docs/                   Meta documentation about how to use this repository
client-design-system/   Everything about this client's design-system instantiation
```

### `docs/`

Use `docs/` for repo-level guidance: how to work in this starter, how agents should operate, and how design agencies should use the localhost Gallery.

### `client-design-system/`

Use `client-design-system/` for the actual client design system:

```text
client-design-system/
├── README.md           Folder overview
├── style-guide.md      Agent-facing design instructions and context
├── catalog.json        Structured component/mockup metadata
├── theme/              Tokens, CSS, fonts, Tailwind config, visual foundations
├── components/         Reusable design-system components
└── mockups/            One-off React/TSX design mockups
```

Agents and designers should treat `client-design-system/` as the encapsulated client-specific workspace.

## Core Terms

- **Gallery:** The localhost design-system home at `/`.
- **Component page:** A page like `/component/button` for a reusable item.
- **Mockup:** A one-off design instantiation like `/mockup/profile-card`.
- **Reusable item:** A component or pattern intended to be used across mockups.
- **One-off mockup:** A disposable design exploration using local data only.

## For Designers

Ask your coding agent:

> Run the design system Gallery.

The agent should run:

```bash
npm run dev
```

Then use the sidebar to browse:

- Gallery overview
- reusable components
- one-off mockups

The only client-specific text document designers may need to review is:

```text
client-design-system/style-guide.md
```

It is mostly agent-facing and read-only for designers, but it should transparently reflect current design-system instructions.

## For Coding Agents

Read these first:

1. [`AGENTS.md`](AGENTS.md)
2. [`client-design-system/style-guide.md`](client-design-system/style-guide.md)
3. [`client-design-system/catalog.json`](client-design-system/catalog.json)
4. Relevant files in `client-design-system/components/` and `client-design-system/theme/`

When creating new work, add one-off React/TSX mockups under:

```text
client-design-system/mockups/<mockup-name>/
```

Do not add API calls, auth, production routing, or client app business logic.

## Setup For A Client

Give [`SETUP_INSTRUCTIONS.md`](SETUP_INSTRUCTIONS.md) to an AI coding agent and say:

> Help me set this up for this client.

The agent should replace starter components, theme files, catalog metadata, style-guide guidance, and starter mockups inside `client-design-system/`.

## More Repo Documentation

See [`docs/README.md`](docs/README.md) for repo-level usage documentation.
