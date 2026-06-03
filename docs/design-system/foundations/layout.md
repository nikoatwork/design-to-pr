# Layout

Layout should be predictable and easy to change.

## Principle

Components should not secretly own surrounding whitespace. The mockup or layout wrapper should decide spacing between components.

This keeps the system composable: the same Button, Badge, Input, or Card can work in a dense form, a spacious marketing panel, or a compact review card.

## Common layout ideas

- **Stack:** vertical spacing between related items.
- **Inline:** horizontal spacing between actions, badges, or metadata.
- **Spread:** one item aligned left and another aligned right.
- **Tiles:** repeated items in a responsive grid.
- **Page block:** a readable content width for full-page examples.

## Guidance

- Put spacing around compositions, not inside every component.
- Use cards for coherent groups, not as a default wrapper for everything.
- Avoid nested cards unless containment is genuinely needed.
- On mobile, stack actions vertically when space is tight.
- Keep body text to readable line lengths.

## Agent instruction

When composing a mockup, choose the layout relationship first: stack, inline, spread, grid, or page block. Then place components inside it.
