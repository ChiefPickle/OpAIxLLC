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
};

export function publicationHref(pub: Publication): string | null {
  if (pub.doi) return `https://doi.org/${pub.doi}`;
  if (pub.pubmed) return `https://pubmed.ncbi.nlm.nih.gov/${pub.pubmed}/`;
  return null;
}

export function highlightChelly(authors: string) {
  return authors.split(/(Chelly JE)/g);
}
