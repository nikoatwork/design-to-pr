# Design-to-PR

Mock up frontend flows using a client's real React components and design system.

## Philosophy

- **One repo per client.** Install whatever that client's components need. No abstraction layers.
- **Lean.** Vite + React + Tailwind. No routing, no state management, no providers unless the client needs them.
- **Composable.** The base repo is un-opinionated. The `import-design-system` script is a convenience, not a framework.

## Quick Start

### 1. Import the client's design system

```bash
npm run import-design-system /path/to/client/src/components
```

This script:
- Copies the folder into `client-design-system/`
- Scans every file for broken imports
- Stubs or removes anything that can't be resolved
- Prints a list of npm dependencies you may need to install

### 2. Install any missing dependencies

```bash
npm install clsx tailwind-merge @radix-ui/react-slot
```

(Whatever the script reported.)

### 3. Create a flow

```bash
mkdir -p mockups/onboarding-flow/src
```

Write `mockups/onboarding-flow/src/App.tsx`:

```tsx
import { Button } from '../../client-design-system/components/Button'

export default function App() {
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">Onboarding</h1>
      <Button>Get started</Button>
    </div>
  )
}
```

### 4. Preview it

```bash
npm run dev onboarding-flow
```

The script symlinks your flow into the Vite preview engine and starts the dev server.

## Folder Structure

- `client-design-system/` — Copied from the client. **Read-only.** Stubs are auto-generated for broken imports.
- `mockups/` — One folder per flow. AI-generated or hand-written.
- `shared/preview-template/` — Vite + React + Tailwind engine.
- `scripts/preview.js` — Links a mockup into the preview engine and starts Vite.
- `scripts/import-design-system.js` — Imports and sanitizes a client's component folder.

## Using with an AI Agent

Tell your agent:

> "Import the design system from `/path/to/client/src` and create an onboarding flow in `mockups/onboarding-flow` using the Button and Input components."

The agent should:
1. Run `npm run import-design-system /path/to/client/src`
2. Read the generated stubs to understand what's available
3. Write the mockup in `mockups/onboarding-flow/src/App.tsx`
4. Run `npm run dev onboarding-flow` to preview
