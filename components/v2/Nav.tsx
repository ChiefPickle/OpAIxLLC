"use client";

import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mark } from "./Mark";
import { BASE_PATH, navItems, SITE } from "./constants";

export function Nav() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const titleId = useId();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const nav = navRef.current;
    if (!nav) return;

    const trigger = ScrollTrigger.create({
      start: 0,
      onUpdate: (self) => {
        nav.classList.toggle("is-scrolled", self.scroll() > 8);
      },
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header ref={navRef} className="v2-nav">
        <div className="v2-wrap v2-nav-inner">
          <a href={BASE_PATH} className="v2-wordmark" aria-label={`${SITE.name} home`}>
            <Mark />
            {SITE.name}
          </a>
          <nav aria-label="Primary">
            <ul className="v2-nav-links">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="v2-underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="v2-menu-btn"
              aria-expanded={open}
              aria-controls={titleId}
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
                <path
                  d="M0 1h20M0 7h20M0 13h20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      <div
        className={`v2-sheet${open ? " is-open" : ""}`}
        hidden={!open}
        id={titleId}
      >
        <button
          type="button"
          className="v2-sheet-backdrop"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
        <div className="v2-sheet-panel" role="dialog" aria-modal="true" aria-label="Menu">
          <button
            type="button"
            className="v2-menu-btn"
            onClick={() => setOpen(false)}
            style={{ alignSelf: "flex-end" }}
          >
            <span className="sr-only">Close menu</span>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path
                d="M1 1l16 16M17 1L1 17"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="v2-underline"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
