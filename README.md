# Design-to-PR

A small starter repo for making frontend mockups with a client's real design-system components.

This is meant to be copied once per client. Designers and AI agents can create realistic UI examples without touching the client's app, APIs, auth, or business logic.

## The Idea

```text
client-design-system/components/  -> the client's reusable UI pieces
mockups/profile-card/             -> one runnable example mockup
shared/preview-template/          -> preview plumbing
```

Most people only need to know two folders:

- `client-design-system/components/` contains the components available to use.
- `mockups/` contains the mockups you can run and edit.

## See The Design System

Open this repo in an AI coding agent such as Codex or Claude Code and ask it:

> Show me the design system gallery.

The agent should run:

```bash
npm run gallery
```

This opens a Braid-inspired overview and visual inventory of components, foundations, states, and small patterns. The starter repo includes sample components so the gallery works immediately.

For the plain-language design-system docs, start at `docs/design-system/README.md`.

To save screenshots for review, ask:

> Take screenshots of the design system gallery.

The agent should run:

```bash
npm run snapshot:gallery
```

Screenshots are saved to `screenshots/design-system-gallery/`. If Playwright asks for a browser the first time, run `npx playwright install chromium` once.

## Try The Example

Ask your agent:

> Show me the `profile-card` mockup.

The agent will start the preview server and open the example for you.

## Set It Up For A Client

Give [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) to an AI agent and say:

> Help me set this up for this client.

The agent should ask which components and colors to use, then personalize this starter repo by replacing the sample components, theme settings, and example mockup.

## Create Another Mockup

Ask your coding agent:

> Create a small `onboarding-card` mockup using the available client components, then preview it.

Keep mockups small. A profile card, onboarding card, checkout card, pricing card, or settings card is usually better than a whole fake app.

## Rules

- Use one repo per client.
- Keep `client-design-system/components/` flat and easy to scan.
- Use local mock data only.
- Do not add API calls, auth, routing architecture, or product business logic.
- Prefer one polished card or screen over a large demo.
- If setup gets confusing, simplify the component list before adding more structure.

## Available Sample Components

The starter repo includes a tiny fake design system so designers can see the gallery before any client components are imported:

- `Avatar`
- `AvatarGroup`
- `Badge`
- `Button`
- `Card`
- `CardHeader`
- `CardContent`
- `IconButton`
- `Input`
- `Progress`
- `Switch`
- `Tabs`

These are placeholders for the client's real components. The component catalog is in `client-design-system/catalog.json`, and the plain-language docs start at `docs/design-system/README.md`.
