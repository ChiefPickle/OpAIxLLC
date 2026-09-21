import publications from "@/content/publications.json";
import { SITE } from "./constants";
import { publicationHref, type Publication } from "./pubs";

const papers = publications as Publication[];

export function JsonLd() {
  const organization = {
    "@type": "Organization",
    name: SITE.legalName,
    url: `${SITE.url}/home`,
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: "2025",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pittsburgh",
      addressRegion: "PA",
      addressCountry: "US",
    },
  };

  const articles = papers
    .filter((pub) => pub.featured)
    .map((pub) => {
      const sameAs = publicationHref(pub);
      return {
        "@type": "ScholarlyArticle",
        name: pub.title,
        author: pub.authors,
        datePublished: String(pub.year),
        isPartOf: {
          "@type": "Periodical",
          name: pub.journal,
        },
        ...(sameAs && pub.doi ? { sameAs } : {}),
      };
    });

  const data = {
    "@context": "https://schema.org",
    "@graph": [organization, ...articles],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
