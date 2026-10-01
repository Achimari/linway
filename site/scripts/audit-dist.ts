// Pre-deployment audit: run after `npm run build`, before uploading dist/.
// Fails if dist/ contains source documents, private identifiers or details,
// retired photos, leaked comments or dev UI, or an unexpected public route.
// With --release it also fails while a deployment decision is still open.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { site } from '../src/data/site.ts';

const root = new URL('..', import.meta.url).pathname;
// LINWAY_DIST lets the test suite audit a separate build output.
const dist = process.env.LINWAY_DIST ?? join(root, 'dist');
const problems: string[] = [];

if (!existsSync(dist)) {
  console.error('dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

const files = readdirSync(dist, { recursive: true, withFileTypes: true })
  .filter((d) => d.isFile())
  .map((d) => join(d.parentPath, d.name).slice(dist.length + 1));

// Route contract: one page, a 404, robots, and meta-refresh stubs for retired routes.
const allowedHtml = new Set(['index.html', '404.html', 'story/index.html', 'experience/index.html', 'support/index.html', 'journal/index.html']);
const redirectStub = /^(story|experience|support|journal)\/index\.html$/;

const forbiddenFile = /\.(pdf|docx?|pages|odt|rtf|zip|md)$/i;
const forbiddenName = /mainpage|cos-|application|agreement|programme dates|untitled document|lovi|postevand|lina-steps|group-indoors|group-outdoors|profile|^\d{6,}_/i;
const textFile = /\.(html|xml|txt|json|js|css|svg|webmanifest)$/i;

// Patterns, not values: the private documents' contents never appear in this repo.
const forbiddenText: [RegExp, string][] = [
  [/MainPage\.jpg|MTS Application|MT Agreement|Programme dates|Untitled document/i, 'private source filename'],
  [/certificate of sponsorship|sponsor licence|religious worker|date of birth|passport|visa/i, 'immigration or identity detail'],
  [/\b[A-Z]\d[A-Z]\d[A-Z]\d{5}[A-Z]\b|\b[A-Z]{2}\d{7}\b|\b[A-Z]{4}\d{2}[A-Z]\d{2}\b/, 'document-number-like identifier'],
  [/(?:\+|00)\d[\d\s-]{8,}\d|whatsapp/i, 'phone-number-like text'],
  [/£\s?\d|\b\d{1,3},?\d{3}\.\d{2}\b|\bper year\b/i, 'financial figure'],
  [/\b(iela|novads)\b|\bLV-\d{4}\b|\b[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}\b/, 'address or postcode'],
  [/postevand|lovi\.care/i, 'reference-site name'],
  [/\.(pdf|docx)\b/i, 'link to a document file'],
  [/href="#"/, 'placeholder link'],
  [/\/\/\s*Copy:|copyReviewedByLina|heroRightsConfirmed/, 'leaked source comment or release flag'],
  [/<!--/, 'HTML comment'],
  [/\b(TODO|FIXME|TBD|lorem ipsum|placeholder text)\b/i, 'placeholder or editor note'],
  [/astro-dev-toolbar|astro-dev-overlay|\/@vite\/client/, 'dev toolbar or dev-server script'],
];
const email = /[\w.+-]+@[\w-]+\.[\w.-]+/g;

for (const rel of files) {
  if (forbiddenFile.test(rel)) problems.push(`${rel}: forbidden file type`);
  if (forbiddenName.test(basename(rel))) problems.push(`${rel}: private-source, reference or retired-photo filename`);
  if (rel.endsWith('.html') && !allowedHtml.has(rel)) problems.push(`${rel}: unexpected public page`);
  if (!textFile.test(rel)) continue;

  const text = readFileSync(join(dist, rel), 'utf8');
  if (redirectStub.test(rel) && !/http-equiv="refresh" content="0;url=\/"/.test(text)) problems.push(`${rel}: retired route is not a redirect to /`);
  for (const [pattern, why] of forbiddenText) if (pattern.test(text)) problems.push(`${rel}: ${why}`);
  for (const match of text.match(email) ?? []) {
    if (!/\.(avif|webp|jpe?g|png|svg|js|css)$/i.test(match)) problems.push(`${rel}: email-like text "${match}"`);
  }
}

if (process.argv.includes('--release')) {
  if (!site.copyReviewedByLina) problems.push('release: first-person copy not yet approved by Lina (site.copyReviewedByLina)');
  if (!site.heroRightsConfirmed) problems.push('release: hero image publication rights unconfirmed (site.heroRightsConfirmed, src/assets/hero/SOURCE.md)');
  if (!site.productionUrl) problems.push('release: no production domain (site.productionUrl); pages stay noindex');
}

if (problems.length) {
  console.error(`Audit failed (${problems.length}):\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log(`Audit passed: ${files.length} files in dist/.`);
