# Design System Profile — LingGuang / Vibe-Coding Interface

> **Purpose:** Use this document as context in Cursor (or any AI coding assistant) to replicate the visual design language, layout patterns, and component style of this product with consistency.

---

## 1. Design Philosophy

This UI follows a **dark-first, editorial tech** aesthetic — the kind common in Chinese AI products and next-gen developer tools. It balances information density with generous white space, using soft glows and layered depth rather than hard shadows. The visual tone is: _clean, futuristic, trustworthy, premium_.

**Core principles:**

- Dark backgrounds with layered surface elevation
- Soft neon/electric accent colors (not harsh, slightly desaturated)
- High-contrast typography on dark surfaces
- Rounded-but-not-toy corner radii
- Cards as the primary layout primitive
- Subtle animated gradient effects and glow treatments
- Minimal chrome, maximum content

---

## 2. Color System

### Background Palette (dark mode)

| Role                      | Description                            | Approximate Value        |
| ------------------------- | -------------------------------------- | ------------------------ |
| Page background           | Deep near-black, slightly warm or cool | `#0D0E11` or `#0F1117`   |
| Surface / Card background | Slightly elevated dark                 | `#161820` or `#1A1C24`   |
| Surface raised            | Modal / active card                    | `#1E2030` or `#22253A`   |
| Border / Divider          | Very subtle, low contrast              | `rgba(255,255,255,0.08)` |
| Border active/hover       | Slightly more visible                  | `rgba(255,255,255,0.15)` |

### Accent Colors

| Role                 | Color                  | Notes                             |
| -------------------- | ---------------------- | --------------------------------- |
| Primary action / CTA | Electric blue          | `#4A9EFF` or `#3B8EEA`            |
| Secondary accent     | Soft purple / violet   | `#8B5CF6` or `#7C6FF7`            |
| Gradient accent      | Blue → purple diagonal | Used on hero elements, highlights |
| Success / positive   | Muted green            | `#34D399` or `#10B981`            |
| Warning / metric up  | Soft amber/orange      | `#F59E0B`                         |
| Error / metric down  | Muted red              | `#EF4444`                         |

### Text Palette

| Role                    | Value                    |
| ----------------------- | ------------------------ |
| Primary text            | `#F0F2F8` or near-white  |
| Secondary text          | `#9CA3AF` or `#8B95A6`   |
| Tertiary / hint         | `rgba(255,255,255,0.35)` |
| On-accent (button text) | `#FFFFFF`                |

### Glow / Ambient Effects

- Cards and hero elements often have a diffuse, low-opacity radial gradient glow behind them (the same hue as the accent — blue or purple)
- Use `box-shadow: 0 0 40px rgba(74, 158, 255, 0.12)` for subtle card glows
- Active/selected states use `box-shadow: 0 0 0 1px rgba(74,158,255,0.5), 0 0 20px rgba(74,158,255,0.15)`

---

## 3. Typography

### Font Strategy

- **Display / Hero:** A clean geometric sans with Chinese language support — system or variable weight. Likely `PingFang SC`, `Source Han Sans`, or a western equivalent like `DM Sans` or `Plus Jakarta Sans` for Latin fallback.
- **Body / UI text:** Same family, regular weight. Clear legibility at small sizes.
- **Mono / Code snippets:** `JetBrains Mono`, `Fira Code`, or `SF Mono`

### Type Scale

| Level           | Size    | Weight  | Usage                        |
| --------------- | ------- | ------- | ---------------------------- |
| Hero headline   | 32–48px | 700     | Page-level title, key stat   |
| Section title   | 20–24px | 600     | Card headers, section labels |
| Body            | 14–16px | 400     | Descriptions, paragraph text |
| Small / Caption | 12–13px | 400–500 | Labels, meta info, badges    |
| Micro           | 10–11px | 500     | Tags, status chips           |

### Typography Rules

- Line height: `1.5` for body, `1.2–1.3` for headlines
- Letter spacing: slightly loosened for all-caps labels (`0.06em`)
- Numbers and stats are often set in a slightly larger, bolder weight than surrounding text to draw the eye

---

## 4. Spacing System

Uses an **8px base grid** throughout.

| Token      | Value |
| ---------- | ----- |
| `space-1`  | 4px   |
| `space-2`  | 8px   |
| `space-3`  | 12px  |
| `space-4`  | 16px  |
| `space-5`  | 20px  |
| `space-6`  | 24px  |
| `space-8`  | 32px  |
| `space-10` | 40px  |
| `space-12` | 48px  |
| `space-16` | 64px  |

- Card internal padding: `24px` (space-6) on desktop, `16px` on mobile
- Section spacing: `48–64px` between major sections
- Component gaps (grid gutters): `16–20px`

---

## 5. Border Radius

| Context              | Radius |
| -------------------- | ------ |
| Large cards / modals | `16px` |
| Standard cards       | `12px` |
| Buttons (primary)    | `8px`  |
| Small chips / badges | `6px`  |
| Avatar / circular    | `50%`  |
| Input fields         | `8px`  |

Avoid pill-shaped buttons — keep radii moderate, not fully rounded.

---

## 6. Layout & Grid

### Page Structure

```
┌─────────────────────────────────────────────┐
│  Top Nav / Header (fixed, ~56–64px tall)    │
├─────────────────────────────────────────────┤
│  Hero / Banner row (optional, full-width)   │
├───────────────────────┬─────────────────────┤
│  Main content area    │  Sidebar (optional) │
│  (fluid, max ~1200px) │  (~280–320px fixed) │
└───────────────────────┴─────────────────────┘
```

### Content Grid

- Max content width: `1200px`, centered, with `24px` side padding
- Responsive column grid: 12-column with `16–20px` gutters
- Common patterns:
  - Stats row: 3–4 equal columns
  - Feature grid: 2-col or 3-col cards
  - Detail view: 2/3 main + 1/3 sidebar

### Card Layout Pattern

Cards are the primary building block. A standard card contains:

```
┌─────────────────────────────────┐
│  [Icon or label]    [Badge/tag] │  ← 16px top padding
│                                 │
│  Primary metric or content      │  ← Large, prominent
│  Secondary label or description │  ← Smaller, muted
│                                 │
│  [Action or sub-detail row]     │  ← 16px bottom padding
└─────────────────────────────────┘
```

---

## 7. Component Patterns

### Cards

```css
.card {
  background: #1a1c24;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 20px 24px;
  position: relative;
  overflow: hidden; /* clips inner glow effects */
}

/* Optional: hover lift */
.card:hover {
  border-color: rgba(255, 255, 255, 0.14);
  transform: translateY(-2px);
  transition: all 0.2s ease;
}
```

### Stat / Metric Cards

- Large number (28–40px, bold) as the focal point
- Label above or below in muted secondary color
- Optional trend indicator (up/down arrow + percentage) using accent colors
- Thin divider or separator between metric and sub-detail

### Buttons

**Primary:**

```css
.btn-primary {
  background: linear-gradient(135deg, #4a9eff, #8b5cf6);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 600;
  font-size: 14px;
}
```

**Secondary / Ghost:**

```css
.btn-secondary {
  background: transparent;
  color: #9ca3af;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  padding: 10px 20px;
}
.btn-secondary:hover {
  border-color: rgba(255, 255, 255, 0.25);
  color: #f0f2f8;
}
```

### Badges / Tags / Chips

- Small, rounded (`6px`), with subtle background tint
- Background is typically a `10–15%` opacity version of the tag's accent color
- Example: blue tag = `background: rgba(74,158,255,0.12)`, `color: #4A9EFF`
- Font size: `11–12px`, medium weight

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  background: rgba(74, 158, 255, 0.12);
  color: #4a9eff;
}
```

### Navigation / Header

- Fixed top bar, dark background matching page bg or slightly different elevation
- Logo left, navigation links center or right
- Height: `56–64px`
- Nav links: no underlines, slightly muted color that lightens to white on hover/active
- Active link may have a bottom border accent or a background pill

### Progress Bars / Metrics

- Thin (`6–8px` tall), fully rounded (`9999px` radius)
- Track: `rgba(255,255,255,0.08)`
- Fill: accent gradient or solid accent color
- Often shown in cards alongside stat numbers

### Dividers

- `1px solid rgba(255,255,255,0.08)` — very subtle
- Never use heavy, opaque dividers

---

## 8. Iconography

- Line-style icons (not filled), `20–24px` default size
- Consistent `1.5px` or `2px` stroke weight
- Color inherits from parent or uses secondary text color
- Slightly softened — not completely sharp/geometric

**Recommended icon libraries:**

- Lucide Icons (matches the style well)
- Tabler Icons
- Phosphor Icons (light weight variant)

---

## 9. Visual Effects & Depth

### Layering

Use subtle `box-shadow` to create depth between layers:

```css
/* Base card */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

/* Elevated card / modal */
box-shadow:
  0 4px 24px rgba(0, 0, 0, 0.5),
  0 1px 4px rgba(0, 0, 0, 0.3);

/* Hero/feature element */
box-shadow: 0 8px 40px rgba(0, 0, 0, 0.6);
```

### Gradient Overlays

- Hero sections and CTA areas often use diagonal gradients: `linear-gradient(135deg, #1a1f3a 0%, #0f1117 100%)`
- Gradient mesh backgrounds use multiple radial gradients with low opacity overlapping

```css
/* Example gradient mesh background */
background:
  radial-gradient(
    ellipse at 20% 30%,
    rgba(74, 158, 255, 0.08) 0%,
    transparent 50%
  ),
  radial-gradient(
    ellipse at 80% 70%,
    rgba(139, 92, 246, 0.08) 0%,
    transparent 50%
  ),
  #0f1117;
```

### Glass / Frosted Effect (used sparingly)

```css
.glass-surface {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

---

## 10. Motion & Animation

- Transitions: `0.15–0.25s ease` for hover states
- Page-level entrance: elements fade in with a subtle upward drift (`translateY(8px)` → `translateY(0)`, `opacity: 0` → `1`)
- Stagger child elements with `animation-delay` increments of `60–100ms`
- Counter/number animations: count up from 0 to final value over ~800ms with `easeOut`
- Avoid flashy or distracting animations — motion is used for feedback, not spectacle

```css
@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeSlideIn 0.3s ease forwards;
}
```

---

## 11. Data Visualization Style

Charts and graphs match the dark-mode aesthetic:

- Chart backgrounds: transparent (inherit card background)
- Grid lines: `rgba(255,255,255,0.06)` — barely visible
- Axis labels: secondary text color, `12px`
- Line charts: `2px` stroke, uses accent gradient
- Area charts: gradient fill from accent color → transparent
- Bar charts: use accent color with slight rounding on bar tops
- Tooltip: dark card style (`#22253A` bg, white text, `border-radius: 8px`)

---

## 12. Responsive Behavior

| Breakpoint    | Layout Change                              |
| ------------- | ------------------------------------------ |
| `< 640px`     | Single column, stack all cards             |
| `640–1024px`  | 2-column grids, condensed header           |
| `1024–1280px` | Standard layout, possible sidebar collapse |
| `> 1280px`    | Full layout, max-width container centered  |

- Navigation collapses to hamburger at mobile
- Metric cards stack 2×2 before going 1-column
- Side padding: `16px` mobile, `24px` tablet, `auto` (constrained by max-width) desktop

---

## 13. AI / Chat Interface Patterns (if applicable)

When the UI includes an AI interaction layer (prompt input, response area):

- Input bar: fixed bottom or top, full width, elevated surface
- Prompt input: large, borderless text area inside a card container
- Send button: icon-only or small labeled, uses primary accent
- Response bubbles: slightly differentiated surfaces (user vs assistant)
- Code blocks in responses: monospace font, darker inset background, syntax highlighted with accent colors
- Streaming text: cursor blink animation while generating

---

## 14. CSS Custom Properties Template

Use this as a starter variables file when scaffolding a new project:

```css
:root {
  /* Backgrounds */
  --bg-base: #0f1117;
  --bg-surface: #1a1c24;
  --bg-raised: #1e2030;
  --bg-overlay: #252840;

  /* Borders */
  --border-default: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(255, 255, 255, 0.15);
  --border-active: rgba(74, 158, 255, 0.4);

  /* Text */
  --text-primary: #f0f2f8;
  --text-secondary: #9ca3af;
  --text-muted: rgba(255, 255, 255, 0.35);

  /* Accents */
  --accent-blue: #4a9eff;
  --accent-purple: #8b5cf6;
  --accent-green: #34d399;
  --accent-amber: #f59e0b;
  --accent-red: #ef4444;

  /* Gradients */
  --gradient-primary: linear-gradient(
    135deg,
    var(--accent-blue),
    var(--accent-purple)
  );

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;

  /* Shadows */
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-raised: 0 4px 24px rgba(0, 0, 0, 0.5);
  --shadow-glow-blue: 0 0 30px rgba(74, 158, 255, 0.12);
  --shadow-glow-purple: 0 0 30px rgba(139, 92, 246, 0.12);
}
```

---

## 15. Quick Reference Checklist for AI Code Generation

When prompting an AI to build UI in this style, include these constraints:

- [ ] Dark mode only — base background `#0F1117`, surfaces `#1A1C24`
- [ ] Card-centric layout, `border-radius: 12px`, `border: 1px solid rgba(255,255,255,0.08)`
- [ ] Primary accent: electric blue `#4A9EFF`, secondary: soft purple `#8B5CF6`
- [ ] Gradient used on key CTA elements: `linear-gradient(135deg, #4A9EFF, #8B5CF6)`
- [ ] Typography: clean geometric sans, 14–16px body, near-white primary text
- [ ] 8px base spacing grid
- [ ] Subtle `box-shadow` for depth, no hard drop shadows
- [ ] Hover states: border lightens, slight translateY(-2px) on cards
- [ ] Icons: 20–24px line style, `1.5px` stroke
- [ ] Transitions: `0.2s ease`
- [ ] No stark white backgrounds — everything lives on dark surfaces
- [ ] Badges: small, color-tinted background at `~12%` opacity with matching text color
- [ ] Stat/metric numbers: large (28–40px), bold, focal point of their card
