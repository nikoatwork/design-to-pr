# Design System Guide

Start here:

```text
docs/design-system/README.md
```

That folder contains the Braid-inspired information hierarchy for this repo:

- Overview
- Guides
- Foundations
- Components
- Examples

## Quick commands

Open the visual gallery:

```bash
npm run gallery
```

Save screenshots:

```bash
npm run snapshot:gallery
```

Screenshots are saved in `screenshots/design-system-gallery/`. If Playwright asks for a browser the first time, run `npx playwright install chromium` once.

## Designer request

> Show me the design system gallery.

## Agent instruction

Before creating or changing mockups, read:

1. `docs/design-system/README.md`
2. `client-design-system/catalog.json`
3. The relevant component files in `client-design-system/components/`
