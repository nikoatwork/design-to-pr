# Repository Architecture

This repo is intentionally small. It should be easy for a design agency and an AI coding agent to understand.

## Target Shape

```text
design-to-pr/
├── README.md
├── AGENTS.md
├── package.json
├── docs/
│   ├── README.md
│   ├── SETUP_INSTRUCTIONS.md
│   ├── glossary.md
│   └── ...repo usage docs only
├── app/
│   └── ...localhost Gallery app
├── client-design-system/
│   ├── README.md
│   ├── style-guide.md
│   ├── catalog.json
│   ├── theme/
│   ├── components/
│   └── mockups/
├── scripts/
└── tasks/
```

## Runtime Shape

```text
npm run dev
    ↓
localhost:5173
    ├── /                    Gallery
    ├── /component/:slug     Reusable component page
    └── /mockup/:slug        One-off mockup page
```

## Source Of Truth

Routes should come from the filesystem:

```text
client-design-system/components/*
client-design-system/mockups/*
```

Metadata should come from:

```text
client-design-system/catalog.json
```

Agent-facing design guidance should come from:

```text
client-design-system/style-guide.md
```

## Design Principle

Designers use the Gallery visually. Agents infer implementation details from `client-design-system/`.

The Gallery should not become a second source of truth. It should render and explain what exists in `client-design-system/`.
