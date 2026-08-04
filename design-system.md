# Adnan Pharmacy — Design System

Extracted from `src/app/globals.css`. Source of truth for all design tokens used across the site.

## Colors

### Primary — Navy Blue
| Token | Value |
|---|---|
| `--color-primary` | `#1B2B5E` |
| `--color-primary-dark` | `#14204A` |
| `--color-primary-light` | `#2D4480` |

### Secondary — Green
| Token | Value |
|---|---|
| `--color-secondary` | `#3BAA35` |
| `--color-secondary-dark` | `#2E8A29` |
| `--color-secondary-light` | `#E8F5E7` |

### Background
| Token | Value |
|---|---|
| `--color-bg` | `#F8F9FA` |
| `--color-bg-white` | `#FFFFFF` |
| `--color-bg-section` | `#F0F4F8` |

### Surface
| Token | Value |
|---|---|
| `--color-surface` | `#FFFFFF` |
| `--color-surface-hover` | `#F5F8FF` |

### Border
| Token | Value |
|---|---|
| `--color-border` | `#E2E8F0` |
| `--color-border-focus` | `#3BAA35` |

### Text
| Token | Value |
|---|---|
| `--color-text-primary` | `#1A202C` |
| `--color-text-secondary` | `#4A5568` |
| `--color-text-muted` | `#718096` |
| `--color-text-inverse` | `#FFFFFF` |

### States
| Token | Value |
|---|---|
| `--color-success` | `#3BAA35` |
| `--color-error` | `#E53E3E` |
| `--color-warning` | `#D69E2E` |
| `--color-info` | `#3182CE` |

## Fonts

- **Family:** `IBM Plex Sans Arabic` (self-hosted `.ttf`, loaded via `@font-face` for performance), falling back to `system-ui, sans-serif`.
- **Weights available:** `400` (Regular), `600` (SemiBold).
- **`font-display: swap`** on both faces.
- **Direction:** `rtl` (set on `<body>`).

## Typography

| Element | Font size | Font weight | Line height | Color |
|---|---|---|---|---|
| `h1` | `clamp(1.75rem, 4vw, 2.5rem)` | 600 | 1.3 | `--color-primary` |
| `h2` | `clamp(1.5rem, 3vw, 2rem)` | 600 | 1.3 | `--color-primary` |
| `h3` | `1.25rem` | 600 | 1.3 | `--color-primary` |
| `h4`–`h6` | `1rem` | 600 | 1.3 | `--color-primary` |
| `body` | `1rem` | 400 | 1.8 | `--color-text-primary` |
| `p` | inherited | inherited | 1.8 | `--color-text-secondary` |

## Border Radius

| Token | Value |
|---|---|
| `--radius-sm` | `6px` |
| `--radius-md` | `10px` |
| `--radius-lg` | `16px` |
| `--radius-xl` | `24px` |
| `--radius-full` | `9999px` (pill/circle) |

## Shadows

| Token | Value |
|---|---|
| `--shadow-card` | `0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)` |
| `--shadow-hover` | `0 4px 16px rgba(27,43,94,0.10), 0 1px 4px rgba(0,0,0,0.06)` |
| `--shadow-lg` | `0 8px 32px rgba(27,43,94,0.08)` |
| `--shadow-header` | `0 1px 0px rgba(0,0,0,0.08)` |

## Spacing

| Token | Value |
|---|---|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `20px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-10` | `40px` |
| `--space-12` | `48px` |
| `--space-16` | `64px` |
| `--space-20` | `80px` |
| `--space-24` | `96px` |

## Transitions

| Token | Value |
|---|---|
| `--transition-fast` | `150ms ease` |
| `--transition-base` | `200ms ease` |
| `--transition-slow` | `300ms ease` |

## Layout / Container

| Token | Value |
|---|---|
| `--container-max` | `1200px` |
| `--container-padding` | `24px` |

## CSS Variables — Full Reference

All tokens are declared on `:root` in `src/app/globals.css`:

```css
:root {
  /* Primary */
  --color-primary: #1B2B5E;
  --color-primary-dark: #14204A;
  --color-primary-light: #2D4480;

  /* Secondary */
  --color-secondary: #3BAA35;
  --color-secondary-dark: #2E8A29;
  --color-secondary-light: #E8F5E7;

  /* Background */
  --color-bg: #F8F9FA;
  --color-bg-white: #FFFFFF;
  --color-bg-section: #F0F4F8;

  /* Surface */
  --color-surface: #FFFFFF;
  --color-surface-hover: #F5F8FF;

  /* Border */
  --color-border: #E2E8F0;
  --color-border-focus: #3BAA35;

  /* Text */
  --color-text-primary: #1A202C;
  --color-text-secondary: #4A5568;
  --color-text-muted: #718096;
  --color-text-inverse: #FFFFFF;

  /* States */
  --color-success: #3BAA35;
  --color-error: #E53E3E;
  --color-warning: #D69E2E;
  --color-info: #3182CE;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;

  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-card: 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04);
  --shadow-hover: 0 4px 16px rgba(27,43,94,0.10), 0 1px 4px rgba(0,0,0,0.06);
  --shadow-lg: 0 8px 32px rgba(27,43,94,0.08);
  --shadow-header: 0 1px 0px rgba(0,0,0,0.08);

  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;

  /* Container */
  --container-max: 1200px;
  --container-padding: 24px;
}
```
