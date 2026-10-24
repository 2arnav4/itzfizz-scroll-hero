"use client";

import { useRef } from "react";
import { useScrollHero } from "@/hooks/useScrollHero";
import { Car } from "./Car";
import { Headline } from "./Headline";
import { StatCard } from "./StatCard";
import { STATS } from "./content";

export function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  useScrollHero(rootRef);

  return (
    <section
      ref={rootRef}
      className="relative flex h-svh flex-col overflow-hidden bg-night"
    >
      <header className="flex items-center justify-between px-4 pt-5 text-xs font-medium tracking-[0.3em] text-white/60 sm:px-10 sm:pt-8">
        <span>ITZFIZZ</span>
        <div data-hint-fade>
          <span data-hint className="intro-hidden inline-block">
            SCROLL TO DRIVE
          </span>
        </div>
      </header>

      <div className="flex flex-1 flex-col justify-center gap-8 sm:gap-12">
        {/* The road: dim headline below, lime trail with bright headline on top. */}
        <div data-road className="road relative w-full overflow-hidden bg-road">
          <div className="absolute inset-0 flex items-center justify-center">
            <Headline variant="base" />
          </div>

          <div data-trail className="trail absolute inset-y-0 left-0 overflow-hidden bg-lime">
            <div data-trail-inner className="trail-inner absolute inset-0">
              <div className="trail-content flex h-full items-center justify-center">
                <Headline variant="revealed" />
              </div>
            </div>
          </div>

          <div data-car className="car absolute inset-y-0 left-0 flex items-center">
            <div data-car-body className="intro-hidden w-full">
              <Car className="block h-auto w-full" />
            </div>
          </div>
        </div>

        <ul className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-3 px-4 sm:gap-4 sm:px-10 md:grid-cols-4">
          {STATS.map((stat) => (
            <li key={stat.label}>
              <StatCard {...stat} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
