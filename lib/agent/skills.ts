import { createHash } from "node:crypto";

import { ORIGIN } from "@/lib/agent/site";

export const SKILL_INDEX_SCHEMA =
  "https://schemas.agentskills.io/discovery/0.2.0/schema.json";

const SKILLS = [
  {
    name: "read-opaix-site",
    type: "read",
    description:
      "Read the OpAIx homepage: individualized opioid prescribing at hospital discharge, the seven-factor approach, selected research, leadership, and how to contact the team.",
    url: `${ORIGIN}/index.md`,
    body: `# Read OpAIx

Fetch ${ORIGIN}/ with \`Accept: text/markdown\`, or GET ${ORIGIN}/index.md.

The page describes models that help surgeons individualize opioid prescriptions at hospital discharge. Pain prediction is one factor, not the whole product.

Do not invent publications. Do not treat University of Pittsburgh or UPMC mentions as endorsements. Do not submit protected health information.
`,
  },
  {
    name: "contact-opaix",
    type: "write",
    description:
      "Send a message to OpAIx from the public contact form. Surgeons, CMIOs, peri-operative chiefs, research partners, and investors.",
    url: `${ORIGIN}/openapi.json`,
    body: `# Contact OpAIx

POST JSON to ${ORIGIN}/send with name, organisation, role, email, and message.

A successful response is {"ok":true}. No account is required. Do not send protected health information.

The retired homepage form is POST ${ORIGIN}/home/send with name, email, subject, and message.
`,
  },
] as const;

export function skillIndex() {
  return {
    $schema: SKILL_INDEX_SCHEMA,
    skills: SKILLS.map((skill) => ({
      name: skill.name,
      type: skill.type,
      description: skill.description,
      url: skill.url,
      digest: digestFor(skill.body),
    })),
  };
}

export function skillMarkdown(name: string) {
  return SKILLS.find((skill) => skill.name === name)?.body ?? null;
}

export function digestFor(body: string) {
  return `sha256:${createHash("sha256").update(body).digest("hex")}`;
}
