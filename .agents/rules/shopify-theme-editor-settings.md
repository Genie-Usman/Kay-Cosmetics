---
trigger: always_on
description: Enforce that all theme visual changes are managed via Shopify Theme Editor settings
---

# Shopify Theme Editor Settings Requirement

When modifying or creating any component, section, snippet, or layout in this theme:

1. **Always Expose Controls in the Theme Editor**:
   - The merchant must be able to customize all visual elements (colors, typography scales, alignments, spacing, image ratios, button styles, borders, and toggles) via the Shopify Theme Customizer.
2. **Add Missing Configurations to `{% schema %}`**:
   - If a requested feature or design property lacks a setting in `{% schema %}`, add it immediately.
   - Use standard Shopify input types with descriptive labels and clear grouping headers.
3. **Synchronize Template JSON**:
   - Update `templates/index.json` or other relevant JSON templates with the newly added settings so the storefront matches the intended design immediately.
4. **Adhere to Kay Cosmetics Palette**:
   - Default all new schema settings to `--yozo-canvas` (`#FAF5F2`), `--yozo-rosewood` (`#BD7385`), `--yozo-plum-dark` (`#2C1E26`), and Figtree/Besley font families.

