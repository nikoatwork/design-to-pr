# Design-to-PR

A starter repo for creating runnable frontend mockups with one client's real design system.

Use one copy of this repo per client. Drop in that client's components, create isolated mockups in `mockups/`, and preview them locally without bringing over product logic.

## Quick Start

```bash
npm install
npm run dev fintech-dashboard
```

Open the local URL from Vite to see the flagship example.

## Agency Workflow

### 1. Import the client's design system

```bash
npm run import-design-system /path/to/client/src/components
```

The import script copies files into `client-design-system/`, scans for broken imports, stubs anything that cannot run in isolation, and prints dependencies you may need to install.

### 2. Create a mockup

```bash
npm run new-flow onboarding-flow
```

This creates:

```text
mockups/onboarding-flow/
├── README.md
└── src/App.tsx
```

### 3. Ask an AI agent to build the screen

Use [prompts/create-mockup.md](prompts/create-mockup.md) as the starting prompt.

### 4. Preview the mockup

```bash
npm run dev onboarding-flow
```

The preview script links the selected mockup into the Vite preview app and starts a local dev server.

## Rules

- One repo per client.
- One folder per mockup.
- Use the client's design-system components whenever possible.
- Use local mock data only.
- Do not add API calls, auth flows, product state machines, or business logic.
- Treat `client-design-system/` as copied client code, not the place to design the mockup.

## Folder Structure

- `client-design-system/` - copied client components and tokens.
- `mockups/` - isolated frontend mockups.
- `mockups/fintech-dashboard/` - flagship compact example.
- `prompts/` - reusable AI prompts for agencies.
- `scripts/new-flow.js` - creates a new mockup folder.
- `scripts/preview.js` - runs a selected mockup.
- `scripts/import-design-system.js` - imports and sanitizes client components.
- `shared/preview-template/` - Vite + React + Tailwind preview engine.

## Handing Off

The deliverable is usually just:

```text
mockups/<flow-name>/
```

A developer can run it in this repo, inspect the composition in `src/App.tsx`, and move the useful pieces into the real product codebase.
