# Animation Patterns — Full Implementation

Five reusable patterns cover every motion effect on the page. Read the pattern definitions in SKILL.md first; this file has the actual code, durations, and easing curves for each.

---

## Pattern A — Idle infinite loop

Used for: hero video-chat columns, marquee word band.

Not scroll-driven — runs continuously regardless of scroll position. Implementation is the classic "duplicate content, translate by -50%, repeat infinitely" marquee trick.

```js
function createLoop(container, { duration = 25, direction = -1 } = {}) {
  // container must have its content duplicated once in the HTML
  // e.g. two identical <div class="track"> children inside container
  const tracks = container.querySelectorAll('.track');
  gsap.set(tracks, { yPercent: (i) => i * 100 * (direction < 0 ? 1 : -1) });
  gsap.to(tracks, {
    yPercent: `+=${100 * direction}`,
    duration,
    ease: 'none',
    repeat: -1,
  });
}

// Hero columns: two columns, slightly different speeds and start offsets
createLoop(document.querySelector('.hero-col-1'), { duration: 28, direction: -1 });
createLoop(document.querySelector('.hero-col-2'), { duration: 34, direction: -1 });
gsap.set('.hero-col-2 .track', { yPercent: 15 }); // offset so columns don't sync visually

// Marquee: horizontal version, swap yPercent for xPercent
createLoopHorizontal(document.querySelector('.marquee-track'), { duration: 18 });
```

Durations: hero columns 28-34s per loop (slow, ambient, shouldn't draw attention away from the text). Marquee: 18-22s per loop (faster, designed to be noticed).

Easing: always `'none'` (linear) for idle loops — any easing on an infinite loop creates a visible stutter at the repeat boundary.

---

## Pattern B — Word/line opacity scrub

Used for: both scroll-reveal interstitials, AI-stat headline, sub-headlines in the orbit and Smart-AI sections.

Wrap each word (or line, for longer copy) in its own `<span>`, then scrub their opacity against scroll position within a pinned trigger.

```js
function wordReveal(selector, { pin = true } = {}) {
  const el = document.querySelector(selector);
  const words = el.querySelectorAll('.word');

  gsap.set(words, { opacity: 0.15 });

  ScrollTrigger.create({
    trigger: el,
    start: 'top 75%',
    end: 'bottom 25%',
    pin: pin,
    scrub: 1, // 1 second of smoothing lag — avoids jittery 1:1 scroll binding
    onUpdate: (self) => {
      const progress = self.progress;
      words.forEach((word, i) => {
        const wordProgress = i / words.length;
        const opacity = gsap.utils.clamp(0.15, 1, gsap.utils.mapRange(
          wordProgress, wordProgress + (1 / words.length), 0, 1, progress
        ));
        gsap.set(word, { opacity });
      });
    },
  });
}
```

Simpler alternative if you don't need manual per-word math — use a single scrubbed timeline with `stagger`:

```js
gsap.timeline({
  scrollTrigger: { trigger: el, start: 'top 75%', end: 'bottom 25%', scrub: 1, pin: true },
}).fromTo(words, { opacity: 0.15 }, { opacity: 1, stagger: 0.15, ease: 'none' });
```

`scrub: 1` (not `scrub: true`) throughout this pattern — a 1-second smoothing lag reads as deliberate/cinematic, whereas `scrub: true` (instant 1:1) feels mechanical for prose reveals.

---

## Pattern C — Highlight-wipe

Used for: every highlight-pill phrase (6+ instances across the page).

Build once as a component, reuse via the `.highlight-pill` class + a data attribute marking which words it wraps.

```js
function highlightWipe(selector) {
  gsap.fromTo(
    selector,
    { clipPath: 'inset(0 100% 0 0)' },
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1,
      },
    }
  );
}

document.querySelectorAll('.highlight-pill').forEach((el) => highlightWipe(el));
```

For the one instance that additionally morphs into a chat-bubble shape ("Live Chat" in interstitial #2), chain a second step after the wipe completes:

```js
gsap.timeline({
  scrollTrigger: { trigger: '.highlight-bubble', start: 'top 60%', end: 'top 30%', scrub: 1 },
})
  .fromTo('.highlight-bubble', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'power2.out' })
  .fromTo('.highlight-bubble::after', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' });
```
(Note: GSAP can't directly target `::after` — use a real sibling `<span class="bubble-tail">` positioned absolutely instead, then target that element directly.)

---

## Pattern D — Pinned scale/position reveal

Used for: Smart AI / Video split section, phone mockup section.

```js
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.smart-ai-section',
    start: 'top top',
    end: '+=150%', // pin for 1.5x viewport heights of scroll
    pin: true,
    scrub: 1,
  },
});

tl.fromTo('.word-smart-ai', { x: 80 }, { x: 0, duration: 1, ease: 'power2.out' }, 0)
  .fromTo('.word-video', { x: -80 }, { x: 0, duration: 1, ease: 'power2.out' }, 0)
  .fromTo('.center-card', { scale: 0.3, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }, 0)
  // floating badges stagger in AFTER the center card has mostly scaled up
  .fromTo('.floating-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' }, 0.6);
```

Key timing detail: the floating badges (`0.6` start offset within the timeline) must NOT start animating until the center card is most of the way through its scale-up — staggering everything from `0` makes the section feel cluttered/simultaneous rather than choreographed.

---

## Pattern E — Chained sticky-stack

Used for: Our Benefits section. This is the hardest pattern on the page — budget real time for it and test across viewport heights.

```js
const cards = gsap.utils.toArray('.benefit-card');

cards.forEach((card, i) => {
  const isLast = i === cards.length - 1;
  const nextCard = cards[i + 1];

  ScrollTrigger.create({
    trigger: card,
    start: 'top top+=88', // 88px accounts for sticky nav height
    end: isLast ? 'bottom top' : `+=${card.offsetHeight}`,
    pin: true,
    pinSpacing: isLast, // only the last card reserves pin-spacing in normal flow
  });

  if (!isLast) {
    gsap.fromTo(
      nextCard.querySelector('.benefit-right-panel'),
      { yPercent: 100, scale: 0.95 },
      {
        yPercent: 0,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: nextCard,
          start: 'top bottom',
          end: 'top top+=88',
          scrub: true,
        },
      }
    );
  }
});

// IMPORTANT: recalculate on resize and after images/fonts load
window.addEventListener('resize', () => ScrollTrigger.refresh());
window.addEventListener('load', () => ScrollTrigger.refresh());
```

Why this is fragile: pin ranges depend on the actual rendered height of each card, which depends on font-loading, image-loading, and viewport width. Always call `ScrollTrigger.refresh()` after fonts/images finish loading (`document.fonts.ready.then(...)`), not just on resize, or the pin boundaries will be calculated against the wrong (pre-image) layout and cards will pin/unpin at the wrong scroll position.

Test specifically at: very short viewports (laptop with browser toolbars, ~700px tall) and very tall ones (large desktop monitor) — the chained pin pattern is the single most likely thing to visually break at extreme aspect ratios.

---

## Cross-pattern notes

- **Reduced motion**: wrap all ScrollTrigger pin/scrub creation in a check against `window.matchMedia('(prefers-reduced-motion: reduce)')`. If reduced motion is requested, skip pinning entirely and just fade sections in on `IntersectionObserver` instead — pinned scroll-jacking is one of the more disorienting patterns for users who've opted into reduced motion.
- **Mobile**: pin-based patterns (D, E) generally should be disabled below ~900px viewport width — pinning on mobile scroll (especially with address-bar show/hide behavior) is unreliable across browsers. Fall back to simple scroll-fade-in (no pin, no scrub) for these sections on mobile; use `ScrollTrigger.matchMedia()` to branch the setup cleanly:

```js
ScrollTrigger.matchMedia({
  '(min-width: 900px)': function () {
    // all pin/scrub setup here
  },
  '(max-width: 899px)': function () {
    // simple fade-in fallback here
  },
});
```
- **Performance**: every pinned section forces layout recalculation on scroll. Don't pin more than one section's worth of content at a time, and avoid `box-shadow`/`filter` animations inside pinned timelines (animate `transform`/`opacity` only — anything else triggers repaint, not just composite, and will visibly jank on mid-range hardware).
