const LINK_HEADER = [
  '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
  '</openapi.json>; rel="service-desc"; type="application/json"',
  '</llms.txt>; rel="service-doc"; type="text/markdown"',
  '</auth.md>; rel="describedby"; type="text/markdown"',
  '</.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"',
].join(", ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/",
        headers: [
          { key: "Link", value: LINK_HEADER },
          { key: "Vary", value: "Accept" },
        ],
      },
      {
        source: "/home",
        headers: [
          { key: "Link", value: LINK_HEADER },
          { key: "Vary", value: "Accept" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/home/privacy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/home/terms",
        destination: "/terms",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/index.md", destination: "/agent-md" },
      { source: "/home/index.md", destination: "/agent-md/home" },
      { source: "/privacy/index.md", destination: "/agent-md/privacy" },
      { source: "/terms/index.md", destination: "/agent-md/terms" },
    ];
  },
};

module.exports = nextConfig;
