// Public site data only. Nothing private from the source documents belongs here.

export const site = {
  name: 'linway',
  person: 'Lina Makarenko',
  /** e.g. 'https://example.org' — enables canonical URLs and indexing. */
  productionUrl: null as string | null,
  /** Supplied by the site owner; the Stewardship page names Lina Makarenko. */
  donate: { label: 'Give through Stewardship', href: 'https://www.stewardship.org.uk/partners/20645926' },
  /** Lina’s Instagram: a follow/contact route, never the donation link. */
  instagram: { handle: '@linren__', href: 'https://www.instagram.com/linren__/' },
  /**
   * Pre-deployment gates, checked by `npm run audit:release`. They render nothing.
   * The first-person copy on the page is drafted from Lina’s prayer letter and
   * needs her final approval before deployment.
   */
  copyReviewedByLina: false,
  /** Publication rights for the hero image (see src/assets/hero/SOURCE.md). */
  heroRightsConfirmed: false,
};
