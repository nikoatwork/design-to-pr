# Help Me Set This Up

This instruction set is to help you as an AI agent to perform a guided onboarding to users installing this repo for the first time.

## Goal

Get a non-technical designer to view the impressive and populated design-system overview page after answering a few questions that you as the onboarding agent asked.

## Ask the installing user These Questions First

0. Welcome the Designer and explain that we'll get them a design system setup in minutes.
1. Do you want to import styles and design guidelines from a company website? allow them to paste website and extract colors and shapes from them by browsing the website. Follow `docs/how-to-extract-design-from-url.md` so this populates our design sytem.
2. Which components should the first example use? Pick 4-8 components maximum.
3. What brand colors, fonts, or visual tokens should be added to `client-design-system/theme/` or the app CSS? (if 1 was answered with link, infer colors/fonts)
4. Are there any required wrappers, fonts, or global CSS files needed to make the components look correct?
5. What other design instructions should we keep in mind? they will be captured in `client-design-system/style-guide.md` for future agents work

After having answers to these onboarding questions follow these setup steps and inform the installing user about the status in a non-technical way.

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

4. Add theme files to `client-design-system/theme/`. Keep the Gallery shell neutral; client theme tokens should affect components and mockup canvases, not the localhost navigation/chrome. Scope required global CSS to preview canvases when possible.
5. Update `client-design-system/catalog.json` with plain-language notes for components, variants, states, and designer prompts.
6. Update `client-design-system/style-guide.md` with agent-facing design guidance.
7. Run the Gallery and ask the installing user to view the gallery in their browser
```bash
npm run dev
```

Once the user can visit the populated gallery in their localhost browser you have accomplished your onboarding task. Tell the installing user "great job, you setup your design system."
