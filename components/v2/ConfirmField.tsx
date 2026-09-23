"use client";

import { motion, useReducedMotion } from "motion/react";

const W = 300;
const H = 240;
const X0 = 22;
const X1 = 146;
const X2 = 276;
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
  { start: 48, mid: 96, end: 28, kink: 0, quiet: true },
  { start: 72, mid: 104, end: 56, kink: 1 },
  { start: 94, mid: 112, end: 84, kink: 2 },
  { start: 118, mid: 120, end: 118, kink: 3, accent: true },
  { start: 142, mid: 128, end: 154, kink: 4 },
  { start: 164, mid: 138, end: 186, kink: 5 },
  { start: 188, mid: 148, end: 216, kink: 6, quiet: true },
];

const HASHES = [52, 86, 120, 154, 188];

function trackPath(track: Track) {
  const pull = 44 + (track.kink * 5) % 12;
  const release = 38 + (track.kink * 4) % 10;
  return `M${X0} ${track.start} C${X0 + pull} ${track.start} ${X1 - 20} ${track.mid} ${X1} ${track.mid} C${X1 + 22} ${track.mid} ${X2 - release} ${track.end} ${X2} ${track.end}`;
}

export function ConfirmField() {
  const reduce = useReducedMotion();
  const instant = !!reduce;
  const accent = TRACKS.find((track) => track.accent)!;

  return (
    <figure className="v2-receipt-fig" aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} focusable="false">
        <motion.rect
          x="131"
          y="28"
          width="30"
          height="184"
          fill="rgba(213, 217, 222, 0.12)"
          initial={instant ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: instant ? 0 : 0.22 }}
        />
        <motion.line
          x1={X1}
          x2={X1}
          y1="32"
          y2="208"
          stroke="rgba(213, 217, 222, 0.55)"
          strokeWidth="1"
          strokeDasharray="2 5"
          initial={instant ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: instant ? 0 : 0.06, duration: instant ? 0 : 0.22 }}
        />
        {HASHES.map((y, i) => (
          <motion.line
            key={y}
            x1={X1 - 8}
            x2={X1 + 8}
            y1={y}
            y2={y}
            stroke="rgba(213, 217, 222, 0.48)"
            strokeWidth="1"
            initial={instant ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: instant ? 0 : 0.1 + i * 0.03,
              duration: instant ? 0 : 0.2,
            }}
          />
        ))}

        {TRACKS.map((track, i) => {
          const delay = instant ? 0 : 0.1 + i * 0.03;
          const stroke = track.accent ? "var(--color-signal)" : "#b7c2ce";
          return (
            <g
              key={`${track.start}-${track.end}`}
              className={track.quiet ? "v2-receipt-quiet" : undefined}
            >
              <motion.path
                d={trackPath(track)}
                fill="none"
                stroke={stroke}
                strokeWidth={track.accent ? 1.9 : 1.35}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={track.accent ? 1 : 0.72}
                initial={instant ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  delay,
                  duration: instant ? 0 : track.accent ? 0.58 : 0.48,
                  ease: EASE_DRAW,
                }}
              />
              <circle
                cx={X0}
                cy={track.start}
                r="2.3"
                fill={stroke}
                opacity={track.accent ? 0.85 : 0.5}
              />
              {!track.accent && (
                <motion.circle
                  cx={X2}
                  cy={track.end}
                  r="2.6"
                  fill={stroke}
                  initial={instant ? false : { opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 0.7, scale: 1 }}
                  transition={{
                    delay: instant ? 0 : 0.62 + i * 0.02,
                    duration: instant ? 0 : 0.18,
                    ease: EASE_OUT,
                  }}
                />
              )}
            </g>
          );
        })}

        <g>
          <motion.circle
            cx={X2}
            cy={accent.end}
            r="4.2"
            fill="var(--color-signal)"
            initial={instant ? false : { opacity: 0, scale: 0.55 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: instant ? 0 : 0.74,
              duration: instant ? 0 : 0.2,
              ease: EASE_OUT,
            }}
          />
          <motion.path
            d={`M${X2 - 3.4} ${accent.end + 0.2} L${X2 - 0.5} ${accent.end + 2.6} L${X2 + 4.1} ${accent.end - 2.7}`}
            fill="none"
            stroke="var(--color-paper)"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={instant ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              delay: instant ? 0 : 0.82,
              duration: instant ? 0 : 0.16,
              ease: EASE_OUT,
            }}
          />
        </g>
      </svg>
    </figure>
  );
}
