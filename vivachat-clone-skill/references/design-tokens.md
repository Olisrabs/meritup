# Design Tokens

All values measured by pixel-sampling captured frames of the source site, then scaled proportionally to a 1440px desktop design width. Treat px values as a baseline at 1440px and scale fluidly (clamp() or rem-based scaling) for other breakpoints — nothing on this page should be a fixed px value that breaks on resize.

## Color palette

### Neutrals
| Token | Hex | Usage |
|---|---|---|
| `--bg-white` | `#FFFFFF` | primary section background |
| `--bg-soft` | `#F1F2F0` | alternating section background |
| `--text-headline` | `#252525` | all headline text |
| `--text-body` | `#6B7280` | paragraph/body copy |
| `--text-nav-inactive` | `#BABABA` | inactive nav links |
| `--pill-neutral` | `#F4F4F4` | secondary buttons, neutral tag pills, contact-us pill |
| `--btn-primary-bg` | `#0B0B0B` | primary CTA buttons |
| `--btn-primary-text` | `#FFFFFF` | primary CTA text |

### Brand gradient (used in loading screen + Pro pricing card — intentional callback, don't break this link)
| Stop | Hex |
|---|---|
| Start (left) | `#C4FF9E` |
| Mid | `#C6F0AF` |
| End (right) | `#C3E1DC` |

CSS: `background: linear-gradient(105deg, #C4FF9E 0%, #C6F0AF 50%, #C3E1DC 100%);`

### Highlight-pill gradient (the reusable text-highlight component)
Pale, low-opacity version of the brand gradient:
```css
.highlight-pill {
  background: linear-gradient(100deg, rgba(196,255,158,0.45), rgba(195,225,220,0.45));
  border-radius: 6px;
  padding: 0 4px;
}
```
Used on: "Live Chat" (morphs into a speech-bubble shape, see animations.md), "our AI expresses engagement" (wipe-in only, no shape morph), "All Channels", "80%" + "questions" (two separate pills in one headline), "Increase" + "Reviews", "Benefits" (in "Explore All Benefits" link), "Stories" (in "Explore All Stories" link).

### Status/accent dot
| Token | Hex |
|---|---|
| `--status-dot-green` | `#CBF2B3` |

### Icon-chip gradient (vertical stack of circular icons in hero + reviews section)
Pastel green-to-blue radial/linear gradient per chip, ~40–48px diameter circles:
```css
.icon-chip {
  width: 44px; height: 44px; border-radius: 50%;
  background: linear-gradient(160deg, #DFF7CD, #BFE3DC);
  display: flex; align-items: center; justify-content: center;
}
```

## Typography

Font family: a geometric grotesque sans — closest free matches are **Inter**, **General Sans**, or **Switzer**. Use weight range 400–600 only (no light/thin, no 700+/black — this page never goes heavier than semibold).

| Token | Size (1440px baseline) | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| H1 (hero headline) | 60–64px | 500–600 | 1.05 | -0.02em |
| H2 (section headline, e.g. "Our Benefits", "Pricing Plans") | 44–48px | 500 | 1.1 | -0.01em |
| H3 (benefit card headline, "Elevate Engagement") | 28–32px | 500 | 1.15 | normal |
| Body | 16px | 400 | 1.5 | normal |
| Small/label (eyebrow pills, tags) | 13–14px | 400–500 | 1.3 | normal |
| Marquee words | 32px | 500 | 1.0 | 0.02em (uppercase, slightly wide tracking) |

Body copy frequently uses **inline weight mixing** — part of a sentence in `--text-body` at weight 400, a clause in `--text-headline` color at weight 500–600. This is manual rich-text styling, not a single CSS class — wrap emphasized spans individually:
```html
<p>Instant, real-time <strong>communication, providing both visual connection</strong> and <strong>immediate answers</strong> to customers inquiries.</p>
```

## Spacing scale

Base unit: 4px. Use this scale everywhere — don't introduce arbitrary spacing values.
`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 72 / 96 / 128`

| Context | Value |
|---|---|
| Section horizontal padding (1440px) | 64–72px |
| Section vertical padding | 96–128px |
| Card internal padding | 48px |
| Gap between stacked benefit-card rows | 24px |
| Gap in icon-chip vertical stack | 16px |
| Button horizontal padding | 24px (plus the trailing icon circle adds ~36px) |
| Button height | 44px |
| Gap between primary/secondary CTA pair | 16px |

## Component specs

### Primary button
```css
.btn-primary {
  height: 44px;
  background: #0B0B0B;
  color: #fff;
  border-radius: 999px;
  padding: 0 8px 0 24px;
  display: inline-flex; align-items: center; gap: 12px;
  font-size: 15px; font-weight: 500;
}
.btn-primary .icon-circle {
  width: 32px; height: 32px; border-radius: 50%;
  background: #fff; color: #0B0B0B;
  display: flex; align-items: center; justify-content: center;
}
```
The trailing arrow icon always sits in its own white circle inset within the black pill — this is consistent across every primary CTA on the page (hero, footer, "Get The App", etc). Build it as one component, reuse everywhere.

### Secondary button
Same shape, `background: #F4F4F4`, `color: #252525`, no icon-circle background swap (icon stays inline, same color as text).

### Tag/eyebrow pill
```css
.tag-pill {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  background: #F4F4F4;
  font-size: 13px; color: #252525;
}
.tag-pill.active { background: var(--highlight-pill-gradient); }
```

### Card / section panel
```css
.panel {
  border-radius: 28px;
  background: #F1F2F0; /* or #fff depending on context */
  padding: 48px;
}
```
Radius is consistent at 24–32px across hero panels, benefit cards, pricing cards, testimonial cards, and image cards (image cards trend toward the lower end, ~24px; large content panels toward 28–32px).

### Image cards (video-chat portraits in hero/feature sections)
- Aspect ratio: 3:4 portrait
- Width: ~220px at 1440px viewport
- Border-radius: 24px
- `object-fit: cover`
- Drop shadow: `box-shadow: 0 12px 32px rgba(0,0,0,0.12)`
- No visible border — radius + shadow only, no stroke

### Glass nav pill
```css
.nav-pill {
  background: rgba(255,255,255,0.65);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 999px;
  padding: 8px 20px;
  display: flex; gap: 28px; align-items: center;
}
```

### Glass icon button (floats on photos)
```css
.glass-icon-btn {
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(255,255,255,0.55);
  backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: center;
}
```
