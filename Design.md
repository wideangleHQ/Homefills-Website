# HOMEFILLS — VISUAL DESIGN SYSTEM & DESIGN RULES

Create or completely rewrite:

`C:\WideAngle\Homefills\design.md`

This document must define ONLY the visual design system, styling rules, layout principles, responsive behaviour, typography, spacing, colours, component appearance, and interaction aesthetics for the Homefills demo website.

Do not define:
- Homepage content
- Homepage section sequence
- Shop page content
- Product information
- Navigation user flows
- Business content
- Product catalogue structure
- Functional implementation logic

Those decisions will be handled separately during development.

The purpose of this document is to establish a consistent visual language that governs every part of the Homefills website.

---

# 1. DESIGN PHILOSOPHY

The Homefills website must communicate:

- Premium simplicity
- Modern elegance
- Brand authenticity
- Visual confidence
- Clean product presentation
- Commercial sophistication
- Effortless usability

The overall experience should feel like a premium contemporary D2C brand.

Follow a minimalist design philosophy.

Every visual element must have a purpose.

Avoid excessive decorations, unnecessary containers, crowded layouts, random gradients, oversized rounded cards, and inconsistent spacing.

The design should rely on:
- Typography
- Composition
- Whitespace
- Strong imagery
- Balanced proportions
- Subtle interactions
- Clear visual hierarchy

Do not make the website look like a generic Shopify template.

The Ruchi website at:

`C:\WideAngle\Ruchi\Ruchi Website`

may be used as a visual quality reference, but Homefills must have its own design identity.

Do not copy its exact layouts, colours, typography combinations, or component compositions.

## 1.1 Brand identity and visual direction

The Homefills identity is a yellow-and-purple food brand. Fresh lemon and turmeric yellows set the environment, royal purple carries typography and every interaction, and the golden orange of the logo stays a quiet secondary detail.

The website should feel:
- Fresh and vibrant.
- Welcoming and trustworthy.
- Premium and modern.
- Food-oriented, minimal, and mature — never childish or overly playful.

Direction:
- Large, intentional colour blocks instead of many small coloured containers.
- Thoughtful alternation between lemon, turmeric, white, and soft surfaces.
- Purple as the single interactive colour.
- White surfaces behind product photography so packaging stays accurate and clear.
- The restraint rules in sections 7 and 8 (radius, shadow, decoration) still apply in full. The colour update changes the palette, not the minimalism.

# 2. BRAND COLOUR SYSTEM

The palette below is the approved Homefills identity. The HEX values are fixed. Do not tint, shift, or substitute them, and do not create page-specific palettes. The Homepage, the Shop page, and every later page use the same global tokens (section 19.1).

Golden orange `#DB9444` is the colour of the Homefills logo and must stay in harmony with it. Product packaging carries its own colours. The interface never imitates them.

## 2.1 Core palette

| Role | Name | HEX | Semantic use |
|---|---|---|---|
| Primary background | Soft Lemon Yellow | `#FEFCB9` | Dominant page background, header, navigation, bottom navigation, selected section backgrounds, product information panels, featured content surfaces, light promotional sections. |
| Secondary brand colour | Turmeric Yellow | `#E2B60B` | Hero background, promotional sections, brand storytelling, category showcase, large visual highlights, decorative elements, selected interactive accents (fills, rules, indicators). |
| Primary accent | Royal Purple | `#902E91` | Main headings, section titles, primary buttons, button borders, links, navigation text and highlights, interactive icons, selected-category indicators, card borders where appropriate. |
| Secondary accent | Warm Golden Orange | `#DB9444` | Logo-related accents, secondary brand details, small decorative highlights, subtle emphasis. Decorative only (see 2.6). |
| Neutral surface | Clean White | `#FDFDFC` | Product image containers, product gallery backgrounds, selected cards, clean content surfaces, image presentation areas. |
| Primary text | Deep Charcoal | `#282522` | Paragraphs, product descriptions, product information, secondary headings, general content. Never pure black. |

## 2.2 Supporting neutrals

Derived from the core palette. They support it and never replace it.

| Role | HEX | Semantic use |
|---|---|---|
| Muted text | `#716B58` | Metadata, captions, placeholders, inactive navigation labels. |
| Subtle border | `#E5DFA5` | Decorative dividers and container edges on lemon, soft, and white surfaces. |
| Soft surface | `#FFFDE0` | Quiet panels, footer, hover and selected backgrounds, grouped content. |
| Disabled background | `#F1EDC7` | Disabled controls and unavailable states. |

## 2.3 Derived interaction and status colours

Only the colours below may be added to the core palette, and only for the purposes stated.

| Role | HEX | Use |
|---|---|---|
| Purple hover | `#7A2579` | Hover state of purple fills, links, and icons. |
| Purple pressed | `#6B1F6C` | Active (pressed) state. |
| Purple tint | `#902E91` at 8% opacity | Hover fill for secondary and ghost controls. |
| On-purple text | `#FDFDFC` | Text and icons on purple fills. |
| Success | `#2F6B3A` | Confirmations. Always paired with an icon and text. |
| Warning | `#7A5200` | Cautions. Always paired with an icon and text. |
| Error | `#B3261E` | Errors. Always paired with an icon and text. |

## 2.4 Colour hierarchy and balance

Rank the colours in this order:

1. Soft Lemon Yellow: the dominant brand background.
2. Royal Purple: primary typography and interaction colour.
3. Turmeric Yellow: large visual accents and promotional sections.
4. Clean White: product presentation and clean surfaces.
5. Golden Orange: secondary brand details.
6. Deep Charcoal: readable content.

Approximate balance across a page:
- Lemon: the largest share of the background area, roughly half.
- Turmeric: a minority of the area, in a small number of deliberate blocks.
- White and soft surfaces: product tiles and quiet panels, not whole-page backdrops.
- Purple: text, controls, and small fills, never a dominant background area.
- Orange: a trace, only where it echoes the logo.

The site must not read as a flat yellow-and-purple interface. Visual rhythm comes from alternating surfaces, not from adding colours.

## 2.5 Backgrounds, surfaces, and section rhythm

| Surface | Token | Use | Default text |
|---|---|---|---|
| Lemon | `#FEFCB9` | Page background, header, bottom navigation, most sections. | Charcoal body, purple headings. |
| Turmeric | `#E2B60B` | Hero, one brand-story or promotional block, final call to action. | Charcoal for all text. Purple only at large heading sizes (see 2.7). |
| White | `#FDFDFC` | Product image tiles, galleries, modals, drawers, form fields. | Charcoal body, purple headings and prices. |
| Soft | `#FFFDE0` | Footer, grouped panels, hover and selected backgrounds. | Charcoal body, purple headings. |

Rules:
- Alternate section backgrounds on purpose. Never place two same-coloured sections back to back without a subtle border or a spacing change.
- Use turmeric for large blocks only. Do not use turmeric for small cards, chips, or body-text containers.
- Use at most one full-width turmeric block in any two consecutive sections.
- Place product photography on white (`#FDFDFC`) tiles. The tile sets off the pack from the yellow environment.
- Do not colour every section. Lemon is the default, and every other surface must have a reason.
- Full-width dark or purple sections are not part of this identity. Purple solid fills are limited to controls, badges, the announcement bar (lemon text on purple), and selected states.
- Approved exception: the closing call-to-action band on the Homepage uses a full-width Royal Purple background with White `#FDFDFC` headings and Light Peach `#FFE5D4` body and link text (5.83:1 on purple), a white filled button with purple text, and a peach focus ring. Light Peach is used only on purple surfaces.
- No gradients. Depth comes from surface change, border, and spacing. Shadows are neutral (charcoal at low opacity) and used only as described in section 8.

## 2.6 Colour usage rules

1. Purple is the only interactive colour. Every link, button, selected state, and interactive icon uses it.
2. Orange never competes with purple as an interactive accent. It is decorative: logo, thin rules, and small ornaments. It is never used for text, and never used for icons that carry meaning, because it fails text and icon contrast on lemon and white.
3. Turmeric is for large areas. Avoid it for small text or thin lines on lemon, where it is barely visible (1.82:1).
4. Subtle border (`#E5DFA5`) is decorative. It does not meet 3:1 against lemon or white, so any boundary needed to find or identify a control (field edges, outline buttons) uses purple or muted text colour instead.
5. Do not communicate state by colour alone. Pair active, selected, error, and disabled states with underline, weight, icon, or text.
6. Avoid random colour combinations, extra accent colours, and unrelated card colours.

## 2.7 Which text colour goes on which surface

| Surface | Body text | Headings | Links and controls | Muted text |
|---|---|---|---|---|
| Lemon | Charcoal | Purple | Purple | Muted |
| White | Charcoal | Purple | Purple | Muted |
| Soft | Charcoal | Purple | Purple | Muted |
| Turmeric | Charcoal | Charcoal, or purple at 24px and above (18.66px bold and above) | Lemon-filled controls with purple text, or purple filled buttons with on-purple text | Not permitted. Use charcoal. |
| Purple fill | On-purple (`#FDFDFC`) or lemon | On-purple or lemon | Not applicable | Not permitted |

# 3. TYPOGRAPHY SYSTEM

Homefills currently uses the following typography stack:

- Archivo
- Proza Libre
- Arial
- System UI fallbacks

Preserve the familiarity of the existing brand typography.

Use the following primary font system.

## Archivo — Primary Typeface

Use Archivo for:
- Display headings
- Section headings
- Navigation
- Product titles
- Prices
- Buttons
- Labels
- Metadata
- UI elements

Suggested weights:
- 400 Regular
- 500 Medium
- 600 SemiBold
- 700 Bold

## Proza Libre — Secondary Typeface

Use Proza Libre for:
- Paragraphs
- Supporting descriptions
- Editorial copy
- Brand storytelling
- Long-form text

Suggested weights:
- 400 Regular
- 500 Medium

Do not use too many font weights.

## Typography hierarchy

Define a responsive type scale for:
- Hero display
- Main page heading
- Section heading
- Subheading
- Card heading
- Body large
- Body regular
- Body small
- Navigation
- Button text
- Metadata

Use CSS `clamp()` for fluid typography where appropriate.

Typography must scale smoothly between mobile, tablet, and desktop.

Avoid:
- Excessive letter spacing
- Extremely small text
- Too many font sizes
- Unnecessary uppercase text
- Decorative fonts
- Inconsistent heading weights

Headings should have a strong visual presence without becoming unnecessarily oversized.

Body text must remain comfortably readable.

## 3.1 Typography colour rules

The font system is unchanged: Archivo and Proza Libre, the same weights and the same fluid scale. Only colour is updated.

| Element | Colour |
|---|---|
| Display, page heading, section heading | Royal Purple `#902E91` on lemon, white, and soft. Charcoal on turmeric unless the size qualifies as large text. |
| Subheadings and card headings | Purple, or charcoal where the heading sits next to a purple price or button. |
| Navigation | Purple. |
| Body paragraphs and product descriptions | Deep Charcoal `#282522`. Never use purple for long-form text. |
| Prices | Purple. |
| Metadata and captions | Muted `#716B58`, on lemon, white, or soft only. |
| Links in running text | Purple, underlined by default. Hover uses `#7A2579` with a thicker underline. |
| Text on purple fills | `#FDFDFC` or lemon. |

Avoid pure black, and avoid coloured text on coloured surfaces beyond the pairs above.

# 4. SPACING SYSTEM

Spacing consistency is one of the highest priorities.

Use a systematic spacing scale based on an 8px visual rhythm, with smaller 4px increments permitted for fine adjustments.

Suggested tokens:

- 4px — Fine adjustments
- 8px — Tight spacing
- 12px — Compact spacing
- 16px — Standard spacing
- 24px — Component spacing
- 32px — Medium separation
- 48px — Large separation
- 64px — Section separation
- 80px — Large section separation
- 96px — Extra-large section separation
- 120px — Editorial spacing

Use these as a design system, not rigid values.

## Global horizontal padding

Desktop:
- 64px–96px where screen width permits.

Laptop:
- 40px–64px.

Tablet:
- 24px–32px.

Mobile:
- 16px–20px.

Do not allow content to touch screen edges.

Maintain consistent left and right alignment throughout the site.

## Vertical spacing

Desktop:
- 64px–96px between major sections.

Tablet:
- 48px–72px.

Mobile:
- 32px–48px.

Spacing must be proportional to viewport size and content density.

Do not compress every section on mobile, but also avoid excessive empty space.

# 5. SECTION HEIGHT AND VIEWPORT RULES

The visual presentation should be based on viewport-aware section composition.

Target approximately 90–100vh for major visual sections on desktop.

Use:
- `min-height: 90svh` where a major section requires near-full-screen presentation.
- `min-height: 100svh` for sections specifically designed to occupy the viewport.
- `min-height: 100dvh` where dynamic viewport behaviour is required and supported.

IMPORTANT:

Do not blindly force every section to exactly 100vh.

The 90–100vh principle is a visual composition guideline, not permission to clip content.

Use natural content height when:
- Text exceeds the available viewport.
- Product grids contain multiple rows.
- Content needs additional vertical space.
- Mobile screen height is limited.
- Accessibility requires additional room.

For short content sections, avoid artificial empty space.

For mobile, adapt section height based on content rather than forcing desktop proportions.

Use `min-height` instead of fixed `height` wherever possible.

Always account for:
- Browser chrome
- Dynamic viewport changes
- Fixed navigation
- Safe-area insets
- Text wrapping
- Responsive image proportions

# 6. LAYOUT AND GRID SYSTEM

Create a consistent responsive layout system.

## Maximum content width

Use a centred content container.

Suggested maximum width:
- 1440px–1600px for wide desktop layouts.

Keep very wide screens visually controlled.

## Grid rules

Use CSS Grid and Flexbox appropriately.

Desktop:
- Flexible multi-column layouts.
- Consistent column gaps.
- Balanced image-to-content ratios.

Tablet:
- Reduce columns and adapt composition.

Mobile:
- Single-column layouts where appropriate.
- Two-column product grids only when the content remains comfortably readable.
- Avoid horizontal overflow.

Avoid rigid fixed-width elements.

Use responsive `minmax()`, `clamp()`, and flexible sizing where appropriate.

# 7. MINIMALISM AND VISUAL SIMPLICITY

Minimalism is a core requirement.

Follow these rules:

1. Avoid unnecessary borders.
2. Avoid excessive card containers.
3. Avoid decorative background shapes without purpose.
4. Avoid excessive shadows.
5. Avoid multiple overlapping visual effects.
6. Avoid oversized icons.
7. Avoid unnecessary badges.
8. Avoid excessive rounded corners.
9. Avoid unnecessary gradients.
10. Avoid overcrowded content.
11. Avoid repetitive section compositions.
12. Avoid excessive animation.

Prefer:
- Open layouts
- Clean grids
- Generous whitespace
- Editorial image compositions
- Clear typographic hierarchy
- Subtle separators
- Strong product photography

Do not place every element inside a card.

Use containers only when they establish meaningful grouping or interaction.

# 8. BORDER RADIUS AND SHADOWS

Maintain a restrained design language.

Suggested radius system:

- Small controls: 4px–6px
- Buttons: 4px–8px
- Product cards: 6px–10px where needed
- Modals and drawers: 10px–14px
- Large feature containers: 12px–16px

Avoid excessive pill-shaped UI.

Do not round every image or every section.

Shadows should be subtle and functional.

Use shadows primarily for:
- Dropdowns
- Modals
- Drawers
- Floating navigation
- Elevated interactive elements

Prefer borders and tonal separation over heavy shadows.

# 9. IMAGE AND PRODUCT PHOTOGRAPHY RULES

Product photography is a primary visual element.

Use original Homefills assets wherever possible.

Follow:
- Preserve original product proportions.
- Never distort packaging.
- Avoid incorrect cropping of product labels.
- Use consistent image ratios within the same component type.
- Use `object-fit: contain` for product packaging when full visibility is important.
- Use `object-fit: cover` for editorial and lifestyle photography when appropriate.
- Maintain sufficient visual space around products.
- Use appropriate background treatments: product packaging sits on Clean White `#FDFDFC` tiles. Packaging colours are never tinted, overlaid, or filtered to match the interface.
- Avoid arbitrary image filters.
- Avoid excessive overlays.
- Preserve image quality.

Do not mix inconsistent product image treatments within the same product grid.

Responsive image sizes must be appropriate to their displayed dimensions.

# 10. RESPONSIVE DESIGN — MOBILE FIRST

Mobile-first development is mandatory.

Design the smallest viewport first, then progressively enhance the experience.

Suggested breakpoints:

- Small mobile: 320px–374px
- Mobile: 375px–479px
- Large mobile: 480px–767px
- Tablet: 768px–1023px
- Laptop: 1024px–1279px
- Desktop: 1280px–1535px
- Wide desktop: 1536px+

Breakpoints may be adjusted to suit actual layouts.

## Mobile design rules

- Avoid horizontal scrolling.
- Maintain minimum 16px page padding.
- Ensure readable font sizes.
- Use appropriately sized touch targets.
- Avoid dense navigation.
- Avoid desktop layouts squeezed into mobile.
- Maintain clear content hierarchy.
- Adapt imagery and composition.
- Use natural content heights.
- Keep interactive controls accessible.
- Avoid overlays that obscure important content.

All interactive targets should preferably have a minimum 44px touch area.

Respect device safe-area insets.

# 11. MOBILE BOTTOM NAVIGATION

A persistent bottom navigation bar is required on mobile devices.

This is an important part of the mobile experience.

## Visual rules

- Fixed to the bottom of the viewport.
- Full available width.
- Clean, minimal appearance.
- Subtle top border or very restrained shadow.
- Background: Soft Lemon Yellow `#FEFCB9`, with a 1px Subtle border `#E5DFA5` on the top edge.
- Clearly visible icons.
- Short labels where appropriate.
- Active state in Royal Purple `#902E91`, with a 2px purple indicator above the icon and a bolder label so the state is not colour alone.
- Inactive icons and labels in Muted `#716B58` (5.03:1 on lemon).
- Cart count badge: purple fill, `#FDFDFC` text.
- Consistent icon sizes.
- Comfortable spacing between navigation items.
- Safe-area support using `env(safe-area-inset-bottom)`.

The navigation should feel native and unobtrusive.

Suggested styling:
- Background: lemon, as above.
- Height: approximately 60px–68px excluding safe-area inset.
- Icon size: 20px–22px.
- Label size: 10px–12px.
- Fixed positioning.
- Appropriate z-index.

Use a clean Lucide icon system if the project already supports it.

Do not use oversized icons or excessive active-state animations.

The bottom navigation must not overlap page content.

Reserve appropriate bottom padding in the page layout.

Account for:
- Device safe area
- Browser viewport
- Cart drawer
- Modal layers
- Keyboard visibility
- Scroll behaviour

On desktop, use the appropriate desktop navigation instead of displaying the mobile bottom navigation.

# 12. HEADER AND NAVIGATION APPEARANCE

The desktop header should feel clean, premium, and uncluttered.

Use:
- Consistent horizontal alignment.
- Proper logo sizing.
- Balanced navigation spacing.
- Subtle hover states.
- Clear active state.
- Minimal borders.
- Appropriate responsive behaviour.

Avoid unnecessarily tall headers.

Mobile navigation should be optimised for touch.

Avoid displaying desktop navigation and mobile navigation simultaneously.

## 12.1 Header and navigation colours

- Background: Soft Lemon Yellow `#FEFCB9`, solid, on every page, including Home and Shop.
- Bottom edge: 1px Subtle border `#E5DFA5`.
- Navigation text: Royal Purple, medium weight.
- Hover: the purple underline grows in, with the text moving to `#7A2579`.
- Active indicator: 2px purple underline plus `aria-current="page"`.
- Icons (search, cart, menu): purple, 20–22px.
- Cart count badge: purple fill, `#FDFDFC` text.
- Logo: the original Homefills logo asset, unmodified. It is never recoloured, outlined, stretched, or given a shadow.
- Announcement bar, if used: purple fill with lemon text (6.65:1).

Logo note: the orange wordmark `#DB9444` on lemon is 2.38:1. Logotypes are exempt from WCAG contrast requirements, but the fine tagline is weak at small sizes. Keep the logo at or above its minimum rendered height, and obtain a higher-contrast logo variant from the client if it needs to appear smaller.

# 13. BUTTONS AND INTERACTIVE ELEMENTS

Buttons must have a consistent visual language.

Define:
- Primary button
- Secondary button
- Text button
- Icon button
- Disabled button

Rules:
- Consistent height.
- Balanced horizontal padding.
- Clear typography.
- Strong contrast.
- Subtle hover feedback.
- Visible keyboard focus.
- Clear disabled state.

Avoid excessive gradients, unnecessary outlines, and oversized rounded buttons.

Use smooth transitions for hover and active states.

## 13.1 Button colour system

All buttons use the same height, radius (4px–8px), type, and transition (150ms–200ms). Only colour varies.

| Variant | Background | Text | Border | Hover | Pressed |
|---|---|---|---|---|---|
| Primary | `#902E91` | `#FDFDFC` | `#902E91` | `#7A2579` fill and border | `#6B1F6C` |
| Secondary | Transparent, or lemon `#FEFCB9` | `#902E91` | `#902E91` | Purple tint (8%) fill | Purple tint, border `#6B1F6C` |
| Text button | None | `#902E91` | None | `#7A2579`, underline | `#6B1F6C` |
| Icon button | None | `#902E91` icon | None, or purple | Purple tint fill | Purple tint, deeper |
| Disabled | `#F1EDC7` | `#716B58` | `#E5DFA5` | None | None |

Rules:
- Primary is the same purple everywhere, including on turmeric sections (purple against turmeric is 3.66:1, which passes for a UI boundary, and the button text is 6.91:1).
- On a turmeric surface, use a lemon-filled secondary button with purple text. Purple text directly on turmeric is not used below large size.
- A section has one primary button.
- Disabled controls also use `cursor: not-allowed` and `aria-disabled`. They are exempt from contrast rules, but their label must stay legible.
- Transitions affect colour and a 1px press translate only. No scale, bounce, or glow.

## 13.2 Interactive states

| State | Treatment |
|---|---|
| Hover | One step darker purple (`#7A2579`) or the purple tint fill. Underlines grow. No movement beyond 1–2px. |
| Focus-visible | 2px purple outline, 3px offset. On turmeric surfaces, use a 2px charcoal outline (purple is only 3.66:1 there). Never remove the outline. |
| Active (pressed) | `#6B1F6C`, with a 1px translate. |
| Selected | Purple fill with `#FDFDFC` text, or a 2px purple underline or border with bold text, plus a check icon for filters and options. |
| Disabled | `#F1EDC7` background, `#716B58` text, and not-allowed cursor. |
| Error | `#B3261E` text and border with an icon and message. |
| Text selection | Purple background with `#FDFDFC` text. |

Form fields: white `#FDFDFC` background, 1px muted `#716B58` border (5.23:1 on white), purple 2px border on focus, muted placeholder, and visible labels. Success, warning, and error messages use their status colours with an icon.

# 14. ANIMATION AND MOTION

Use restrained, purposeful motion.

Permitted visual treatments:
- Subtle fade-in.
- Small translate transitions.
- Smooth image transitions.
- Button hover transitions.
- Navigation transitions.
- Drawer and modal transitions.
- Gentle scroll-based reveals where justified.

Avoid:
- Large pop animations.
- Aggressive bouncing.
- Excessive parallax.
- Unnecessary scroll-jacking.
- Constant movement.
- Long animation delays.
- Animations that delay access to content.

Recommended transition duration:
- Micro-interactions: 150ms–200ms.
- Standard interactions: 200ms–300ms.
- Larger transitions: 300ms–450ms.

Prefer subtle easing curves.

Support `prefers-reduced-motion`.

Do not compromise scrolling performance for animation.

# 15. SCROLL AND STICKY BEHAVIOUR

Scrolling must remain natural and predictable.

Rules:
- No unnecessary scroll locking.
- No forced scroll snapping across the entire website.
- No aggressive sticky sections.
- Sticky elements must not obstruct content.
- Maintain sufficient scroll offset for anchor navigation.
- Preserve access to bottom navigation on mobile.
- Avoid unnecessary parallax.

Use smooth scrolling only where it improves navigation.

# 16. COMPONENT CONSISTENCY

All components must follow the same visual system.

This includes:
- Header
- Footer
- Buttons
- Product cards
- Category cards
- Inputs
- Search fields
- Filters
- Dropdowns
- Modals
- Drawers
- Badges
- Breadcrumbs
- Navigation
- Empty states
- Loading states

Do not introduce unrelated component styles.

Use reusable design tokens.

Avoid duplicating hardcoded colours, spacing values, or radius values across components.

## 16.1 Product card and shopping component colours

The same system serves the Homepage, the Shop page, quick view, and the cart.

| Element | Colour |
|---|---|
| Image container | Clean White `#FDFDFC`, with a 1px Subtle border `#E5DFA5`. Hover border: purple. Packaging uses `object-contain` and is never tinted. |
| Information area | No container. It sits on the section's own surface (lemon, or soft). Where a panel is needed, use white or soft. |
| Product title | Purple `#902E91`, semi-bold. |
| Description | Charcoal `#282522`. |
| Category and pack metadata | Muted `#716B58`. |
| Price | Purple, semi-bold. |
| Add to cart and quick-view controls | Purple (primary or icon button, per 13.1). |
| Badges | Purple fill with `#FDFDFC` text, or turmeric fill with charcoal text (7.93:1). One badge style per context. |
| Selected category or filter | Purple fill with `#FDFDFC` text and a check icon, or a 2px purple underline with bold text. Unselected: purple outline on lemon. |
| Quick view, drawers, modals | White `#FDFDFC` surface, purple headings, charcoal body, neutral charcoal-based shadow, and an overlay in charcoal at 40% opacity (not purple). |
| Cart count | Purple badge, `#FDFDFC` text. |

Do not introduce unrelated card colours. Product grids sit on lemon (or soft) so the white tiles stand out. Do not place a product grid on turmeric.

# 17. ACCESSIBILITY AND READABILITY

Follow WCAG 2.2 AA as the design target.

Ensure:
- Sufficient colour contrast.
- Keyboard accessibility.
- Visible focus indicators.
- Semantic typography hierarchy.
- Readable font sizes.
- Accessible control labels.
- Adequate touch targets.
- Reduced-motion support.
- Proper image alternative text.
- Clear error and disabled states.

Do not communicate active or error states using colour alone.

## 17.1 Colour contrast requirements

Targets: WCAG 2.2 AA. Normal text at 4.5:1, large text (24px regular or 18.66px bold and above) at 3:1, and UI components and meaningful graphics at 3:1. Ratios below are calculated from the exact HEX values.

| Pairing | Ratio | Status |
|---|---|---|
| Purple `#902E91` on lemon | 6.65 | AA, all text |
| Purple on white `#FDFDFC` | 6.91 | AA, all text |
| Purple on soft `#FFFDE0` | 6.83 | AA, all text |
| Purple on disabled `#F1EDC7` | 5.92 | AA |
| `#FDFDFC` on purple | 6.91 | AA, button text |
| Lemon on purple | 6.65 | AA |
| Hover purple `#7A2579` on lemon | 8.38 | AA |
| `#FDFDFC` on hover purple | 8.71 | AA |
| Charcoal `#282522` on lemon | 14.40 | AAA |
| Charcoal on white | 14.97 | AAA |
| Charcoal on soft | 14.79 | AAA |
| Charcoal on turmeric `#E2B60B` | 7.93 | AAA |
| Muted `#716B58` on lemon | 5.03 | AA |
| Muted on white | 5.23 | AA |
| Muted on soft | 5.16 | AA |
| Success `#2F6B3A` / warning `#7A5200` / error `#B3261E` on lemon or white | 6.04–6.80 | AA |
| Purple on turmeric | 3.66 | Large text and UI boundaries only |
| Muted on turmeric | 2.77 | Not permitted |
| Orange `#DB9444` on lemon / white | 2.38 / 2.48 | Not permitted for text or meaningful icons. Decorative only |
| Turmeric on lemon | 1.82 | Decorative only. Never for text or a needed boundary |
| Subtle border `#E5DFA5` on lemon / white | 1.29 / 1.34 | Decorative only. Controls use purple or muted |
| Muted on disabled `#F1EDC7` | 4.48 | Disabled state, exempt |

Requirements:
- Never place text on a surface that is not listed in 2.7.
- Do not rely on colour alone for state (see 2.6 and 13.2).
- Check any new pairing with a contrast tool before using it, and add it to this table.
- Support high-contrast and forced-colours modes: borders and focus outlines must remain visible when custom colours are overridden.

# 18. PERFORMANCE-AWARE DESIGN

Visual quality must not come at the cost of performance.

Avoid:
- Excessive blur effects.
- Heavy shadows.
- Unnecessary animation libraries.
- Large decorative video backgrounds.
- Excessive font families.
- Oversized images.
- Unnecessary fixed backgrounds.
- Too many simultaneously animated elements.

Use responsive image sizing.

Load below-the-fold imagery lazily where appropriate.

Keep typography loading efficient.

# 19. CSS AND DESIGN TOKEN IMPLEMENTATION

The design system should be implementable through reusable CSS variables or the project's existing styling architecture.

Define tokens for:

- Colours
- Typography
- Font sizes
- Font weights
- Line heights
- Letter spacing
- Spacing
- Container widths
- Border radii
- Borders
- Shadows
- Breakpoints
- Transitions
- Z-index layers

Avoid scattered one-off values.

Use the existing project's styling framework rather than introducing another one unnecessarily.

## 19.1 Centralised colour tokens

All pages use these global tokens. Components reference tokens, never raw HEX values.

| Token | Suggested CSS variable | HEX | Semantic use |
|---|---|---|---|
| Brand Primary Background | `--hf-bg` | `#FEFCB9` | Page, header, bottom navigation |
| Brand Secondary Yellow | `--hf-yellow` | `#E2B60B` | Large blocks, hero, promo, indicators |
| Brand Primary Accent | `--hf-purple` | `#902E91` | Headings, links, buttons, icons, selected states |
| Brand Secondary Accent | `--hf-orange` | `#DB9444` | Logo-related, decorative |
| Surface White | `--hf-white` | `#FDFDFC` | Product tiles, modals, fields |
| Text Primary | `--hf-text` | `#282522` | Body and product information |
| Text Muted | `--hf-text-muted` | `#716B58` | Metadata, placeholders |
| Border Subtle | `--hf-border` | `#E5DFA5` | Decorative dividers and edges |
| Surface Soft | `--hf-surface-soft` | `#FFFDE0` | Footer, panels, hover fills |
| Disabled Background | `--hf-disabled` | `#F1EDC7` | Disabled states |

Derived tokens:

| Token | Suggested CSS variable | Value |
|---|---|---|
| Purple hover | `--hf-purple-hover` | `#7A2579` |
| Purple pressed | `--hf-purple-pressed` | `#6B1F6C` |
| Purple tint | `--hf-purple-tint` | `rgb(144 46 145 / 0.08)` |
| On purple | `--hf-on-purple` | `#FDFDFC` |
| Focus ring | `--hf-focus` | `var(--hf-purple)` (charcoal on turmeric) |
| Success | `--hf-success` | `#2F6B3A` |
| Warning | `--hf-warning` | `#7A5200` |
| Error | `--hf-error` | `#B3261E` |

```css
:root {
  --hf-bg: #fefcb9;
  --hf-yellow: #e2b60b;
  --hf-purple: #902e91;
  --hf-orange: #db9444;
  --hf-white: #fdfdfc;
  --hf-text: #282522;
  --hf-text-muted: #716b58;
  --hf-border: #e5dfa5;
  --hf-surface-soft: #fffde0;
  --hf-disabled: #f1edc7;

  --hf-purple-hover: #7a2579;
  --hf-purple-pressed: #6b1f6c;
  --hf-purple-tint: rgb(144 46 145 / 0.08);
  --hf-on-purple: #fdfdfc;
  --hf-focus: var(--hf-purple);
  --hf-success: #2f6b3a;
  --hf-warning: #7a5200;
  --hf-error: #b3261e;
}
```

Map these into the project's styling framework (for example, as Tailwind `@theme` colours) so components use semantic names. The shadcn/ui variables map as: background → `--hf-bg`, foreground → `--hf-text`, primary → `--hf-purple`, primary-foreground → `--hf-on-purple`, muted-foreground → `--hf-text-muted`, border → `--hf-border` (field borders use `--hf-text-muted`), ring → `--hf-focus`, destructive → `--hf-error`.

# 20. DESIGN QUALITY CHECKLIST

Before considering any implementation visually complete, verify:

- [ ] Homefills brand colours are used consistently.
- [ ] Every colour comes from a global token. No raw HEX values or page-specific palettes exist.
- [ ] Lemon `#FEFCB9` is the dominant background, and turmeric blocks are large and deliberate.
- [ ] Purple is the only interactive colour (links, buttons, icons, selected states).
- [ ] Orange appears only as a decorative accent and never as text or a meaningful icon.
- [ ] Product photography sits on white `#FDFDFC` tiles and packaging is never tinted.
- [ ] Section backgrounds alternate with purpose, with no flat yellow-and-purple look and no gradients.
- [ ] Header, bottom navigation, buttons, and product cards follow 12.1, 11, 13.1, and 16.1.
- [ ] Every text and surface pairing is in the 17.1 table and passes AA.
- [ ] Hover, focus, active, selected, and disabled states follow 13.2, and none relies on colour alone.
- [ ] Archivo and Proza Libre are implemented correctly.
- [ ] Typography hierarchy is consistent.
- [ ] Spacing follows the design scale.
- [ ] Desktop content is properly centred.
- [ ] Major visual sections use viewport-aware proportions.
- [ ] No content is clipped by forced viewport heights.
- [ ] Mobile layouts are designed independently.
- [ ] Mobile bottom navigation is present.
- [ ] Bottom navigation respects safe-area insets.
- [ ] Page content does not overlap fixed navigation.
- [ ] Product images maintain their proportions.
- [ ] Minimalism is maintained.
- [ ] No unnecessary gradients or shadows exist.
- [ ] Buttons and controls are consistent.
- [ ] Hover, focus, and active states are defined.
- [ ] Animations are subtle.
- [ ] Reduced-motion preferences are respected.
- [ ] No horizontal overflow exists.
- [ ] Touch targets are accessible.
- [ ] Text contrast is sufficient.
- [ ] Components share consistent visual tokens.

# FINAL DESIGN DIRECTIVE

The Homefills experience should look premium through restraint, composition, typography, and imagery.

Do not confuse premium design with excessive decoration.

Prioritise:
1. Brand consistency.
2. Minimalism.
3. Responsive composition.
4. Whitespace.
5. Typography.
6. Product photography.
7. Consistent spacing.
8. Accessibility.
9. Performance.
10. Subtle interactions.

Use approximately 90–100vh as the target visual proportion for major desktop sections, while allowing natural content-driven height wherever required.

Mobile-first responsiveness is mandatory.

A persistent bottom navigation is mandatory on mobile.

Most importantly, this document is a VISUAL DESIGN SYSTEM ONLY. Do not add page content plans, section sequences, user flows, or functional requirements.

Create the complete `design.md`, inspect it for contradictions, and stop after confirming the file has been written successfully.