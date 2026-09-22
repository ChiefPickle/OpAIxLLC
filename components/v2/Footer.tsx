import { Mark } from "./Mark";
import { routes, SITE } from "./constants";

export function Footer() {
  return (
    <footer className="v2-footer">
      <div className="v2-wrap">
        <div className="v2-footer-grid">
          <div>
            <div className="v2-wordmark">
              <Mark />
              {SITE.name}
            </div>
            <p className="v2-meta" style={{ marginTop: "0.85rem", maxWidth: "36ch" }}>
              Models that help surgeons individualize opioid prescriptions at
              hospital discharge. {SITE.city}.
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, marginBottom: "0.75rem" }}>
              Contact
            </h3>
            <ul className="v2-footer-list">
              <li>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <a href={SITE.phoneHref}>{SITE.phone}</a>
              </li>
              <li>{SITE.city}</li>
            </ul>
          </div>
          <div>
            <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, marginBottom: "0.75rem" }}>
              Legal
            </h3>
            <ul className="v2-footer-list">
              <li>
                <a href={routes.privacy}>Privacy policy</a>
              </li>
              <li>
                <a href={routes.terms}>Terms</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="v2-footer-copy">© 2026 {SITE.legalName}.</p>
      </div>
    </footer>
  );
}
