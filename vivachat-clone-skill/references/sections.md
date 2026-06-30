# Section-by-Section Build Spec

Each section below lists: layout structure, exact/approximate copy, image specs, and which animation pattern (A–E, defined in `animations.md`) it uses. Build in the order listed in SKILL.md, not necessarily top-to-bottom — get the highlight-pill and button components done before you hit the sections that depend on them repeatedly.

---

## 1. Loading screen

- Full-viewport, fixed position, `z-index: 100`, removed/faded out after ~2.5s or on first scroll/interaction (whichever comes first — don't trap the user if they scroll early).
- Background: brand gradient (see design-tokens.md), diagonal ~105°.
- Centered glass pill, label "VivaChat" — starts at ~10% opacity, animates to a solid white pill with dark text over ~0.3s partway through the sequence.
- Optional flourish (skip this first, it's the lowest-value part of the build): a placeholder logotype animates in via extreme `scaleX`/`skewX` squash-to-readable, ~0.6s, `power4.out` ease. This is decorative and not worth building before everything else works.
- On complete: `gsap.to('.loader', {autoAlpha: 0, duration: 0.5, onComplete: () => loader.remove()})`.

---

## 2. Navbar

- Sticky, `position: sticky; top: 0;`, sits above all content, transparent section background behind it (the glass pill background does the visual work, not the navbar bar itself).
- Layout: logo + status dot (far left) — "Contact Us" pill immediately to its right (NOT far-right, this is a deliberate non-standard placement, keep it) — centered glass nav-pill group with 6 links + leading house icon — no right-aligned CTA (CTAs live in hero body, not nav).
- Active link gets a sliding background indicator inside the pill (classic Framer-style nav) — implement with a single absolutely-positioned highlight div that animates `x`/`width` to match the hovered/active link's bounding box via `gsap.to`.

Links: `About / Benefits / App / Features / Reviews / Plans`

---

## 3. Hero

**Pattern: A (looping image columns) for the right side. Static for the left.**

Layout: 2-column, ~55/45 split, left column vertically centered, generous left padding (64-72px).

Left column, top to bottom:
- H1, 3 lines: "Empower Connections with VivaChat"
- Body paragraph with inline bold spans (see design-tokens.md typography section for the exact markup pattern): "Instant, real-time **communication, providing both visual connection** and **immediate answers** to customers inquiries."
- CTA row: primary "Try Out" button + secondary "Learn More" button, 16px gap
- Vertical icon-chip stack (heart / headset / two-way-arrow icons in pastel circles) + plain outlined "+" circle below them — positioned to the right of the CTA row, not below it
- Bottom row: 3 tag pills ("High-performance" neutral, "Revolutionary" highlighted, "Progressive" neutral) + "vivachat.com" with link icon, right-aligned

Right column: two parallel vertical stacks of portrait video-chat cards (220px wide, 3:4 ratio, 24px radius — see design-tokens.md Image Cards spec). Each card shows a photo of a person on a call with floating glass icon buttons (close X, headset, text-toggle "T") top-right, and either a black "Ask Me A Question" pill at the bottom-left or a chat-input bar mockup ("Type here..." + mic icon).

Build the looping columns as Pattern A: duplicate the card list, stack the duplicate directly below the original, animate `translateY` from `0` to `-50%` on an infinite linear loop — this creates a seamless infinite scroll illusion. Run the two columns at slightly different speeds and offset their start positions so they don't look synchronized.

---

## 4. Scroll-reveal interstitial #1

**Pattern: B (word opacity scrub) + C (highlight wipe)**

Full-width, pinned section, `#F1F2F0` background. Centered, max-width ~720px.

Copy: "Even if your operator is reluctant to appear on camera, **our AI expresses engagement** through text or facial expressions."

The bolded clause gets the highlight-pill wipe treatment (Pattern C), scrubbed to trigger after the surrounding words have already revealed via Pattern B. Two small icon glyphs (globe, video-icon) fade in above the sentence at the same scroll checkpoint, staggered slightly before the text.

---

## 5. Scroll-reveal interstitial #2

**Pattern: B + C, with a shape-morph variant**

Copy: "Introducing **Live Chat** Of The Future"

Centered, ~44-48px. "Live Chat" gets the highlight-pill, but this one additionally **morphs its shape into a chat-bubble** (grows a small triangular tail at the bottom-left as you continue scrolling past the wipe-in). Don't try to do this with `border-radius` alone — interpolate either:
- an SVG path (rounded-rect path morphing to rounded-rect-with-tail path) via GSAP's `MorphSVGPlugin` if available, or
- a pseudo-element triangle (`::after`) that fades/scales in from `0` to `1` once the wipe completes, positioned absolutely at the bubble's bottom-left corner. This is the cheaper, dependency-free approach — use this unless you already have MorphSVG licensed.

---

## 6. Smart AI / Video pinned split-reveal

**Pattern: D**

Pin the section. Two large words start near each other/smaller scale; a center vertical media card (the "Say Hello" video card) scales from 0 to full size between them while the words translate outward to their final positions (far left / far right).

Once settled, 3 floating cards stagger in around the center card (`y: 20→0, opacity: 0→1`, 0.1s stagger each):
- top-left avatar stack + "40% Increase in customer satisfaction" stat card
- top-right "Face-to-face experience" badge
- bottom-right "Chatbots and Virtual Assistants" badge with a small photo

Center card: portrait video, glass icon buttons top-right (T toggle, headset), black "Say Hello" pill + green mic-button along the bottom edge. Small "smart ai features" eyebrow pill with sparkle icon centered above the whole composition.

Sub-headline (below "Smart AI" on the left): "Seamless integration ensures that visitors perceive it as a live video chat experience." — this also uses Pattern B (line-by-line opacity scrub) as the section pins.

---

## 7. Our Benefits — sticky-stacked card sequence

**Pattern: E — budget the most build time here.**

Header row: "unlocking value" eyebrow pill (left) — "Our Benefits" H2 (center) — "Explore All **Benefits**" link with highlight-pill on the last word (right).

4 benefit rows, identical structure, each ~chained pin:
- Left panel (white bg): small icon in a black circle (~40px), category tag pill, 2-3 line body paragraph
- Right panel (`#F1F2F0` bg): "We are here to" label (small, grey) + bold H3 headline

Content for the 4 rows:
1. Icon: heart-handshake. Tag: "clients engagement". Body: "The inclusion of an on-site chat feature ensures that your clients remain engaged and are more likely to take the desired action before leaving the website." Headline: "Elevate Engagement"
2. Icon: chart/performance. Tag: "website performance". Body: "The website is poised to experience an elevation in both repeat visitation rates and purchase frequency, fostering a heightened level of user engagement and loyalty." Headline: "Elevate Your Website Performance"
3. Icon: cart. Tag: "reduced purchase refusals". Body: "The occurrence of purchase and order refusals is anticipated to decrease, resulting in a more streamlined and efficient transaction process." Headline: "Reduce purchase refusals"
4. Icon: presentation/chart-board. Tag: "data acquisition". Body: "The business is poised to enhance its data acquisition efforts by collecting a more comprehensive set of visitor contact information." Headline: "Optimize Data Acquisition"

Implementation: each card's ScrollTrigger `start` is the previous card's `end`. Each card pins (`pin: true`) for the duration of its scroll range while the *next* card's right-hand panel translates up from `y: 100%` to `y: 0` with a scale from `0.95` to `1`, sliding visually over/behind the currently-pinned card before it settles into its own row and unpins the previous one. Test this thoroughly at different viewport heights — pin ranges in px will break on resize unless you recalculate them (`ScrollTrigger.refresh()` on resize, or define ranges in relative units).

---

## 8. Word marquee band

**Pattern: A**

Full-width white strip. Words: `INNOVATIVE → REVOLUTIONARY → EMPOWERING → INNOVATIVE...` (loop), arrow glyph separator between each. Centered word is bold/black (`#252525`), flanking words are light grey (`#BABABA`) — implement the focus effect by detecting which word is nearest the viewport center each frame (or simpler: fix it so the center position always shows the "active" styled word via a masked overlay rather than tracking scroll position).

Uppercase, 32px, weight 500, letter-spacing 0.02em.

---

## 9. Reviews feature block

**Pattern: C for headline, static fanned deck for cards**

Headline: "**Increase** The Number Of **Reviews**" — two separate highlight-pills.

Left: body paragraph + 3-icon chip row (reuse the hero's icon-chip component).
Body: "Artificial intelligence aids your operators by learning from your website, training on support dialogues, and integrating with ChatGPT 4.0. Allow automation to address common queries across all channels."

Right: portrait video card (reuse component from section 6) + floating stat card ("60% Increase in customer's reviews", trend-up icon) + a **fanned stack** of 3 Google review cards. The fanned stack is static — no animation needed, just layered siblings with incrementing `rotate()` and `translate()` and decreasing `z-index`/opacity per layer:
```css
.review-card:nth-child(1) { transform: rotate(0deg) translateY(0); z-index: 3; }
.review-card:nth-child(2) { transform: rotate(-3deg) translateY(8px); z-index: 2; opacity: 0.85; }
.review-card:nth-child(3) { transform: rotate(-6deg) translateY(16px); z-index: 1; opacity: 0.7; }
```
Top card content: 5-star row, "Miranda Bradson" name, quote ("Their services are amazing, our reviews have grown from 20 to 400!"), "View details" link. Plus a black "Leave us a review!" pill with Google logo overlaid on the photo itself.

---

## 10. All Channels orbit section

**Pattern: static positioning — do not build a rotation animation unless you've separately confirmed motion on the live source (frame analysis didn't show rotation between consecutive frames at the same scroll position).**

Left: concentric dashed circles (2-3 rings), social platform icon bubbles (Instagram, WhatsApp, Twitter, Discord, Facebook) positioned at fixed angles around the rings, "VivaChat" wordmark + highlight-pill centered in the innermost circle.

Right: H2 "**All Channels** In One App" (highlight-pill on first two words) + body copy + two CTAs ("Get The App" primary, "Learn More" secondary).

Body: "Operators streamline message management in a unified application, the Operator's Workspace. This aggregator consolidates messages from various sources, improving response times by eliminating the need to switch between multiple windows and sites." (also uses Pattern B line-reveal as it scrolls into view)

---

## 11. AI stat + phone mockup

**Pattern: B + C for headline. Static for phone mockup.**

Headline: "Resolve up to **80%** of customer **questions** with AI" — two separate highlight pills.
Body: same automation copy as section 10's sub-text is similar in tone — reuse the AI/ChatGPT integration message, don't duplicate verbatim, vary the phrasing.

This whole block sits inside a framed white inset panel (breaks from the section's `#F1F2F0` background) — this framing pattern (white panel inset within a grey section) is used here and again in the footer CTA; build it as a reusable `.framed-panel` wrapper.

Right: realistic phone mockup (black bezel, notch, ~280px wide, rounded ~36px corners) showing in-app UI (avatar stack, "Increased Efficiency" card, "ChatGPT 4.0 effective integration" card floating beside the phone, "Assistance Library" + "Today's Statistics" panels inside the screen).

---

## 12. Testimonials carousel

**Pattern: interval-based content swap, NOT scroll-driven.**

Header: "customer reviews" eyebrow pill (left) — "Trusted By People" H2 (center) — "Explore All **Stories**" link (right, highlight-pill on last word).

Single card, `#F1F2F0` bg, 2-column: left = "Customer Stories" pill + blockquote + name (bold) + title/company (grey) + vertical numbered dot pagination (1/2/3); right = full-bleed photo with glass badge icon top-right + "Explore More" pill bottom-right (reuse the same CTA-on-photo component from sections 6/9).

3 testimonials, auto-advance every ~4-5s:
1. Elara Steele, Senior VP Sales and Service, Blue Nile — "Reducing our no-show rate was important to have higher utilization of our sales team. With Freshsales, we brought it down to about 20%, and time is money."
2. Seraphina Quinn, Senior IT Operations Analyst, Alterra Mountain Company — "Freshservice is so intuitive and user-friendly. Our end-users find it very simple to raise a ticket and support agents are able to easily transfer tickets within departments."
3. Xander Frost, System Administrator, Allbirds — "We use Freshservice for everything, and that just makes it really easy—regardless of what you need as an employee—to know that you can always just go to this tool and you're going to get whatever you need."

Implementation: `setInterval` swapping quote/name/photo content + active dot state, crossfade transition (`opacity` tween, ~0.4s) between states, NOT tied to ScrollTrigger.

---

## 13. Pricing

Header: "Pricing Plans" H2, centered. "Schedule A Call" pill (phone icon) top-left.

Two cards side by side, 32px radius:

**Starter** — `#F4F4F4`-ish flat panel, cube icon, "Try VivaChat to test it in work", **$29/month**. Features: Live Video Chat (Limited), ChatGPT 4.0 Integration (No), Data Retention (4 Months), Customer Support Analytics (Basic). White circular arrow CTA, bottom-center.

**Pro** — brand gradient fill (same lime→blue gradient as the loading screen — keep this callback intentional), diamond icon, "Get the full private access to all features", **$59/month**. Features: Live Video Chat (Unlimited), ChatGPT 4.0 Integration (Yes), Data Retention (1 Year), Customer Support Analytics (Advanced). Green-tinted white circular arrow CTA, bottom-center.

Feature row pattern (both cards): leading small icon + label (left) + value (right, lighter grey weight), thin divider line between rows.

---

## 14. Footer / closing CTA

Uses the same `.framed-panel` (white-inset-within-grey-section) pattern from section 11.

Header row, asymmetric (not centered): H2 left — "Connect Instantly, Communicate Effortlessly – VivaChat!" with small globe + play icons inline — body copy + "Get Started" primary button on the right.

Below: horizontal strip of 5 photo thumbnails (reuse imagery from earlier sections — don't source new photos, this is a visual recap/texture element).

Bottom bar: `© 2023` (left) — `vivachat.com` + link icon (center) — `Terms Of Use` / `Help Center` (right).
