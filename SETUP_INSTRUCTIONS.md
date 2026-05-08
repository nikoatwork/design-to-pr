# Help Me Set This Up

Use this file as the setup prompt for a new client copy of the repo.

## Goal

Personalize this starter repo so designers can create simple runnable mockups with the client's real frontend components.

Keep the result simple. A non-technical designer should be able to open the README, understand the folders, and ask an AI coding agent to show the example mockup.

## Ask These Questions First

1. Which client component files should be copied into `client-design-system/components/`?
2. Which components should the first example use? Pick 4-8 components maximum.
3. What brand colors should be added to the preview theme?
4. What kind of starter mockup should we show? Good defaults: profile card, onboarding card, settings card, checkout card.
5. Are there any required wrappers, fonts, or global CSS files needed to make the components look correct?

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

4. Update `shared/preview-template/tailwind.config.js` with the chosen colors.
5. Add any required global CSS to `shared/preview-template/src/index.css`.
6. Replace `mockups/profile-card/src/App.tsx` with a small example using the selected components.
7. Run the selected example for verification:

```bash
npm run dev profile-card
```

8. Keep simplifying until the example feels easy to explain.

## What Not To Add

- No API calls.
- No auth logic.
- No production routing setup.
- No state machines from the client's app.
- No large dashboard unless the client specifically asks for one.
- No nested design-system folder structure unless the real component imports require it.

## Finish By Updating The README

Make sure the README lists:

- The example mockup to ask the agent to show.
- The components available.
- The plain-language request designers should give the coding agent.
- Any client-specific notes, in plain language.
