# Client Design System

This folder contains the complete design-system instantiation for one client.

Everything client-specific belongs here: reusable components, one-off mockups, visual foundations, structured metadata, and agent-facing design instructions.

```text
client-design-system/
├── README.md           This overview
├── style-guide.md      Agent-facing design guidance and context
├── catalog.json        Metadata for Gallery, component pages, and mockups
├── theme/              Tokens, CSS, fonts, Tailwind config, visual foundations
├── components/         Reusable design-system items
└── mockups/            One-off React/TSX design mockups
```

## What Belongs Here

### Reusable components

Put reusable UI components in:

```text
client-design-system/components/
```

Mockups should import reusable components from the component index:

```tsx
import { Button, Card, Input } from "client-design-system/components";
```

### One-off mockups

Put disposable design explorations in:

```text
client-design-system/mockups/<mockup-name>/
```

A mockup is an individual instantiation of a design. It is not the same thing as a reusable component.

### Style guide

Use [`style-guide.md`](style-guide.md) for agent-facing design-system instructions. Designers may review it for transparency, but it is mostly maintained by agents after project direction is clarified.

### Catalog metadata

Use [`catalog.json`](catalog.json) as the Gallery-facing source of truth for structured metadata. This includes foundation blocks shown on the Gallery overview, such as Colors, Typography, and Spacing, plus labels, descriptions, variants, states, usage guidance, designer prompts, and mockup metadata.

Theme files can still provide the CSS, fonts, or variables that make components render correctly, but anything that should be listed in the Gallery overview should also be represented in `catalog.json`.

## What Does Not Belong Here

Do not add:

- API clients
- auth logic
- production app routing
- product business logic
- client app state machines
- multi-client abstractions

This repo is for one client design system only.
