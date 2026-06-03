# Design System

Welcome to the client design system workspace.

This repo helps designers and coding agents work in the same medium: real components, local mockups, plain-language guidance, and screenshots. The goal is to make it easy to see what exists, understand when to use it, and ask an agent to compose small reviewable interfaces without touching the client app.

## What makes this different

This design system is agent-first. The docs are written so a non-technical designer can read them, and so an AI coding agent can use them as operating instructions.

The system has three jobs:

1. **Show the available visual language.** Use the gallery to see components, states, tones, and examples.
2. **Explain the design decisions.** Use foundation pages like layout and tones before making new screens.
3. **Help agents compose safely.** Use mockups with local data only. Do not add APIs, auth, routing architecture, or product business logic.

## Getting started

First, open the visual gallery:

```bash
npm run gallery
```

Then read these high-level pages:

1. [Design workflow](guides/design-workflow.md): how designers should work with the system.
2. [Agent workflow](guides/agent-workflow.md): how coding agents should inspect, compose, and verify mockups.
3. [Layout](foundations/layout.md): how spacing and composition should work.
4. [Tones](foundations/tones.md): how semantic color should be used.
5. [Components](components/README.md): what components are available.
6. [Examples](examples/README.md): what good small mockups look like.

Finally, ask the agent for a focused mockup:

> Create a small onboarding card using the available design-system components, then preview it.

## Key files

```text
client-design-system/components/     component source
client-design-system/catalog.json    AI-readable component catalog
docs/design-system/                  plain-language system docs
mockups/design-system-gallery/       visual docs and gallery
mockups/profile-card/                starter example mockup
scripts/snapshot.js                  screenshot capture
```

## Useful commands

```bash
npm run gallery
npm run dev profile-card
npm run snapshot:gallery
```
