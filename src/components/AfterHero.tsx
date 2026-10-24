/** Plain content after the hero, so the pin visibly releases into the page. */
export function AfterHero() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-10 sm:py-32">
      <p className="text-xs font-medium tracking-[0.3em] text-lime">NEXT SECTION</p>
      <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
        The hero unpins here and the page scrolls normally.
      </h2>
      <p className="mt-6 text-base leading-relaxed text-white/60 sm:text-lg">
        Scroll back up to drive the car in reverse. The animation is tied to
        scroll position, not a timer, so it follows the scrollbar in both
        directions.
      </p>
    </section>
  );
}
