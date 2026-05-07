# Design-to-PR: Frontend Isolation Setup

> **Goal:** Let non-technical people use AI agents to mock up frontend flows using a client's *real* components and design system — zero business logic, fully runnable.

## How It Works (One-Customer Setup)

1. **Copy** the client's component folder + design config into this repo.
2. **Type** a prompt like *"Build an onboarding flow using the client's Button, Input, and Stepper components."*
3. **Push** the branch and share the `mockups/<flow-name>/` folder.
4. **Developer pulls**, runs `npm run preview <flow-name>`, and sees the real look-and-feel instantly.

## Proposed Folder Structure

```
design-to-pr/
├── README.md
├── setup.md                          # You are here
│
├── client-design-system/             # COPIED FROM CLIENT (no business logic)
│   ├── components/                   # React/Vue/Svelte components
│   ├── theme/
│   │   ├── tokens.json               # Colors, typography, spacing
│   │   ├── theme.provider.tsx        # Theme / CSS-variable wrapper
│   │   └── index.css                 # Global styles / font imports
│   └── package.json                  # Peer deps only (no client API clients)
│
├── shared/
│   ├── preview-template/             # Vite/Next app shell
│   │   ├── src/
│   │   │   ├── main.tsx              # Mounts the selected mockup
│   │   │   └── wrapper.tsx           # ThemeProvider + global contexts
│   │   └── package.json
│   └── mocks/                        # Shared fake data generators
│       └── user.ts
│
└── mockups/                          # AI-generated flows live here
    └── onboarding-flow/
        ├── src/
        │   ├── App.tsx               # Composition root
        │   ├── pages/
        │   │   ├── Welcome.tsx
        │   │   └── ProfileForm.tsx
        │   └── data.ts               # Local mock data for this flow
        ├── package.json              # Declares dependency on ../../client-design-system
        └── README.md                 # Prompt history + screenshots
```

## The Golden Rules

| Rule | Why |
|------|-----|
| **No business logic** | No API clients, no auth guards, no state machines from the client. |
| **Relative imports only** | `../../client-design-system/components/Button` so it runs anywhere. |
| **One folder per flow** | A developer can drag `mockups/onboarding-flow/` into the real repo later. |
| **Design system is read-only** | Never edit `client-design-system/` here; treat it as an external package. |

## Open Architectural Decisions

Before we scaffold the repo, five questions will determine the build tooling, preview layer, and copy strategy:

### 1. What UI framework are the client's components written in?
> *e.g., React 18, Vue 3, Svelte, or multi-framework?*

This decides whether the preview shell is React-based, requires a framework adapter, or needs a Storybook-like environment.

### 2. How are design tokens consumed — CSS variables, a JS theme object, Tailwind config, or a mix?
> *e.g., Styled-components theme provider, Tailwind `tailwind.config.js`, or a Figma-to-code pipeline?*

This determines whether we copy a JSON file, a CSS file, or a build-step config into `client-design-system/theme/`.

### 3. Do the client's components rely on app-level providers (Theme, Router, Auth, i18n, Toast)?
> *e.g., Does `<Button>` crash without a `<ThemeProvider>` or `<RouterContext>`?*

If yes, the `shared/preview-template/wrapper.tsx` must include minimal dummy providers so components render standalone.

### 4. Should mockups support multi-step navigation, or are single-screen compositions enough?
> *e.g., Is the onboarding flow three linked pages, or one long scrollable form?*

If multi-step, we need to bake a lightweight router (e.g., `wouter`, `react-router`) into the preview template; if not, we keep the template simpler.

### 5. What build tool should run the preview — Vite, Next.js, or the client's exact setup?
> *e.g., If the client uses Next.js with custom webpack plugins, do we need those for fidelity?*

Vite is fastest for standalone previews; Next.js is higher fidelity but heavier. This also affects whether we need to transpile the client's components during preview.

## Next Steps (Post-Answers)

1. Scaffold `shared/preview-template/` based on answers to Q1 & Q5.
2. Add a `create-flow` CLI or npm script so the AI agent can run `npm run new-flow onboarding-flow`.
3. Write the copy checklist for onboarding a new client (the 5-minute setup).
4. Add a GitHub Action that builds every `mockups/*` folder on PR so reviewers get deploy previews.
