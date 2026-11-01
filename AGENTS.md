# Agent Directives & Rules ? Kay Cosmetics Shopify Theme

## MANDATORY RULE: Theme Editor First (No Hardcoding)

Since this repository is a production **Shopify Theme**, all agents working in this codebase must strictly observe the following rules:

### 1. Changes Must Be Controllable Through Shopify Theme Editor Settings
- **Never hardcode** visual styles, layouts, copy, colors, typography sizes, alignments, padding/margins, button styles, or structural toggles directly into static Liquid markup or rigid CSS.
- Every merchant-facing aesthetic and functional choice must be driven by `section.settings`, `block.settings`, or global `settings`.

### 2. If Configurations Are Missing, Add Them to the Editor Schema
- Whenever implementing a visual design, redesign, layout change, or new capability, inspect the section's or block's `{% schema %}`.
- If the required controls do not exist in the schema, **you MUST add them to the editor schema**:
  - Use proper Shopify schema types (`select`, `color`, `color_background`, `range`, `text`, `richtext`, `checkbox`, `image_picker`, `url`, `video`, etc.).
  - Group settings logically using `{"type": "header", "content": "..."}` blocks.
  - Provide human-readable, merchant-friendly `label` strings and optional `info` hints.
  - Set robust defaults that match the Kay Cosmetics brand palette and typography.

### 3. Keep Template JSON in Sync with Editor Defaults
- When adding or adjusting schema settings, update the active template JSON (e.g. `templates/index.json`, `templates/product.json`, `templates/page.brands.json`, etc.) with the exact matching values so the live theme reflects the elevated design out of the box.

### 4. Respect the Kay Cosmetics Design System Tokens
- All editor defaults must strictly harmonize with the Kay Cosmetics beauty palette:
  - **Canvas Background**: `#FAF5F2` (Warm Porcelain)
  - **Card Surface**: `#FFFFFF`
  - **Headings / High-Contrast Dark**: `#2C1E26` (Deep Plum)
  - **Primary CTA / Brand Accent**: `#BD7385` (Dusty Rosewood)
  - **Secondary Hover**: `#A75D6F`
  - **Body Text**: `#574A52`
  - **Muted Subtitles**: `#6B5C65`
  - **Hairline Borders & Dividers**: `#EFE6E8`
  - **Fonts**: Headings in Besley Serif (`var(--font-heading--family)`), Body in Figtree (`var(--font-body--family)`).

