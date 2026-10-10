export {
  DR_JACQUES_CHELLY_PUBLICATION_PROFILE,
  formatPublicationCitation,
  publicationHref,
  type Publication,
} from "@/lib/publications";

export function highlightChelly(authors: string) {
  return authors.split(/(Chelly JE)/g);
}
