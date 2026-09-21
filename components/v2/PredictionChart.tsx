"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const W = 560;
const H = 360;
const PAD = { l: 44, r: 18, t: 36, b: 44 };
const PLOT = { w: W - PAD.l - PAD.r, h: H - PAD.t - PAD.b };
const NOW = 0.4;

const OBSERVED: [number, number][] = [
  [0, 1.2],
  [0.1, 1.6],
  [0.2, 2.9],
  [0.3, 4.7],
  [0.4, 5.6],
];

const FORECAST: [number, number][] = [
  [0.4, 5.6],
  [0.5, 6.7],
  [0.6, 8.05],
  [0.72, 6.4],
  [0.86, 4.3],
  [1, 3.05],
];

const PEAK: [number, number] = [0.6, 8.05];

const EASE_DRAW: [number, number, number, number] = [0.65, 0, 0.35, 1];
const EASE_OUT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

function x(t: number) {
  return PAD.l + t * PLOT.w;
}

function y(p: number) {
  return PAD.t + (1 - p / 10) * PLOT.h;
}

function linePath(pts: [number, number][]) {
  return pts
    .map(([t, p], i) => `${i === 0 ? "M" : "L"}${x(t).toFixed(2)} ${y(p).toFixed(2)}`)
    .join(" ");
}

function bandPath() {
  const half = (t: number) => 0.35 + Math.max(0, t - NOW) * 2.15;
  const upper = FORECAST.map(([t, p]) => [t, Math.min(10, p + half(t))] as [number, number]);
  const lower = [...FORECAST]
    .reverse()
    .map(([t, p]) => [t, Math.max(0, p - half(t))] as [number, number]);
  return `${linePath(upper)} ${lower
    .map(([t, p]) => `L${x(t).toFixed(2)} ${y(p).toFixed(2)}`)
    .join(" ")} Z`;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function valueAt(series: [number, number][], t: number) {
  if (t <= series[0][0]) return series[0][1];
  const last = series[series.length - 1];
  if (t >= last[0]) return last[1];
  for (let i = 0; i < series.length - 1; i++) {
    const a = series[i];
    const b = series[i + 1];
    if (t >= a[0] && t <= b[0]) {
      const u = (t - a[0]) / (b[0] - a[0]);
      return lerp(a[1], b[1], u);
    }
  }
  return last[1];
}

function ticks() {
  return [0, 0.333, 0.666, 1];
}

export function PredictionChart() {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const [forecastDashed, setForecastDashed] = useState(!!reduce);
  const observedD = useMemo(() => linePath(OBSERVED), []);
  const forecastD = useMemo(() => linePath(FORECAST), []);
  const bandD = useMemo(() => bandPath(), []);
  const peak = { x: x(PEAK[0]), y: y(PEAK[1]) };
  const nowX = x(NOW);
  const labelX = peak.x - 14;
  const labelY = peak.y - 16;
  const leader = `M${peak.x.toFixed(1)} ${peak.y.toFixed(1)} L${labelX.toFixed(1)} ${labelY.toFixed(1)}`;

  const hoverX = hover == null ? null : x(hover);
  const hoverSeries = hover == null ? null : hover <= NOW ? "Observed" : "Forecast";
  const hoverVal =
    hover == null
      ? null
      : hover <= NOW
        ? valueAt(OBSERVED, hover)
        : valueAt(FORECAST, hover);

  const instant = !!reduce;

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * W;
    const t = Math.min(1, Math.max(0, (px - PAD.l) / PLOT.w));
    setHover(t);
  };

  return (
    <figure>
      <div className="v2-chart-frame">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-labelledby="chart-title chart-desc"
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
        >
          <title id="chart-title">Schematic pain trajectory forecast</title>
          <desc id="chart-desc">
            Observed pain scores run from pre-op to a now marker, then a dashed
            forecast continues through 72 hours after surgery with a widening
            confidence band. A label marks the predicted peak as a point to
            intervene. Schematic, not a patient record.
          </desc>

          {[2, 4, 6, 8].map((p) => (
            <motion.line
              key={p}
              x1={PAD.l}
              x2={W - PAD.r}
              y1={y(p)}
              y2={y(p)}
              stroke="var(--color-hairline)"
              strokeWidth="1"
              initial={instant ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: instant ? 0 : 0.35, duration: instant ? 0 : 0.3 }}
            />
          ))}

          {[2, 4, 6, 8].map((p) => (
            <text
              key={`l-${p}`}
              x={PAD.l - 8}
              y={y(p) + 3}
              textAnchor="end"
              fill="var(--color-slate)"
              fontSize="15"
              fontFamily="Inter Variable, Inter, sans-serif"
            >
              {p}
            </text>
          ))}

          {ticks().map((t) => (
            <line
              key={t}
              x1={x(t)}
              x2={x(t)}
              y1={PAD.t + PLOT.h}
              y2={PAD.t + PLOT.h + 6}
              stroke="var(--color-ink)"
              strokeWidth="1"
            />
          ))}

          <text
            x={PAD.l}
            y={H - 12}
            fill="var(--color-slate)"
            fontSize="15"
            fontFamily="Inter Variable, Inter, sans-serif"
          >
            Pre-op
          </text>
          <text
            x={W - PAD.r}
            y={H - 12}
            textAnchor="end"
            fill="var(--color-slate)"
            fontSize="15"
            fontFamily="Inter Variable, Inter, sans-serif"
          >
            72h post-op
          </text>
          <text
            x={12}
            y={PAD.t - 12}
            fill="var(--color-slate)"
            fontSize="15"
            fontFamily="Inter Variable, Inter, sans-serif"
          >
            Pain 0–10
          </text>

          <motion.path
            d={bandD}
            fill="var(--color-band)"
            initial={instant ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: instant ? 0 : 1.55,
              duration: instant ? 0 : 0.5,
              ease: EASE_OUT,
            }}
          />

          <motion.path
            d={observedD}
            fill="none"
            stroke="var(--color-observed)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={instant ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              delay: instant ? 0 : 0.5,
              duration: instant ? 0 : 0.9,
              ease: EASE_DRAW,
            }}
          />

          {forecastDashed ? (
            <path
              d={forecastD}
              fill="none"
              stroke="var(--color-forecast)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="4 6"
            />
          ) : (
            <motion.path
              d={forecastD}
              fill="none"
              stroke="var(--color-forecast)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                delay: 1.4,
                duration: 0.7,
                ease: EASE_DRAW,
              }}
              onAnimationComplete={() => setForecastDashed(true)}
            />
          )}

          <line
            x1={nowX}
            x2={nowX}
            y1={PAD.t}
            y2={PAD.t + PLOT.h}
            stroke="var(--color-ink)"
            strokeWidth="1"
            opacity={0.45}
          />

          <motion.circle
            cx={nowX}
            cy={y(valueAt(OBSERVED, NOW))}
            fill="var(--color-ink)"
            initial={instant ? false : { r: 0 }}
            animate={{ r: instant ? 6 : [0, 7.2, 6] }}
            transition={
              instant
                ? { duration: 0 }
                : { delay: 1.3, duration: 0.25, times: [0, 0.7, 1], ease: EASE_OUT }
            }
          />

          <motion.path
            d={leader}
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="1"
            initial={instant ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: instant ? 0 : 2, duration: instant ? 0 : 0.2, ease: EASE_DRAW }}
          />

          <motion.text
            x={labelX}
            y={labelY}
            textAnchor="end"
            fill="var(--color-ink)"
            fontSize="14"
            fontFamily="Inter Variable, Inter, sans-serif"
            initial={instant ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: instant ? 0 : 2.2, duration: instant ? 0 : 0.25 }}
          >
            <tspan x={labelX} dy="0">
              Predicted peak
            </tspan>
            <tspan x={labelX} dy="14">
              Intervene here
            </tspan>
          </motion.text>

          {hoverX != null && hoverVal != null && hoverSeries && (
            <g pointerEvents="none">
              <line
                x1={hoverX}
                x2={hoverX}
                y1={PAD.t}
                y2={PAD.t + PLOT.h}
                stroke="var(--color-ink)"
                strokeWidth="1"
                opacity={0.35}
              />
              <circle
                cx={hoverX}
                cy={y(hoverVal)}
                r="4"
                fill="var(--color-paper)"
                stroke={hoverSeries === "Observed" ? "var(--color-observed)" : "var(--color-forecast)"}
                strokeWidth="2"
              />
              <text
                x={Math.min(hoverX + 8, W - 120)}
                y={Math.max(y(hoverVal) - 10, 18)}
                fill="var(--color-ink)"
                fontSize="15"
                fontFamily="Inter Variable, Inter, sans-serif"
              >
                {hoverSeries} {hoverVal.toFixed(1)}
              </text>
            </g>
          )}
        </svg>
      </div>
      <figcaption className="v2-figcaption">
        Schematic of a peri-operative pain course: observed scores through a
        “now” marker, then a forecast to 72 hours after surgery with a
        widening confidence band. Not a patient record.
      </figcaption>
    </figure>
  );
}
