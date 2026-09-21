"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

function CountUp({
  to,
  suffix = "",
}: {
  to: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = `${to}${suffix}`;
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const obj = { n: 0 };
    const tween = gsap.to(obj, {
      n: to,
      duration: 0.6,
      ease: "power1.out",
      scrollTrigger: {
        trigger: el,
        start: "top 60%",
        once: true,
      },
      onUpdate: () => {
        el.textContent = `${Math.round(obj.n)}${suffix}`;
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [to, suffix, reduce]);

  return (
    <span ref={ref} className="v2-nums">
      {reduce ? `${to}${suffix}` : `0${suffix}`}
    </span>
  );
}

const stats = [
  {
    kind: "count" as const,
    value: 40,
    suffix: "+",
    label: "Years of clinical research in anesthesiology and pain",
  },
  {
    kind: "text" as const,
    value: "2002",
    label: "Perioperative clinical research program established",
  },
  {
    kind: "text" as const,
    value: "Thousands",
    label: "Research subjects enrolled",
  },
  {
    kind: "count" as const,
    value: 1,
    suffix: "",
    label: "Patent filed",
  },
];

export function Evidence() {
  return (
    <section className="v2-strip" aria-labelledby="evidence-heading">
      <div className="v2-wrap">
        <h2 id="evidence-heading" className="sr-only">
          Selected facts
        </h2>
        <dl className="v2-evidence">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="v2-stat-label">{stat.label}</dt>
              <dd className="v2-stat-value">
                {stat.kind === "count" ? (
                  <CountUp to={stat.value} suffix={stat.suffix} />
                ) : (
                  stat.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
