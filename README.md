# Itzfizz Scroll Hero

A scroll-driven hero section built for the Itzfizz Digital internship assignment.
A car drives across the screen as you scroll, and the letter-spaced headline
`W E L C O M E  I T Z F I Z Z` is revealed on the trail behind it. Impact stats
sit below the headline.

Live: https://2arnav4.github.io/itzfizz-scroll-hero/

Stack: Next.js (App Router, TypeScript, static export), Tailwind CSS, GSAP with
ScrollTrigger and `@gsap/react`.

## How the animation works

**Load animation (time-based, plays once).** Headline letters fade and rise in
with a stagger, the car rolls in from the left, and the stat cards appear one
by one while their numbers count up.

**Scroll animation (scroll-based).** One GSAP timeline is attached to a
ScrollTrigger that pins the hero for 150% of the viewport height. `scrub: 1`
ties the timeline's progress to the scroll position and adds about a second
of smoothing, so the car glides instead of jumping with each wheel tick. Scroll
back up and the car reverses.

The headline reveal is a transform-only mask:

- The dim headline is always on the road.
- A lime trail, clipped with `overflow: hidden`, holds a bright copy of the
  headline. As the trail moves right, its inner layer moves left by exactly
  the same amount, so the bright copy stays still and is uncovered right
  behind the car.
- The car and the trail use the same easing and duration, so they never drift
  apart.

**Why transforms only.** Only `transform` and `opacity` change during scroll,
which the browser can composite without layout or repaint of the page. No
`width`, `left` or `clip-path` is animated and nothing measures the DOM on
scroll. Sizes (road width, car width) are read only when ScrollTrigger
refreshes, for example on resize (`invalidateOnRefresh`).

**Accessibility and cleanup.** Everything runs inside `gsap.matchMedia()`. With
`prefers-reduced-motion: reduce` there is no pin and no scrub, and CSS shows the
final frame. `useGSAP` reverts every tween and ScrollTrigger on unmount, so
React Strict Mode's double mount leaves nothing behind.

## Project structure

```
src/
  app/                 layout, page, global styles (theme colours, start states)
  components/
    hero/
      HeroSection.tsx  layout of the hero, wires the hook
      Headline.tsx     letter-spaced headline (dim and bright variants)
      StatCard.tsx     one metric card
      Car.tsx          hand-drawn inline SVG car
      content.ts       headline text and stats data
    AfterHero.tsx      content after the pinned hero
  hooks/
    useScrollHero.ts   intro timeline and scroll timeline
  lib/
    gsap.ts            registers GSAP plugins once
```

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export into out/
npm run lint
```

## Deploy (GitHub Pages)

`next.config.ts` uses `output: "export"`. On GitHub Pages the site lives under
`/itzfizz-scroll-hero/`, so the build reads `NEXT_PUBLIC_BASE_PATH` and sets
`basePath` and `assetPrefix` from it. Locally it is empty.

The workflow in `.github/workflows/deploy.yml` builds with
`NEXT_PUBLIC_BASE_PATH=/<repo name>` and deploys `out/` on every push to `main`.
`public/.nojekyll` stops Pages from ignoring the `_next` folder.

One-time setup: in the repository, go to Settings, then Pages, and set Source
to GitHub Actions.

To test the Pages build locally:

```bash
NEXT_PUBLIC_BASE_PATH=/itzfizz-scroll-hero npm run build
```
