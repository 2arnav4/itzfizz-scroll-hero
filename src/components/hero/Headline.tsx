import { HEADLINE } from "./content";

type HeadlineProps = {
  /** "base" is the dim headline every visitor sees; "revealed" is the bright
   * copy uncovered behind the car. Both render identical letter boxes so the
   * two layers line up pixel for pixel. */
  variant: "base" | "revealed";
};

export function Headline({ variant }: HeadlineProps) {
  const isBase = variant === "base";
  const Tag = isBase ? "h1" : "div";

  return (
    <Tag
      className={`headline ${isBase ? "text-white/12" : "text-ink"}`}
      aria-label={isBase ? "Welcome Itzfizz" : undefined}
      aria-hidden={isBase ? undefined : true}
    >
      {HEADLINE.split("").map((char, i) =>
        char === " " ? (
          <span key={i} className="headline-space" aria-hidden="true" />
        ) : (
          <span
            key={i}
            aria-hidden="true"
            className="inline-block"
            data-letter={isBase ? "" : undefined}
          >
            {char}
          </span>
        ),
      )}
    </Tag>
  );
}
