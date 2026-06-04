# Changelog

## 2026-06-04

### Changed

- Added a soft separation between the stable localhost Gallery shell and client design-system styling.
- Introduced dedicated Gallery Tailwind tokens (`gallery-primary`, `gallery-background`, `gallery-text`) so client token changes do not rebrand the app chrome.
- Updated Gallery UI classes to use Gallery-specific tokens while leaving client components and mockup canvases on client design-system tokens.
- Updated setup/import guidance to keep client styling scoped to preview canvases when possible.
