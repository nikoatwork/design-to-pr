# Designer Workflow

The localhost Gallery is the main visual interface for designers.

## Open The Gallery

Ask an agent to run:

```bash
npm run dev
```

Then open `localhost:5173`.

## What To Review

Use the sidebar to browse:

- **Gallery:** high-level design-system state
- **Components:** reusable design-system items
- **Mockups:** one-off design instantiations
- **Style guide:** agent-facing instructions, rendered for transparency

## What To Ask Agents

Useful requests:

- “Create a small onboarding mockup using the available components.”
- “Show me the Button component page.”
- “Take screenshots of the Gallery.”
- “Update the style guide with the decisions we just made.”

Designers generally should not edit source files directly. Client-specific design-system work belongs in `client-design-system/`.
