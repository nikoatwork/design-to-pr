# Glossary

Shared language for this project.

## Terms

### Gallery

The localhost design-system overview/home page at `/`.

- **Use when:** Referring to the designer-facing visual interface for browsing the current design-system state.
- **Do not use for:** A one-off mockup or individual component page.

### Mockup

A one-off React/TSX instantiation of a design.

- **Use when:** Referring to a disposable design exploration under `client-design-system/mockups/`.
- **Do not use for:** Reusable components or abstract component documentation.

### Component page

A route for inspecting a reusable design-system item.

- **Use when:** Referring to pages such as `/component/button` or `/component/profile-card`.
- **Do not use for:** One-off mockup routes such as `/mockup/profile-card`.

### Reusable item

A component or pattern intended to be used across multiple mockups.

- **Use when:** Referring to items in `client-design-system/components/`.
- **Do not use for:** Disposable one-off mockups.

### One-off mockup

A disposable design exploration using local mock data only.

- **Use when:** Distinguishing mockups from reusable components.
- **Do not use for:** Production app screens or reusable design-system components.

### Documentation planes

The separation between repo-level docs and client design-system content.

- **Use when:** Explaining that `docs/` is for repo usage while `client-design-system/` is for the client's design-system instantiation.
- **Notes:** This is a core architecture rule for the repo.
