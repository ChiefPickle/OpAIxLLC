"use client";

import { motion, useReducedMotion } from "motion/react";

const W = 540;
const H = 440;
const X0 = 108;
const X1 = 286;
const X2 = 498;
const EASE_DRAW: [number, number, number, number] = [0.65, 0, 0.35, 1];
const EASE_OUT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

type Track = {
  start: number;
  mid: number;
  end: number;
  accent?: boolean;
  quiet?: boolean;
  kink: number;
};

const TRACKS: Track[] = [
  { start: 132, mid: 200, end: 52, kink: 0, quiet: true },
  { start: 152, mid: 210, end: 86, kink: 1, accent: true },
  { start: 172, mid: 218, end: 132, kink: 2, quiet: true },
  { start: 192, mid: 226, end: 174, kink: 3 },
  { start: 212, mid: 234, end: 222, kink: 4, accent: true },
  { start: 232, mid: 242, end: 262, kink: 5 },
  { start: 252, mid: 250, end: 298, kink: 6, quiet: true },
  { start: 272, mid: 258, end: 332, kink: 7, quiet: true },
  { start: 292, mid: 266, end: 368, kink: 8, accent: true },
  { start: 312, mid: 274, end: 404, kink: 9, quiet: true },
];

function trackPath(track: Track) {
  const pull = 92 + (track.kink * 7) % 18;
  const release = 78 + (track.kink * 6) % 16;
  return `M${X0} ${track.start} C${X0 + pull} ${track.start} ${X1 - 36} ${track.mid} ${X1} ${track.mid} C${X1 + 40} ${track.mid} ${X2 - release} ${track.end} ${X2} ${track.end}`;
}

export function NeedField() {
  const reduce = useReducedMotion();
  const instant = !!reduce;

  return (
    <figure className="v2-need">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-labelledby="need-title need-desc"
      >
        <title id="need-title">
          Patient-specific predictions of post-discharge opioid need
        </title>
        <desc id="need-desc">
          Schematic paths begin from different patient inputs, pass through a
          shared model, and end at different predicted post-discharge opioid
          needs. Three paths are highlighted. Not a patient record.
        </desc>

        <motion.rect
          x="260"
          y="40"
          width="52"
          height="360"
          fill="rgba(16, 35, 59, 0.03)"
          initial={instant ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: instant ? 0 : 0.12, duration: instant ? 0 : 0.4 }}
        />
        <motion.line
          x1={X1}
          x2={X1}
          y1="44"
          y2="396"
          stroke="var(--color-hairline)"
          strokeWidth="1"
          strokeDasharray="2 6"
          initial={instant ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: instant ? 0 : 0.18, duration: instant ? 0 : 0.35 }}
        />

        <text className="v2-need-label v2-need-in" x="8" y="148">
          Procedure
        </text>
        <text className="v2-need-label v2-need-in" x="8" y="214">
          Patient
        </text>
        <text className="v2-need-label v2-need-in" x="8" y="226">
          characteristics
        </text>
        <text className="v2-need-label v2-need-in" x="8" y="294">
          Clinical history
        </text>
        <text className="v2-need-label" x={X2} y="28" textAnchor="end">
          Predicted post-discharge
        </text>
        <text className="v2-need-label" x={X2} y="42" textAnchor="end">
          opioid need
        </text>

        {TRACKS.map((track, i) => {
          const delay = instant ? 0 : 0.18 + i * 0.035;
          const stroke = track.accent ? "var(--color-signal)" : "var(--color-ink)";
          const width = track.accent ? 1.5 : 1.2;
          const opacity = track.accent ? 0.9 : 0.4;
          return (
            <g
              key={`${track.start}-${track.end}`}
              className={track.quiet ? "v2-need-quiet" : undefined}
            >
              <motion.path
                d={trackPath(track)}
                fill="none"
                stroke={stroke}
                strokeWidth={width}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={opacity}
                initial={instant ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  delay,
                  duration: instant ? 0 : 1.05,
                  ease: EASE_DRAW,
                }}
              />
              <circle
                cx={X0}
                cy={track.start}
                r="2.2"
                fill={stroke}
                opacity={track.accent ? 0.65 : 0.32}
              />
              <motion.circle
                cx={X2}
                cy={track.end}
                r={track.accent ? 3.4 : 2.7}
                fill={stroke}
                initial={instant ? false : { opacity: 0, scale: 0.6 }}
                animate={{ opacity: track.accent ? 0.96 : 0.5, scale: 1 }}
                transition={{
                  delay: instant ? 0 : 1.18 + i * 0.02,
                  duration: instant ? 0 : 0.28,
                  ease: EASE_OUT,
                }}
              />
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
