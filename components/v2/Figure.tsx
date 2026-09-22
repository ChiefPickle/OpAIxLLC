"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";

const EASE: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

export function Figure({
  src,
  alt,
  caption,
  width,
  height,
  sizes = "(min-width: 1024px) 32vw, calc(100vw - 80px)",
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  sizes?: string;
}) {
  return (
    <figure className="v2-figure">
      <Reveal>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className="v2-figure-img"
        />
      </Reveal>
      {caption ? <figcaption className="v2-figcaption">{caption}</figcaption> : null}
    </figure>
  );
}

export function PlaceBand() {
  const reduce = useReducedMotion();

  return (
    <figure className="v2-place">
      <div className="v2-place-frame">
        <motion.div
          className="v2-place-motion"
          initial={reduce ? false : { opacity: 0, scale: 1.06 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduce ? 0 : 1.15, ease: EASE }}
        >
          <Image
            src="/home/visuals/pittsburgh.jpg"
            alt="Two rivers meeting in Pittsburgh at dusk, with bridges and a fountain at the point."
            fill
            sizes="100vw"
            className="v2-place-img"
          />
        </motion.div>
      </div>
      <figcaption className="v2-wrap v2-place-caption">
        Pittsburgh. The work sits here because the clinical research already did.
      </figcaption>
    </figure>
  );
}
