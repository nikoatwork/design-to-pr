# Client Design System

This folder contains the **read-only** copy of the client's React components and design tokens.

## What to copy here

1. `components/` — The client's React component folder (e.g., `src/components/` or `packages/ui/src/components/`).
2. `theme/` — Design tokens, CSS variables, font files, or Tailwind config extensions.

## What NOT to copy

- API clients, auth logic, or data-fetching hooks.
- Business-specific utilities.
- Internal packages that are not UI-related.

## Importing in mockups

From any mockup file, import components using a relative path:

```tsx
import { Button } from '../../client-design-system/components/Button'
```
