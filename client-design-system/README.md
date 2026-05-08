# Client Design System

This folder contains the client components available to mockups.

For a starter repo, keep this flat and easy to scan:

```text
components/
├── Button.tsx
├── Card.tsx
├── Input.tsx
└── index.ts
```

Mockups should import from:

```tsx
import { Button, Card, Input } from "client-design-system/components";
```

Keep API clients, auth, product state machines, and route-level business logic out of this folder.
