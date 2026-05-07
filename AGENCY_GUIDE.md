# Agency Guide

This repo is a per-client mockup sandbox. It lets designers, strategists, and AI agents compose frontend screens with the client's real components while keeping product code out of the loop.

## What This Is

- A starter repo copied once for each client.
- A local preview environment for isolated frontend mockups.
- A safe place to test UI ideas using the client's real component library.

## What This Is Not

- Not a replacement for the client's app.
- Not a design-system manager.
- Not a multi-client workspace.
- Not a place for API calls, auth, routing architecture, or business rules.

## The Mental Model

```text
client-design-system/  -> copied client components
mockups/               -> isolated UI ideas
shared/preview-template/ -> preview plumbing
```

Most agency work should happen in `mockups/<flow-name>/src/App.tsx`.

## Common Commands

```bash
npm run dev fintech-dashboard
npm run new-flow onboarding-flow
npm run import-design-system /path/to/client/src/components
```

## Good Mockups

Good mockups are compact, realistic, and easy for a developer to inspect. They should use real component imports, local mock data, and clear composition.

Avoid turning a mockup into a mini app. If a flow needs multiple states, keep them in the same file or split them into simple local components.

## AI Agent Prompt

Start from [prompts/create-mockup.md](prompts/create-mockup.md). Replace the mockup name and brief, then ask the agent to run the preview before finishing.
