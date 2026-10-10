export type Publication = {
  id: string;
  featured: boolean;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi: string | null;
  pubmed: string | null;
  theme: string;
  /** Original summary for the site; not copied from the article. */
  summary: string;
};

/** Verified Google Scholar profile for Jacques E. Chelly (University of Pittsburgh). */
export const DR_JACQUES_CHELLY_PUBLICATION_PROFILE =
  "https://scholar.google.com/citations?user=8L-8DMQAAAAJ&hl=en" as const;

export function publicationHref(pub: Publication): string | null {
  if (pub.doi) return `https://doi.org/${pub.doi}`;
  if (pub.pubmed) return `https://pubmed.ncbi.nlm.nih.gov/${pub.pubmed}/`;
  return null;
}

export function formatPublicationCitation(pub: Publication): string {
  const href = publicationHref(pub);
  const tail = href ?? (pub.pubmed ? `PMID ${pub.pubmed}` : "");
  return `${pub.authors}. ${pub.title}. ${pub.journal}, ${pub.year}.${tail ? ` ${tail}` : ""}`;
}
