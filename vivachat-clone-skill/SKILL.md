---
name: vivachat-landing-clone
description: Build a pixel- and motion-accurate recreation of the VivaChat-style animated SaaS landing page (scroll-pinned sections, sticky-stacked benefit cards, scroll-scrubbed text reveals, infinite-loop video columns, gradient pricing cards). Use this skill whenever the user asks to "build the VivaChat site," "recreate that animated landing page," wants a GSAP ScrollTrigger-driven marketing site with pinned sections and text-reveal scroll effects, or references the specific sections described in references/sections.md (hero with auto-scrolling chat cards, sticky benefit stack, orbit social icons, gradient pricing cards). Also use this any time the user wants general guidance on building scroll-scrubbed/pinned landing page animations in this exact style, even if they don't name VivaChat directly.
---

# VivaChat Landing Page Clone

A complete build spec for recreating an animated, scroll-choreographed SaaS marketing site: a loading-screen logo morph, a hero with independently-looping video-chat card columns, scroll-scrubbed text reveals with highlight wipes, pinned/sticky-stacked feature sections, a word marquee, testimonial carousel, and gradient pricing cards.

This skill exists because this style of site is **90% animation engineering, 10% layout** — the visual layout is a standard SaaS page, but getting the scroll choreography right (pinning, scrubbing, staggered reveals) is where all the real work is. Read this skill fully before writing code; don't start animating before the static layout and design tokens are locked in, or you'll redo timing work when spacing shifts.

## Before you start: stack decision

Build this with **GSAP + ScrollTrigger**. This is non-negotiable for fidelity — the pinned sections, scroll-scrubbed word reveals, and chained card-stacking effects all require `pin: true` and `scrub: true` behavior that plain CSS scroll-snap or Intersection Observer can't replicate cleanly. If the project is React, use `@gsap/react`'s `useGSAP` hook. If it's plain HTML, load GSAP + ScrollTrigger from a CDN.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

Do **not** attempt this with `animation-timeline: scroll()` CSS scroll-driven animations alone — browser support and pin behavior aren't reliable enough yet for the stacked-card effect specifically.

## Design tokens (use these exact values)

Full color/type/spacing reference: see `references/design-tokens.md`. Load it before building any component — every section reuses the same handful of tokens (one button style, one card radius, one highlight-pill component, one icon-chip component), so get the tokens right once rather than re-deriving them per section.

Quick summary:
- Page background: `#FFFFFF` (sections alternate `#FFFFFF` and `#F1F2F0`)
- Text: headline `#252525`, body `#6B7280`
- Primary button: `#0B0B0B` bg, white text, full pill radius, 44px height
- Secondary button: `#F4F4F4` bg, dark text, full pill radius
- Card/section radius: 24–32px throughout — never mix radii
- Brand gradient (used in loading screen AND pricing Pro card — this is a deliberate callback, keep it): lime `#C4FF9E` → mint `#C6F0AF` → pale blue `#C3E1DC`, ~100–110° angle
- Highlight-pill (used ~6 times across the page on headline phrases): pale green/blue gradient background, low-opacity, ~6px radius — **build this once as a reusable component**, not bespoke per section

## Layout overview

Single-column page, full-bleed sections, alternating white/`#F1F2F0` backgrounds for visual rhythm. Section side padding is consistently **64–72px** at 1440px viewport width (scale proportionally at other breakpoints, don't fix it in px). Section corner-radius/card-radius is 24–32px everywhere a card or panel exists.

Section order top to bottom:
1. Loading screen (logo morph intro)
2. Navbar (sticky, glass pill nav)
3. Hero (split layout, looping video-chat card columns)
4. Scroll-reveal interstitial #1 ("Even if your operator is reluctant...")
5. Scroll-reveal interstitial #2 ("Introducing Live Chat Of The Future")
6. Smart AI / Video pinned split-reveal
7. Our Benefits — sticky-stacked card sequence
8. Word marquee band
9. Reviews feature block
10. All Channels orbit section
11. AI stat + phone mockup
12. Testimonials carousel
13. Pricing
14. Footer / closing CTA

Full per-section markup structure, exact measurements, and copy: see `references/sections.md`.

## Animation system — read this before building any single section

Every scroll effect on this page is one of exactly **five reusable patterns**. Identify which pattern a section uses before building it; don't write bespoke animation code per section when one of these five covers it. Full GSAP code for each pattern is in `references/animations.md`.

| Pattern | Used in | Core technique |
|---|---|---|
| **A. Idle infinite loop** | Hero video-chat columns, marquee band | `gsap.timeline({repeat:-1})` translating duplicated content, runs independent of scroll position |
| **B. Word/line opacity scrub** | Both interstitials, AI stat headline | `ScrollTrigger.create({scrub:true})` driving opacity 0.15→1 per `<span>`-wrapped word, staggered by scroll progress not time |
| **C. Highlight-wipe** | Every highlighted phrase (6+ uses) | `clip-path: inset(0 100% 0 0)` → `inset(0 0 0 0)`, scrubbed, one reusable component |
| **D. Pinned scale/position reveal** | Smart AI/Video split, App phone mockup | `pin:true` timeline scaling a center element from 0→1 while flanking text translates outward |
| **E. Chained sticky-stack** | Our Benefits cards | Sequential `pin:true` ScrollTriggers, each card's `end` becomes the next card's `start`, with the incoming card translating up and slightly scaling from 95%→100% |

Get pattern E right first — it's the hardest and most visually important effect on the page. Everything else is a variation on B or C.

## Glassmorphism — where it's used (and where it ISN'T)

This is a common over-application mistake: glassmorphism appears in exactly **two places** on this page, not throughout:
1. The sticky nav pill (`backdrop-filter: blur(12px)`, `background: rgba(255,255,255,0.6)`, subtle inset border) — content scrolls visibly underneath it.
2. The small circular icon buttons that float on top of photos inside the video-chat cards (T-icon, headset icon, X-close icon) — same blur treatment, smaller scale (~32-40px circles).

Do not apply blur/glass treatment to the benefit cards, pricing cards, or testimonial cards — those are flat, opaque, solid-color panels. Keeping glass restricted to these two contexts is what makes it read as intentional rather than decorative noise.

## Build order (recommended)

1. Design tokens + global layout shell (no animation yet) — get every section's static state pixel-correct first.
2. Navbar glass pill + sticky behavior.
3. Hero static layout, then layer in Pattern A (looping columns) and the loading-screen morph last (it's cosmetic and easiest to fake/skip during development).
4. Build the reusable highlight-pill component (Pattern C) since 6+ sections depend on it.
5. Build the two scroll-reveal interstitials using Pattern B.
6. Build Our Benefits using Pattern E — budget the most time here.
7. Remaining sections (marquee, reviews, orbit, phone mockup, testimonials, pricing, footer) are comparatively standard — testimonials carousel just needs a `setInterval` content swap with a crossfade, not ScrollTrigger.

## Honest scope note

The stacked-card pinning (Pattern E), the pinned scale-reveal (Pattern D), and the marquee are genuinely expensive to build and maintain — ScrollTrigger pin math breaks easily across breakpoints and needs `ScrollTrigger.refresh()` calls on resize/content-load. If this is for a real production client site rather than a portfolio/learning exercise, consider cutting the marquee and orbit sections (lowest persuasive value, highest relative build cost) and keeping the hero, benefits stack, and pricing — that covers most of the page's actual conversion value for a fraction of the maintenance burden. Flag this tradeoff to the user if they haven't already decided.

## Reference files

- `references/design-tokens.md` — full color palette, type scale, spacing scale, component specs (buttons, pills, cards, icon chips)
- `references/sections.md` — section-by-section markup structure, exact copy, image aspect ratios, per-section padding
- `references/animations.md` — full GSAP code for all five animation patterns, including easing curves and durations
