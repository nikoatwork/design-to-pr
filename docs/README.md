# Repository Documentation

This folder contains meta documentation about how to use this repo.

It does not contain the client design system itself. Client-specific design-system content belongs in `client-design-system/`.

## Two Planes

```text
docs/                   How to use this repository
client-design-system/   The client's actual design-system instantiation
```

## Localhost Workflow

The default workflow is:

```bash
npm run dev
```

This should open the design-system **Gallery** at `localhost:5173`.

The Gallery is the designer-facing visual interface for:

- reviewing the current design-system state
- browsing reusable components
- opening one-off mockups
- understanding what agents can safely edit

## Where To Put Work

### Repo usage docs

Put repo-level instructions here in `docs/`.

Examples:

- how to set up this starter repo
- how to work with AI coding agents
- how to capture screenshots
- how to create a new mockup workflow

### Client design-system content

Put client-specific content in `client-design-system/`.

Examples:

- component source
- mockups
- theme tokens
- design-system style guide
- catalog metadata
- visual foundations

## Repo Usage Guides

- [Setup instructions](SETUP_INSTRUCTIONS.md)
- [Glossary](glossary.md)
- [Repository architecture](repository-architecture.md)
- [Agent workflow](agent-workflow.md)
- [Designer workflow](designer-workflow.md)

## Key Files

```text
AGENTS.md                                      Agent rules for the whole repo
README.md                                      Human-facing project overview
docs/SETUP_INSTRUCTIONS.md                    First-time guided setup prompt
docs/glossary.md                               Shared repo terms
client-design-system/README.md                Client design-system folder overview
client-design-system/style-guide.md           Agent-facing design instructions
client-design-system/catalog.json             Structured metadata
```

## Terms

- **Gallery:** Localhost design-system home at `/`.
- **Component page:** A reusable item page such as `/component/button`.
- **Mockup:** A one-off design route such as `/mockup/profile-card`.
- **Reusable item:** A component or pattern intended for reuse.
- **One-off mockup:** A disposable design exploration using local data only.
