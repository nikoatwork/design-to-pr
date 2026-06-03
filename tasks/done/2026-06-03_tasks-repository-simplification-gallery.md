# Repository Simplification and Localhost Gallery

## Completion Summary

Completed on 2026-06-03. The repo now uses a unified localhost Gallery app, discovers client design-system components and mockups from `client-design-system/`, serves reusable component pages and embedded mockup pages, renders the agent-facing style guide, and keeps repo meta docs separate from client design-system content.

## Goal

Make `npm run dev` open one normal localhost app that serves as the design system home and gallery. Simplify the repo so the client-specific design system is fully encapsulated in `client-design-system/`, while `docs/` contains only meta documentation about using this repo.

## Notes

- This repo is not rolled out yet. Destructive simplification is allowed.
- One repo serves one client design system. Do not design for multiple clients or multiple design systems in one repo.
- `client-design-system/` is the source of truth for the client design system.
- `docs/` is for meta documentation about this starter repo and workflow, not client design-system content.
- `npm run dev` should not require selecting a mockup. It should start the gallery/home, and users navigate to components or mockups from there.
- Routes should be generated from filesystem structure at dev/build time. `catalog.json` supplies labels, descriptions, variants, prompts, and other metadata.

## Decisions

- **Gallery:** The design system overview/home page shown at `/`.
- **Mockup:** A one-off instantiation of a design, stored under `client-design-system/mockups/` and routed as `/mockup/:slug`.
- **Component page:** A reusable design-system item page, stored/discovered from `client-design-system/components/` and routed as `/component/:slug`.
- **Reusable items vs one-off mockups:** Reusable components belong in `client-design-system/components/`; one-off design explorations belong in `client-design-system/mockups/`.
- **Documentation planes:** `docs/` explains how to use the repository; `client-design-system/` contains client-specific design-system content and guidance.
- **Designer-facing Gallery:** The Gallery is the visual interface designers use to understand the current design-system state and find components/mockups.
- **Agent-facing design guidance:** `client-design-system/style-guide.md` is mostly read-only for designers and is maintained by agents from project context and decisions.
- **Embedded mockups:** Mockup routes render inside the Gallery app shell so designers keep navigation and context.
- **Standard viewing environment:** Mockups and component pages render in a consistent shell/canvas primitive, with room for future side-by-side variants or state matrices.
- **Initial mockup format:** First implementation supports React/TSX mockups only.

## Relevant Files

- `package.json` - Scripts now point to the single localhost app and simplified snapshot flow.
- `app/` - Normal Vite app replacing legacy shared preview-template plumbing.
- `README.md` - Must explain the two-plane structure and default `npm run dev` behavior.
- `AGENTS.md` - Must tell coding agents that the design-system instantiation is encapsulated in `client-design-system/`.
- `docs/` - Repo-level usage documentation only.
- `docs/repository-architecture.md` - Visual architecture and source-of-truth model.
- `glossary.md` - Durable project terms for Gallery, Mockup, Component page, and documentation planes.
- `client-design-system/catalog.json` - Client design-system metadata for gallery, components, and mockups.
- `client-design-system/style-guide.md` - Agent-facing client design-system instructions and context.
- `client-design-system/components/` - Reusable components and component pages.
- `client-design-system/mockups/` - One-off mockup folders discovered by the app.
- `shared/preview-template/` - Removed; legacy preview plumbing collapsed into `app/`.
- `mockups/` - Removed; mockups now live in `client-design-system/mockups/`.
- `scripts/preview.js` - Removed; no symlink-based preview script remains.
- `scripts/snapshot.js` - Snapshot script now starts the unified app without symlinking.

## Tasks

- [x] 1.0 Define and document the new repository architecture
  - [x] 1.1 Create or update root `AGENTS.md` with the two-plane model: repo docs in `docs/`, client design system in `client-design-system/`.
  - [x] 1.2 Add durable terminology for Gallery, Mockup, Component page, reusable item, and one-off mockup.
  - [x] 1.3 Update root `README.md` so non-technical users understand that `npm run dev` opens the design system gallery.
  - [x] 1.4 Update `client-design-system/README.md` to describe it as the complete client design-system instantiation.
  - [x] 1.5 Create `client-design-system/style-guide.md` for agent instructions, including the decisions and context from this planning session.
  - [x] 1.6 Move old design-system-specific markdown out of `docs/` or rewrite it so `docs/` only explains repository usage.

- [x] 2.0 Simplify the filesystem around one client design system
  - [x] 2.1 Create `client-design-system/mockups/`.
  - [x] 2.2 Move existing top-level `mockups/profile-card/` into `client-design-system/mockups/profile-card/`.
  - [x] 2.3 Remove or replace the old top-level `mockups/design-system-gallery/` because Gallery should be the app home, not a mockup.
  - [x] 2.4 Remove the top-level `mockups/` folder once all useful mockups are moved.
  - [x] 2.5 Collapse `shared/preview-template/` into a normal top-level app folder, for example `app/`.
  - [x] 2.6 Remove symlink-based preview assumptions from scripts and docs.

- [x] 3.0 Build the unified localhost app
  - [x] 3.1 Create the app entrypoint that renders the Gallery at `/`.
  - [x] 3.2 Add simple browser routing for `/`, `/component/:slug`, and `/mockup/:slug`.
  - [x] 3.3 Implement filesystem-based discovery for `client-design-system/components/*` and `client-design-system/mockups/*`.
  - [x] 3.4 Use `client-design-system/catalog.json` as metadata for labels, descriptions, variants, states, prompts, and usage notes.
  - [x] 3.5 Render a persistent sidebar with collapsible sections for Gallery, Components, and Mockups.
  - [x] 3.6 Make missing or malformed metadata degrade gracefully, using folder/file names as fallbacks.
  - [x] 3.7 Keep the app easy for agents to understand, avoiding framework complexity beyond Vite/React.

- [x] 4.0 Define Gallery behavior and pages
  - [x] 4.1 Make `/` show a high-level overview of the client design system.
  - [x] 4.2 Include foundations/theme overview sourced from theme/CSS/config where available.
  - [x] 4.3 Include a component inventory sourced from `client-design-system/components/` and `catalog.json`.
  - [x] 4.4 Include a mockup/design inventory sourced from `client-design-system/mockups/`.
  - [x] 4.5 Add clear empty states for no mockups, no catalog metadata, and missing style guide.
  - [x] 4.6 Link to `client-design-system/style-guide.md` and relevant repo docs from the Gallery.

- [x] 5.0 Define reusable component pages
  - [x] 5.1 Route each reusable component to `/component/:slug`.
  - [x] 5.2 Show component purpose, variants, states, and designer prompt from `catalog.json` when present.
  - [x] 5.3 Render one or more live examples for starter components.
  - [x] 5.4 Ensure component pages are visually distinct from one-off mockups.
  - [x] 5.5 Add fallback content for components that exist in source but are missing catalog entries.

- [x] 6.0 Define one-off mockup pages
  - [x] 6.1 Route each mockup folder to `/mockup/:slug`.
  - [x] 6.2 Render each mockup's `src/App.tsx` inside the unified app shell.
  - [x] 6.3 Infer mockup display names from folder names when metadata is absent.
  - [x] 6.4 Keep mockups isolated so designers and agents can work mostly inside individual mockup folders.
  - [x] 6.5 Add guidance in docs that mockups are disposable, client-specific design explorations.

- [x] 7.0 Update scripts and package configuration
  - [x] 7.1 Change `npm run dev` to start the unified app directly.
  - [x] 7.2 Remove or deprecate `npm run gallery` if `/` now serves the Gallery by default.
  - [x] 7.3 Update snapshot scripts to capture `/`, component routes, and mockup routes from the unified app.
  - [x] 7.4 Remove `scripts/preview.js` if no longer needed.
  - [x] 7.5 Update `scripts/snapshot.js` so it no longer symlinks mockups.
  - [x] 7.6 Verify `npm run dev`, `npm run snapshot`, and any remaining setup scripts work from a fresh checkout.

- [x] 8.0 Trim and align documentation
  - [x] 8.1 Rewrite `docs/` as meta documentation for repository usage and agent workflow.
  - [x] 8.2 Remove duplicated design-system documentation from `docs/design-system/` if it now belongs in `client-design-system/`.
  - [x] 8.3 Update `SETUP_INSTRUCTIONS.md` to tell agents to modify only `client-design-system/` for client-specific work.
  - [x] 8.4 Update prompts in `prompts/` so they use Gallery, Mockup, and Component page consistently.
  - [x] 8.5 Ensure all docs point to `client-design-system/style-guide.md` for client-specific design guidance.

- [x] 9.0 Validate the simplified repo
  - [x] 9.1 Run `npm run dev` and confirm `/` shows the Gallery, not an individual card.
  - [x] 9.2 Confirm `/component/button` or equivalent component routes work.
  - [x] 9.3 Confirm `/mockup/profile-card` or equivalent mockup routes work.
  - [x] 9.4 Run snapshot flow and confirm screenshots are saved in a predictable location.
  - [x] 9.5 Check that non-technical setup instructions are clear enough for a design agency using an AI coding agent.
  - [x] 9.6 Remove stale generated files or old build artifacts if they confuse the repo structure.

- [x] 10.0 Update task memory and completion records
  - [x] 10.1 Create or update `glossary.md` with the durable terms from this task list if we want root-level project memory.
  - [x] 10.2 Create or update `tasks/changelog.md` after meaningful chunks land.
  - [x] 10.3 Keep this task list updated as subtasks are completed or scope changes.
  - [x] 10.4 When complete, ask whether to archive this task list to `tasks/done/`.
