# Kay Cosmetics Theme ?" Architecture, Context & Engineering Reference

> **Persistent System Context**: This document serves as the permanent single source of truth for the Kay Cosmetics Shopify theme codebase. It outlines the architectural foundations, design system tokens, component hierarchies, modification matrix, and strict coding conventions for all modifications, enhancements, and new feature creations.

---

## 1. Project & Theme Identity

- **Store**: **Kay Cosmetics** (Pakistan's Premier Multi-Brand Cosmetics, Skincare, Haircare & Fragrance Destination).
- **Business Model**: Established cosmetics wholesale supplier expanding into direct-to-consumer (D2C) retail with nationwide Cash on Delivery (COD).
- **Base Engine**: **Shopify Horizon (v4.1.5)** ?" Shopify's modern theme engine utilizing native **Theme Blocks** (`_blocks.liquid`, `{% content_for 'block' %}`, `{% content_for 'blocks' %}`), native ES Modules via `<script type="importmap">`, and custom Web Components extending `DeclarativeShadowElement` & `Component`.
- **Git Remote**: `https://github.com/Genie-Usman/Kay-Cosmetics.git` on branch `master`.

---

## 2. Design System & Visual Identity

The visual identity is carefully synthesized from three high-end beauty benchmarks:
1. **Yozo Beauty**: Warm porcelain backdrop, rich dusty rosewood accents, deep plum typography, soft pastel category tints, and tactile pill containers.
2. **Allure Beauty**: Tooltip-style editorial floating mega-menu dropdown with glide animation; product card image hover transition (`scale(1.2)` to `scale(1.0)` cubic-bezier zoom/pulse).
3. **Notino**: Inline predictive search dropdown featuring a two-column layout (Left: Brands & Category Lines; Right: Products List with thumbnails and clean typography).

### Core Color Palette & CSS Variables (`assets/kay-cosmetics.css`)

| Token Variable | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| `--yozo-canvas` | `#FAF5F2` | Storewide canvas / body background (warm porcelain) |
| `--yozo-card-bg` | `#FFFFFF` | Product and category card surface |
| `--yozo-plum-dark` | `#2C1E26` | Primary headings, logo, high-contrast dark text |
| `--yozo-plum-deep` | `#33252E` | Deep plum hover states and rich borders |
| `--yozo-text-body` | `#574A52` | Editorial body copy and descriptions |
| `--yozo-text-muted` | `#6B5C65` | Subtitles, helper text, breadcrumbs |
| `--yozo-text-subdued` | `#94848D` | Micro labels, meta tags, disabled states |
| `--yozo-rosewood` | `#BD7385` | Primary brand accent: CTA buttons, active pills, badges |
| `--yozo-rosewood-hover` | `#A75D6F` | Darker rosewood hover for primary buttons |
| `--yozo-rose-ribbon` | `#F3C9D2` | Soft rose highlight, sold-out badge background |
| `--yozo-rose-dark` | `#4A2E36` | Text on soft rose ribbon badges |
| `--yozo-lilac` | `#CDBBE6` | Secondary beauty pastel accent |
| `--yozo-border-subtle` | `#EFE6E8` | Light card outlines, subtle dividers |
| `--yozo-border-medium` | `#DECED2` | Active input borders, pill dividers |
| `--yozo-pastel-peach` | `#FBF1ED` | Category badge tint / background |
| `--yozo-pastel-blue` | `#EBF3F8` | Category badge tint / background |
| `--yozo-pastel-lilac` | `#F5F0FB` | Category badge tint / background |
| `--yozo-pastel-pink` | `#FDF2F4` | Category badge tint / Header top row background |
| `--yozo-pastel-mint` | `#F0FBF0` | Category badge tint / background |

### Typography System

- **Headings (H1?"H4, Section Titles)**: `besley_n4` (Besley Serif) / `var(--font-heading--family), serif`.
- **Body & Subheadings**: `figtree_n4` (Figtree Sans-Serif) / `var(--font-body--family), sans-serif`.
- **Accent / Editorial Eyebrows**: `playfair_display_n4` (Playfair Display) / `var(--font-accent--family), serif`.
- **Section Eyebrow Pattern**:
  ```css
  font-size: 0.6875rem; /* 11px */
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--yozo-rosewood);
  ```

---

## 3. Directory Structure & System Map

```
Kay-Cosmetics/
??? .agents/              # Antigravity agent skills & tool definitions
??? assets/               # CSS, JS Web Components, SVGs, static imagery
?   ??? kay-cosmetics.css # MASTER custom theme stylesheet (2050+ lines)
?   ??? base.css          # Horizon base CSS framework
?   ??? component.js      # Base custom web component class (DeclarativeShadowElement)
?   ??? header-menu.js    # Mega-menu delay & hover state controller
?   ??? product-card.js   # Product card web component & preview handler
?   ??? swiper-bundle.*   # Swiper JS and CSS for sliders
??? blocks/               # Modern Shopify Theme Blocks (both _nested and root blocks)
?   ??? _product-card.liquid
?   ??? _product-card-gallery.liquid
?   ??? product-card-button.liquid
?   ??? product-title.liquid, price.liquid, product-vendor.liquid
??? config/
?   ??? settings_data.json   # Active merchant settings (colors, typography, buttons)
?   ??? settings_schema.json # Theme editor customizer controls
??? layout/
?   ??? theme.liquid      # Master layout (loads head snippets, header-group, footer-group)
?   ??? password.liquid   # Password protected storefront layout
??? locales/              # i18n translation strings (en.default.json)
??? product-assets/       # High-res raw photography organized by cosmetic brand
??? sections/             # Liquid section templates (Header, Hero, Product List, Footer...)
??? snippets/             # Atomic reusable Liquid components and sub-templates
??? templates/            # JSON template definitions (index.json, product.json, etc.)
```

---

## 4. Homepage Stack & Section Roster (`templates/index.json`)

The storefront index is assembled in the following deliberate sequence:

1. **`hero_section`** (`sections/hero-swiper.liquid`):
   - Edge-to-edge Swiper slider.
   - Dual-slide responsive hero with split text/imagery, customizable buttons (`primary-rosewood` & `outline`).
2. **`shop_by_category`** (`sections/category-grid.liquid`):
   - Category Carousel / Grid with playful Flower Badge Scallop or classic cards.
   - Utilizes `snippets/category-card-item.liquid` and category icons (`cat-concealer.jpg`, `cat-lipstick.jpg`, etc.).
3. **`featured_products`** (`sections/product-list.liquid`):
   - Grid or carousel of 5 columns (desktop) / 2 columns (mobile).
   - Renders Theme Blocks: `_product-card-gallery`, `product-vendor`, `product-title`, `price`, `product-card-button`.
   - Allure Beauty hover zoom (`scale 1.2` to `1.0`), secondary image crossfade, and floating quick-add button.
4. **`featured_brands_section`** (`sections/featured-brands.liquid`):
   - Swiper slider showcasing brand campaign banners (`brand-banner-miss-rose.jpg`, `dr-oz.jpg`, etc.) with customized bottom color bars.
5. **`why_kay_cosmetics`** (`sections/trust-features.liquid`):
   - 5-pillar beauty trust grid (Wholesale Heritage, Authentic Sourcing, Nationwide COD, Direct Pricing, WhatsApp Support).
6. **`editorial_wholesale_story`** (`sections/editorial-wholesale.liquid`):
   - Authentic editorial banner highlighting Kay Cosmetics' wholesale warehouse roots and transition to D2C.
7. **`beauty_shopping_guides`** (`sections/beauty-guides.liquid`):
   - Editorial advice and routine guides with Besley Serif titles, rounded cards (`12px` default), image zoom hover, and 47 granular Theme Editor settings.
8. **`whatsapp_vip_club`** (`sections/whatsapp-vip-club.liquid`):
   - Customer Care & Updates section with soft pastel lilac card frame (`#F6EDFA`), porcelain input, rosewood CTA, and 45 granular Theme Editor settings.

---

## 5. Architectural Deep Dives & Key Modifications

### A. Header & Mega Menu System
- **Files**:
  - `sections/header.liquid`
  - `sections/header-announcements.liquid`
  - `sections/header-group.json`
  - `snippets/header-row.liquid`
  - `snippets/mega-menu-list.liquid`
  - `assets/header-menu.js`
  - `assets/kay-cosmetics.css` (lines 761?"1345)
- **Architecture**:
  - Top Row (`#FDF2F4`): Logo left, prominent center search bar, right-side utility icons (Account, Cart drawer bubble).
  - Bottom Row (`#FDF2F4`): Centered navigation bar with uppercase links.
  - Hover Dropdown: Allure Beauty-inspired floating tooltip card with triangular pointer (`.header-menu__underlay::before`), buttery smooth glide, and multi-column category breakdown with vertical hairline dividers.
  - **Critical JS Behavior**: `assets/header-menu.js` uses a `180ms` `#deactivateTimer` to prevent mouse hover dropouts between the navigation trigger and the floating dropdown.

### B. Notino-Style Inline Predictive Search
- **Files**:
  - `sections/predictive-search.liquid`
  - `snippets/predictive-search-products-list.liquid`
  - `snippets/predictive-search-resource-carousel.liquid`
  - `assets/predictive-search.js`
  - `assets/kay-cosmetics.css` (lines 1346?"1691)
- **Architecture**:
  - Inline input with subtle pink border and clean search icon.
  - Floating two-column split dropdown:
    - **Left Column (~32%)**: Brands & Product Lines suggestions.
    - **Right Column**: Detailed products list with high-res thumbnails, plum titles, and muted brand labels.

### C. Product Cards & Image Hover Transitions
- **Files**:
  - `snippets/product-card.liquid`
  - `snippets/card-gallery.liquid`
  - `blocks/_product-card.liquid`
  - `blocks/_product-card-gallery.liquid`
  - `assets/product-card.js`
  - `assets/kay-cosmetics.css` (lines 1692?"2051)
- **Architecture**:
  - Card Frame: Rounded (`24px` radius default), subtle hover elevation (`.product-card--lift`), and studio reflection sweep (`.card-gallery--sheen`).
  - Image Transition: Allure Beauty `scale(1.20)` to `scale(1.0)` inward contraction with spring cubic-bezier (`cubic-bezier(0.16, 1, 0.3, 1)`).
  - Crossfade: When secondary media is present, the card uses a stacked two-layer transition: slide 1 remains underneath while slide 2 crossfades in with opacity, preventing disruptive slider jumps.
  - Quick-Add Button: Desktop on-image floating pill (`Add to Bag` / `Select Options`) with frosted glass backdrop (`rgba(255, 255, 255, 0.94)`), expanding smoothly on card hover.

### D. Cart Drawer
- **Files**:
  - `snippets/cart-drawer.liquid`
  - `sections/cart-drawer-section.liquid`
  - `assets/cart-drawer.js`
- **Architecture**:
  - Slide-in overlay drawer with `--yozo-canvas` background.
  - Sticky checkout CTA, free shipping progress bar, cart note, and discount code support.

---

## 6. How and Where to Make Modifications

When given a task, refer to this exact routing matrix:

| Task / Feature Ask | Primary Files to Touch | Secondary / Config Files |
| :--- | :--- | :--- |
| **Change Colors / Palette Tokens** | `assets/kay-cosmetics.css` (`:root`), `config/settings_data.json` | `snippets/color-palette.liquid` |
| **Modify Announcement Bar** | `sections/header-announcements.liquid`, `sections/header-group.json` | `assets/kay-cosmetics.css` (lines 765+) |
| **Adjust Mega Menu Dropdown** | `snippets/mega-menu-list.liquid`, `assets/kay-cosmetics.css` (lines 806+) | `assets/header-menu.js`, `sections/header-group.json` |
| **Adjust Search Dropdown UI** | `sections/predictive-search.liquid`, `assets/kay-cosmetics.css` (lines 1346+) | `snippets/predictive-search-*.liquid` |
| **Modify Hero Slider / Slides** | `sections/hero-swiper.liquid`, `templates/index.json` (`hero_section`) | `assets/swiper-bundle.min.js` |
| **Update Category Grid / Badges** | `sections/category-grid.liquid`, `snippets/category-card-item.liquid` | `templates/index.json` (`shop_by_category`) |
| **Tweak Product Card Styling** | `assets/kay-cosmetics.css` (lines 1692+), `snippets/card-gallery.liquid` | `blocks/_product-card.liquid`, `blocks/_product-card-gallery.liquid` |
| **Change Card Hover / Zoom Speed** | `snippets/card-gallery.liquid`, `blocks/_product-card-gallery.liquid` | `templates/index.json` (`featured_products` settings) |
| **Add / Edit Brand Banners** | `sections/featured-brands.liquid`, `templates/index.json` (`featured_brands_section`) | `sections/main-brands-page.liquid`, `templates/page.brands.json` |
| **Modify Trust Section Pillars** | `sections/trust-features.liquid`, `templates/index.json` (`why_kay_cosmetics`) | `assets/kay-cosmetics.css` |
| **Edit Footer Content & Links** | `sections/footer-group.json`, `sections/footer.liquid` | `sections/footer-utilities.liquid` |
| **Create a Brand-New Section** | Create `sections/<section-name>.liquid` with schema and CSS | Add section to `templates/index.json` or target template |
| **Create a New Theme Block** | Create `blocks/<block-name>.liquid` or `blocks/_<block-name>.liquid` | Register block in section's `{% schema %}` blocks array |

---

## 7. Strict Coding Standards & Conventions

0. **MANDATORY: Theme Editor First (No Hardcoding)**:
   - All visual, structural, copy, and layout changes **MUST** be configurable via Shopify Theme Editor settings.
   - If a setting or configuration needed for a design is missing, **add it directly to the section/block `{% schema %}`** with complete labels, groupings, and types.
   - Always update the active JSON template (e.g. `templates/index.json`) to reflect the newly introduced settings.
   - Never hardcode fixed values in HTML/CSS when they should be merchant-controllable.

1. **CSS Rule Ordering & Isolation**:
   - Storewide brand styles **MUST** reside in `assets/kay-cosmetics.css`.
   - Component-specific scoped styling inside sections should use `#SectionId-{{ section.id }}` or section class namespaces to prevent unintended cascading leaks.
   - Do **NOT** delete or alter the `measureHeaderHeights` script in `layout/theme.liquid`.
2. **Shopify Theme Blocks Compliance**:
   - Horizon relies heavily on Theme Blocks. Always verify if a section renders child blocks via `{% content_for 'block', type: '...', id: '...' %}` or `{% content_for 'blocks' %}` before inserting static HTML.
   - If adding a block to a section, make sure it is permitted in the section schema's `"blocks"` definition and registered in the corresponding template's JSON blocks object.
3. **Native ES Modules & Web Components**:
   - All theme custom elements inherit from `Component` in `assets/component.js`.
   - Never write ad-hoc inline `<script>` tags for global logic when a web component exists. Use custom event dispatches (`@shopify/events`) or component `ref` bindings.
4. **Preserve Fluid Animation Rhythms**:
   - The Allure Beauty hover effects in `snippets/card-gallery.liquid` and `assets/kay-cosmetics.css` have been calibrated to prevent layout jumping. Keep the transition duration between `0.38s` and `0.5s` using `cubic-bezier(0.16, 1, 0.3, 1)`.
5. **No Regressions on Touch / Responsive**:
   - Keep `.header-search-bar` and `#header-menu-container` visible on desktop even when touch events are detected (handled in `assets/kay-cosmetics.css` lines 1646?"1680).
   - Mobile product cards use 2-column or carousel layout with touch swiping.

