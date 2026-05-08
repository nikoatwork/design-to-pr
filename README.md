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

## Try The Example

```bash
npm install
npm run dev
```

That opens the default `profile-card` example. You can also run it directly:

```bash
npm run dev profile-card
```

## Set It Up For A Client

Give [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) to an AI agent and say:

> Help me set this up for this client.

The agent should ask which components and colors to use, then personalize this starter repo by replacing the sample components, theme settings, and example mockup.

## Create Another Mockup

```bash
npm run new-flow onboarding-card
npm run dev onboarding-card
```

Keep mockups small. A profile card, onboarding card, checkout card, pricing card, or settings card is usually better than a whole fake app.

## Rules

- Use one repo per client.
- Keep `client-design-system/components/` flat and easy to scan.
- Use local mock data only.
- Do not add API calls, auth, routing architecture, or product business logic.
- Prefer one polished card or screen over a large demo.
- If setup gets confusing, simplify the component list before adding more structure.

## Available Sample Components

The starter repo includes a tiny fake design system:

- `Avatar`
- `Badge`
- `Button`
- `Card`
- `Input`
- `Progress`
- `Switch`
- `Tabs`

These are placeholders for the client's real components.
