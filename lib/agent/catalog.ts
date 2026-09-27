import { markdownFor } from "@/lib/agent/markdown";
import { ORIGIN } from "@/lib/agent/site";

export const LLMS_TXT = `# OpAIx

> Models that help surgeons individualize opioid prescriptions at hospital discharge.

OpAIx LLC is based in Pittsburgh, Pennsylvania, and was founded in 2025. Request Markdown by sending \`Accept: text/markdown\`. Browsers still receive HTML. You can also append \`/index.md\` to a page URL.

## Pages

- [Individualized opioid prescribing](${ORIGIN}/index.md): The public homepage. Mission, approach, research, leadership, and contact
- [Retired overview](${ORIGIN}/home/index.md): The previous marketing page (noindex)
- [Privacy](${ORIGIN}/privacy/index.md): How the public contact form is handled
- [Terms](${ORIGIN}/terms/index.md): Draft terms for the public site

## Optional

- [auth.md](${ORIGIN}/auth.md): The public site does not issue credentials
- [OpenAPI](${ORIGIN}/openapi.json): Contact form APIs
- [API catalog](${ORIGIN}/.well-known/api-catalog): Machine-readable service index
- [Full text](${ORIGIN}/llms-full.txt): The public homepage as one Markdown file
`;

export const AUTH_MD = `# auth.md

The public OpAIx website does not issue accounts or credentials. Any agent may read ${ORIGIN}/ and ${ORIGIN}/home without registering.

## Audience

Automated clients reading the public website or sending the public contact form. There is no user login on this site.

## Access

identity_types_supported: ["anonymous"]
anonymous.credential_types_supported: []

No credential is required. There is no claim URL and no revocation URL, because the site issues nothing.

## Contact

\`POST ${ORIGIN}/send\` is the public contact form, not a login. Send JSON with \`name\`, \`organisation\`, \`role\`, \`email\`, and \`message\`. A successful response is \`{"ok":true}\`. OpAIx replies by email.

The retired homepage form is \`POST ${ORIGIN}/home/send\` with \`name\`, \`email\`, \`subject\`, and \`message\`.

Email: contact@opaixllc.com
Phone: +1 (412) 953-4374
`;

export const openApiDocument = {
  openapi: "3.1.0",
  info: {
    title: "OpAIx contact",
    version: "1.0.0",
    description:
      "Public contact forms for the OpAIx website. No authentication. Omit company_website; a filled value is discarded as spam and is not part of this contract. Do not send protected health information.",
  },
  servers: [{ url: ORIGIN }],
  paths: {
    "/send": {
      post: {
        operationId: "sendMessage",
        summary: "Send a message from the public homepage form",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                additionalProperties: false,
                required: ["name", "organisation", "role", "email", "message"],
                properties: {
                  name: { type: "string", minLength: 2, maxLength: 80 },
                  organisation: { type: "string", minLength: 2, maxLength: 120 },
                  role: { type: "string", minLength: 2, maxLength: 80 },
                  email: { type: "string", format: "email", maxLength: 120 },
                  message: { type: "string", minLength: 10, maxLength: 2000 },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Message accepted",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["ok"],
                  properties: {
                    ok: { type: "boolean", const: true },
                  },
                },
              },
            },
          },
          "400": {
            description: "The message was rejected",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    ok: { type: "boolean" },
                    error: { type: "string" },
                  },
                },
              },
            },
          },
          "503": {
            description: "Mail delivery is not configured",
          },
        },
      },
    },
    "/home/send": {
      post: {
        operationId: "sendArchiveMessage",
        summary: "Send a message from the retired homepage form",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                additionalProperties: false,
                required: ["name", "email", "subject", "message"],
                properties: {
                  name: { type: "string", minLength: 2, maxLength: 80 },
                  email: { type: "string", format: "email", maxLength: 120 },
                  subject: { type: "string", minLength: 2, maxLength: 120 },
                  message: { type: "string", minLength: 10, maxLength: 2000 },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Message accepted",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["ok"],
                  properties: {
                    ok: { type: "boolean", const: true },
                  },
                },
              },
            },
          },
          "400": {
            description: "The message was rejected",
          },
          "503": {
            description: "Mail delivery is not configured",
          },
        },
      },
    },
  },
} as const;

export function apiCatalog() {
  return {
    linkset: [
      {
        anchor: `${ORIGIN}/send`,
        "service-desc": [
          {
            href: `${ORIGIN}/openapi.json`,
            type: "application/json",
          },
        ],
        "service-doc": [
          {
            href: `${ORIGIN}/llms.txt`,
            type: "text/markdown",
          },
          {
            href: `${ORIGIN}/index.md`,
            type: "text/markdown",
          },
        ],
      },
      {
        anchor: `${ORIGIN}/home/send`,
        "service-desc": [
          {
            href: `${ORIGIN}/openapi.json`,
            type: "application/json",
          },
        ],
        "service-doc": [
          {
            href: `${ORIGIN}/llms.txt`,
            type: "text/markdown",
          },
        ],
      },
    ],
  };
}

export function llmsFullTxt() {
  return markdownFor("/") ?? "";
}
