"use client";

import { motion, useReducedMotion } from "motion/react";
import { BASE_PATH } from "./constants";
import { NeedField } from "./NeedField";

const EASE: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

export function Hero() {
  const reduce = useReducedMotion();
  const follow = (delay: number) => ({
    initial: reduce ? false : { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: {
      delay: reduce ? 0 : delay,
      duration: reduce ? 0 : 0.45,
      ease: EASE,
    },
  });

  return (
    <section className="v2-hero" aria-labelledby="hero-heading">
      <div className="v2-hero-grid" aria-hidden="true" />
      <div className="v2-wrap v2-12">
        <div className="v2-hero-copy">
          <motion.p className="v2-kicker" {...follow(0)}>
            Mission statement
          </motion.p>
          <h1 id="hero-heading" className="v2-display">
            <motion.span
              initial={reduce ? false : { y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: reduce ? 0 : 0.08,
                duration: reduce ? 0 : 0.5,
                ease: EASE,
              }}
            >
              Individualized opioid prescribing starts with understanding each
              patient.
            </motion.span>
          </h1>
          <motion.p className="v2-lede v2-hero-mission" {...follow(0.28)}>
            The mission of OpAIx is to support surgeons in reducing or
            eliminating excess opioid prescribing at hospital discharge through
            innovative models that estimate each patient&apos;s individual
            needs.
          </motion.p>
          <motion.div className="v2-hero-actions" {...follow(0.4)}>
            <a className="v2-btn" href={`${BASE_PATH}#contact`}>
              Talk to the team
            </a>
            <a className="v2-textlink" href={`${BASE_PATH}#research`}>
              Read the research
            </a>
          </motion.div>
        </div>
        <motion.div
          className="v2-hero-viz"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: reduce ? 0 : 0.2,
            duration: reduce ? 0 : 0.45,
            ease: EASE,
          }}
        >
          <NeedField />
        </motion.div>
        <motion.p className="v2-founded v2-hero-credit" {...follow(0.55)}>
          Founded in Pittsburgh by UPMC physicians and AI researchers.
        </motion.p>
      </div>
    </section>
  );
}
