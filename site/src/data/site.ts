// Public site data only. Nothing private from the source documents belongs here.

export const site = {
  name: 'linway',
  person: 'Lina Makarenko',
  /** e.g. 'https://example.org' — enables canonical URLs and indexing. */
  productionUrl: null as string | null,
  /** Supplied by the site owner; the Stewardship page names Lina Makarenko. */
  /** The page at this URL is Lina's own Stewardship page; `via` says so on the button. */
  donate: { label: 'Support Lina’s year', via: 'Opens her Stewardship page', href: 'https://www.stewardship.org.uk/partners/20645926' },
  /** Lina’s Instagram: a follow/contact route, never the donation link. */
  instagram: { handle: '@linren__', href: 'https://www.instagram.com/linren__/' },
  /**
   * Lina's public contacts, supplied by the site owner on 2 October 2026. These two
   * exact values are the only phone number and email the dist audit allows.
   */
  contact: {
    whatsapp: { label: '+44 77 7847 4925', href: 'https://wa.me/447778474925' },
    email: { label: 'linamak1111@gmail.com', href: 'mailto:linamak1111@gmail.com' },
  },
  /**
   * Pre-deployment gates, checked by `npm run audit:release`. They render nothing.
   * The first-person copy on the page is drafted from Lina’s prayer letter and
   * needs her final approval before deployment.
   */
  copyReviewedByLina: false,
  /** Publication rights for the hero image (see src/assets/hero/SOURCE.md). */
  heroRightsConfirmed: false,
  /**
   * Lina's first-month update (My First Month of MT.docx) describes MTS and Free
   * English sessions already under way, and the page now says so. It is her own
   * account, not independent confirmation, and the wording needs her review
   * (docs/CONTENT-AUDIT.md, docs/COPY-LEDGER.md).
   */
  currentStatusConfirmed: false,
  /**
   * Gallery photos (src/assets/gallery/SOURCE.md). Each shows other people;
   * set `consentConfirmed` only with written permission from everyone
   * identifiable, and a guardian for any minor.
   */
  photos: {
    gathering: { consentConfirmed: false, review: 'Shows a minor (back view) and other attendees' },
    allSouls: { consentConfirmed: false, review: 'Street scene: passers-by and cyclists, not identifiable' },
    freeEnglish: { consentConfirmed: false, review: 'Identifiable third party (her name badge is blurred)' },
    cafe: { consentConfirmed: false, review: 'Two identifiable friends' },
  },
};
