# Components

Components are the reusable pieces available to mockups.

For source code, see:

```text
client-design-system/components/
```

For the AI-readable catalog, see:

```text
client-design-system/catalog.json
```

## Starter components

- **Avatar:** people, owners, reviewers, collaborators.
- **AvatarGroup:** small groups of people.
- **Badge:** compact status and category labels.
- **Button:** user actions.
- **Card:** a coherent content group or focused workflow.
- **CardHeader:** title area inside a card.
- **CardContent:** body area inside a card.
- **IconButton:** compact secondary icon action.
- **Input:** labelled short text input.
- **Progress:** percentage completion.
- **Switch:** immediate on/off setting.
- **Tabs:** sibling views inside one area.

## How to use this page

Designers should use this as a plain-language inventory. Agents should inspect the actual component source before implementation.

## Import pattern

```tsx
import { Button, Card, Input } from "client-design-system/components";
```

## Adding client components

When importing a client system:

1. Copy selected components into `client-design-system/components/`.
2. Export them from `client-design-system/components/index.ts`.
3. Update `client-design-system/catalog.json`.
4. Update `mockups/design-system-gallery/src/App.tsx`.
5. Verify with `npm run gallery`.
