# Create A Mockup

Create a small React/TSX frontend mockup in:

```text
client-design-system/mockups/<mockup-name>/
```

## Brief

<Describe the card or screen here. Include audience, product area, and desired tone.>

## Constraints

- Use components from `client-design-system/components/` whenever possible.
- Read `client-design-system/style-guide.md` before composing.
- Keep all data local and mocked.
- Do not add API calls.
- Do not add auth logic.
- Do not add product routing or business state machines.
- Keep the mockup discoverable from the localhost Gallery.
- Prefer a focused, polished card or single screen over a large app-like page.

## Expected Work

1. Read `client-design-system/style-guide.md`.
2. Read `client-design-system/catalog.json`.
3. Read the available client components in `client-design-system/components/`.
4. Create or update `client-design-system/mockups/<mockup-name>/src/App.tsx`.
5. Keep supporting files inside `client-design-system/mockups/<mockup-name>/`.
6. Run `npm run dev` to verify the Gallery and mockup route once routes are wired.
7. Summarize what changed and where to preview it.
