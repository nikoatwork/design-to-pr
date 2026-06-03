# Agent Workflow

Use this when a designer asks you to create, change, preview, or screenshot a mockup.

## Before building

1. Read `docs/design-system/README.md`.
2. Read `client-design-system/catalog.json`.
3. Inspect the component files in `client-design-system/components/`.
4. If the request involves layout or status color, read:
   - `docs/design-system/foundations/layout.md`
   - `docs/design-system/foundations/tones.md`

## Build rules

- Prefer existing design-system components.
- Keep data local and mocked.
- Keep support files inside the mockup folder.
- Do not add APIs, auth, production routing, or business state machines.
- Keep mockups small and reviewable.
- Use `npm run dev <mockup-name>` for preview.
- Use `npm run snapshot <mockup-name>` for screenshots.

## Verification

Run a build when changing components or gallery docs:

```bash
npm --workspace shared/preview-template run build
```

For visual review, run:

```bash
npm run snapshot:gallery
```

or:

```bash
npm run snapshot <mockup-name>
```
