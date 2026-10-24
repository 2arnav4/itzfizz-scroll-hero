"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Fraction of the scroll timeline spent driving; the rest is a short hold. */
const DRIVE = 1;
const MOTION_OK = "(prefers-reduced-motion: no-preference)";

type HeroElements = ReturnType<typeof getElements>;

/**
 * Wires the hero's two animations:
 *  1. a time-based intro that plays once on load, and
 *  2. a scroll-scrubbed timeline that drives the car across while the hero is pinned.
 *
 * Everything runs inside gsap.matchMedia, so visitors with reduced motion get the
 * CSS final state, and useGSAP reverts every tween and ScrollTrigger on unmount
 * (safe under React Strict Mode's double mount).
 */
export function useScrollHero(rootRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const els = getElements(root);
        playIntro(els);
        buildScrollTimeline(root, els);

        // If motion gets turned off mid-intro, leave the real numbers on screen.
        return () => resetCounters(els.counters);
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );
}

function getElements(root: HTMLElement) {
  const one = (selector: string) => {
    const el = root.querySelector<HTMLElement>(selector);
    if (!el) throw new Error(`useScrollHero: missing ${selector}`);
    return el;
  };
  const all = (selector: string) =>
    Array.from(root.querySelectorAll<HTMLElement>(selector));

  return {
    road: one("[data-road]"),
    trail: one("[data-trail]"),
    trailInner: one("[data-trail-inner]"),
    car: one("[data-car]"),
    carBody: one("[data-car-body]"),
    hint: one("[data-hint]"),
    hintFade: one("[data-hint-fade]"),
    letters: all("[data-letter]"),
    stats: all("[data-stat]"),
    statBars: all("[data-stat-bar]"),
    counters: all("[data-count]"),
  };
}

/** Load animation: letters rise in one by one, the car rolls in, stats follow. */
function playIntro(els: HeroElements) {
  const carWidth = els.car.offsetWidth;
  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

  intro
    .fromTo(
      els.letters,
      { opacity: 0, yPercent: 40 },
      { opacity: 1, yPercent: 0, duration: 0.9, stagger: 0.05 },
      0,
    )
    .fromTo(
      els.carBody,
      { opacity: 0, x: -carWidth * 0.6 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power2.out" },
      0.2,
    )
    .fromTo(
      els.stats,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
      0.5,
    )
    .fromTo(
      els.hint,
      { opacity: 0, y: -6 },
      { opacity: 1, y: 0, duration: 0.6 },
      1.2,
    );

  els.counters.forEach((el, i) => {
    const target = Number(el.dataset.count);
    const proxy = { value: 0 };
    intro.to(
      proxy,
      {
        value: target,
        duration: 1.2,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = String(Math.round(proxy.value));
        },
      },
      0.5 + i * 0.12,
    );
  });
}

/**
 * Scroll animation. The section is pinned for 150% of a viewport height and the
 * timeline's progress follows the scrollbar (scrub: 1 adds about a second of
 * smoothing, so the car glides instead of jumping with each wheel tick).
 *
 * The reveal is a transform-only mask: the trail moves right while its inner
 * layer moves left by the same amount, so the bright headline inside it stays
 * still and is uncovered exactly behind the car. No width, left or clip-path is
 * animated, and no layout is read during scroll; sizes are read only on refresh.
 */
function buildScrollTimeline(root: HTMLElement, els: HeroElements) {
  const roadWidth = () => els.road.clientWidth;
  const carWidth = () => els.car.offsetWidth;

  const tl = gsap.timeline({
    defaults: { ease: "power1.inOut" },
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: "+=150%",
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // The CSS start transforms use percentages, which GSAP would keep as xPercent
  // and add on top of x. xPercent: 0 hands the whole offset to x in pixels.
  // Car: from half off the left edge to fully off the right edge.
  // Trail: its right edge tracks the car's centre the whole way.
  tl.fromTo(
    els.car,
    { xPercent: 0, x: () => -carWidth() / 2 },
    { x: () => roadWidth(), duration: DRIVE },
    0,
  )
    .fromTo(
      els.trail,
      { xPercent: 0, x: () => -(roadWidth() + carWidth()) },
      { x: () => -carWidth() / 2, duration: DRIVE },
      0,
    )
    .fromTo(
      els.trailInner,
      { xPercent: 0, x: () => roadWidth() + carWidth() },
      { x: () => carWidth() / 2, duration: DRIVE },
      0,
    )
    .to(els.hintFade, { opacity: 0, y: -8, duration: 0.1, ease: "none" }, 0)
    .fromTo(
      els.statBars,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.3, stagger: 0.2, ease: "none" },
      0.1,
    )
    // Short hold so the finished headline stays on screen before the pin releases.
    .to({}, { duration: 0.15 });
}

function resetCounters(counters: HTMLElement[]) {
  counters.forEach((el) => {
    el.textContent = el.dataset.count ?? el.textContent;
  });
}
