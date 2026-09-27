import { SITE } from "@/components/v2/constants";

export const ORIGIN = SITE.url;

export const MACHINE_HEADERS = {
  "X-Robots-Tag": "noindex",
  "Cache-Control": "public, max-age=300",
} as const;

export const LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/json"',
  '</llms.txt>; rel="service-doc"; type="text/markdown"',
  '</auth.md>; rel="describedby"; type="text/markdown"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
].join(", ");

export function wantsMarkdown(accept: string) {
  return accept.split(",").some((part) => {
    const [type, ...params] = part.trim().toLowerCase().split(";");
    if (type !== "text/markdown") return false;
    const quality = params
      .map((param) => param.trim())
      .find((param) => param.startsWith("q="));
    if (!quality) return true;
    return Number(quality.slice(2)) > 0;
  });
}

export function shouldAttachDiscovery(pathname: string) {
  return (
    pathname === "/" ||
    pathname === "/home" ||
    pathname === "/privacy" ||
    pathname === "/terms"
  );
}
