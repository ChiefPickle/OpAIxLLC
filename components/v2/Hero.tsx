"use client";

import { motion, useReducedMotion } from "motion/react";
import { BASE_PATH } from "./constants";
import { PredictionChart } from "./PredictionChart";

const WORDS = ["Pain,", "predicted", "before", "it", "starts."];
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
          <h1 id="hero-heading" className="v2-display">
            {WORDS.map((word, i) => (
              <span key={word} className="v2-word">
                <motion.span
                  initial={reduce ? false : { y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: reduce ? 0 : i * 0.05,
                    duration: reduce ? 0 : 0.45,
                    ease: EASE,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="v2-lede" style={{ marginTop: "1.5rem" }} {...follow(0.28)}>
            OpAIx builds clinically grounded models that forecast a patient&apos;s
            pain trajectory, giving anesthesiology and perioperative teams time
            to intervene earlier, and reasons to prescribe less.
          </motion.p>
          <motion.div className="v2-hero-actions" {...follow(0.4)}>
            <a className="v2-btn" href={`${BASE_PATH}#contact`}>
              Talk to the team
            </a>
            <a className="v2-textlink" href={`${BASE_PATH}#research`}>
              Read the research
            </a>
          </motion.div>
          <motion.p className="v2-founded" {...follow(0.5)}>
            Founded in Pittsburgh by UPMC physicians and AI researchers.
          </motion.p>
        </div>
        <div className="v2-hero-chart">
          <PredictionChart />
        </div>
      </div>
    </section>
  );
}
