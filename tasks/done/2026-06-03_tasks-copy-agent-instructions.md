# Copy Agent Instructions Button

## Completion Summary

Completed on 2026-06-03. The top-right Gallery header now has a route-specific `Copy agent instructions` button instead of duplicate navigation links. It copies one edit-oriented context sentence and briefly changes to `Copied` after success.

## Goal

Replace duplicate top-right navigation in the Gallery app with a route-specific "Copy agent instructions" button. Designers should be able to copy one concise context sentence, paste it into a coding agent, and then add their own request.

## Notes

- No more strategic questions. Direction is approved.
- The copied text should be route-specific only.
- The copied text should optimize for editing the relevant source file or metadata.
- Do not include global boilerplate, setup instructions, or a `User request:` scaffold.
- The button should briefly change to `Copied` after a successful click.

## Relevant Files

- `app/src/App.tsx` - Top bar, route handling, and copy button implementation.
- `app/src/discovery.ts` - Source metadata for components and mockups.
- `screenshots/gallery/` - Updated visual snapshots after the UI change.

## Tasks

- [x] 1.0 Update the top-right Gallery action
  - [x] 1.1 Remove the duplicate `Gallery` and `Style guide` links from the top-right header.
  - [x] 1.2 Add a `Copy agent instructions` button in their place.
  - [x] 1.3 Make the button briefly show `Copied` after a successful copy.

- [x] 2.0 Generate route-specific context sentences
  - [x] 2.1 For `/`, copy: `We are working on the design system overview; update client-design-system/catalog.json and client-design-system/style-guide.md.`
  - [x] 2.2 For `/component/:slug`, copy a sentence pointing to the reusable component source file.
  - [x] 2.3 For `/mockup/:slug`, copy a sentence pointing to `client-design-system/mockups/<slug>/src/App.tsx`.
  - [x] 2.4 For `/style-guide`, copy a sentence pointing to `client-design-system/style-guide.md`.
  - [x] 2.5 Add graceful fallback text for unknown routes.

- [x] 3.0 Validate behavior
  - [x] 3.1 Run typecheck.
  - [x] 3.2 Run build.
  - [x] 3.3 Use Playwright to confirm the button appears and copied text is correct on `/`, `/component/button`, and `/mockup/profile-card`.
  - [x] 3.4 Refresh Gallery screenshots.

- [x] 4.0 Finish task memory
  - [x] 4.1 Update `tasks/changelog.md` with the completed change.
  - [x] 4.2 Mark this task list complete.
  - [x] 4.3 Archive this task list to `tasks/done/`.
