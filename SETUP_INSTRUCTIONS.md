# Help Me Set This Up

Use this file as the setup prompt for a new client copy of the repo.

## Goal

Personalize this starter repo so designers can use the localhost Gallery to inspect the client's design system and open small runnable React/TSX mockups.

Keep the result simple. A non-technical designer should be able to run `npm run dev`, understand the Gallery, and ask an AI coding agent to create or adjust mockups.

## Ask These Questions First

1. Which client component files should be copied into `client-design-system/components/`?
2. Which components should the first example use? Pick 4-8 components maximum.
3. What brand colors, fonts, or visual tokens should be added to `client-design-system/theme/` or the app CSS?
4. What kind of starter mockup should we show? Good defaults: profile card, onboarding card, settings card, checkout card.
5. Are there any required wrappers, fonts, or global CSS files needed to make the components look correct?
6. What design instructions should be captured in `client-design-system/style-guide.md` for future agents?

## Setup Steps

1. Replace the sample files in `client-design-system/components/` with the selected client components.
2. Keep the component folder flat when possible:

```text
client-design-system/components/
├── Button.tsx
├── Card.tsx
├── Input.tsx
└── index.ts
```

3. Update `client-design-system/components/index.ts` so mockups can import from one place:

```tsx
import { Button, Card, Input } from "client-design-system/components";
```

4. Add theme files to `client-design-system/theme/` and wire required global CSS through the app.
5. Update `client-design-system/catalog.json` with plain-language notes for components, variants, states, and designer prompts.
6. Update `client-design-system/style-guide.md` with agent-facing design guidance.
7. Create or replace a starter mockup in `client-design-system/mockups/<mockup-name>/src/App.tsx`.
8. Run the Gallery for verification:

```bash
npm run dev
```

9. Optionally save review screenshots:

```bash
npm run snapshot
```

10. Keep simplifying until the Gallery and starter mockup feel easy to explain.

## What Not To Add

- No API calls.
- No auth logic.
- No production routing setup.
- No state machines from the client's app.
- No large dashboard unless the client specifically asks for one.
- No multi-client structure. This repo is for one client design system only.

## Finish By Updating The README

Make sure the README lists:

- The Gallery request designers should give the agent.
- The starter mockup to open from the Gallery.
- The components available.
- Any client-specific notes, in plain language.
- A pointer to `client-design-system/style-guide.md` for agent-facing design guidance.
