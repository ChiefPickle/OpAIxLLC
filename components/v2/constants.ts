export const BASE_PATH = "/home";

export const SITE = {
  name: "OpAIx",
  legalName: "OpAIx LLC",
  url: "https://www.opaixllc.com",
  email: "contact@opaixllc.com",
  phone: "+1 (412) 953-4374",
  phoneHref: "tel:+14129534374",
  city: "Pittsburgh, Pennsylvania",
  founded: 2025,
} as const;

export const navItems = [
  { href: `${BASE_PATH}#approach`, label: "Approach" },
  { href: `${BASE_PATH}#research`, label: "Research" },
  { href: `${BASE_PATH}#team`, label: "Team" },
  { href: `${BASE_PATH}#contact`, label: "Contact" },
] as const;

export const routes = {
  home: BASE_PATH,
  privacy: `${BASE_PATH}/privacy`,
  terms: `${BASE_PATH}/terms`,
  send: `${BASE_PATH}/send`,
} as const;
