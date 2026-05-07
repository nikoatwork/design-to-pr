# Create A Mockup

Create a frontend mockup in:

```text
mockups/<flow-name>/
```

## Brief

<Describe the screen or flow here. Include audience, product area, and desired tone.>

## Constraints

- Use components from `client-design-system/` whenever possible.
- Keep all data local and mocked.
- Do not add API calls.
- Do not add auth logic.
- Do not add product routing or business state machines.
- Keep the mockup runnable with `npm run dev <flow-name>`.
- Prefer a focused, polished composition over a large app-like page.

## Expected Work

1. Read the available client components.
2. Create or update `mockups/<flow-name>/src/App.tsx`.
3. Keep supporting files inside `mockups/<flow-name>/`.
4. Run `npm run dev <flow-name>` or `npm run build` to verify.
5. Summarize what changed and how to preview it.
