# How To Extract Design From a URL

Use this when a user shares a public website and asks us to seed a local design system.
Keep it native: do not add scraper dependencies, APIs, browser extensions, or separate commands.
The goal is a useful draft, not a perfect reverse-engineered brand guide.

## What to inspect

1. Open the homepage and one representative inner page if obvious, such as pricing/docs/about.
2. Inspect rendered visuals first: hero, nav, buttons, cards, forms, footer, empty states.
3. Inspect page source or fetched HTML for `meta[name="theme-color"]`, icons, OG image, and title/description.
4. Inspect linked CSS and inline styles for `:root` variables, `@font-face`, `font-family`, and repeated values.
5. Ignore third-party widgets, cookie banners, chat embeds, ad styles, and one-off campaign sections.

## Extract these tokens

- Colors: `--color-primary`, `--color-secondary`, `--color-accent`, `--color-background`, `--color-surface`, `--color-text`, `--color-muted`.
- Typography: `--font-sans`, `--font-serif`, `--font-mono`, heading/body sizes, weights, and line heights.
- Shape: `--radius-sm`, `--radius-md`, `--radius-lg`, border width, border color, and pill vs square tendency.
- Spacing: `--space-1` through `--space-6`, based on repeated padding/gap values.
- Effects: shadow levels, focus ring color/style, hover/active treatment, and transition speed.
- Components: button, input, card, badge, nav, and link styles if visible.

## Output format

Write tokens into `client-design-system/theme/` and summarize the inferred vibe in `client-design-system/style-guide.md`.
Include source notes: URL checked, pages inspected, and which values were inferred vs explicitly found.
Ask the user to confirm before generating components: colors, font, radius, spacing, and overall vibe.
If evidence is weak, say so and choose conservative defaults that match the visible site.
Prefer repeated CSS variables and computed-looking patterns over isolated hex values.
