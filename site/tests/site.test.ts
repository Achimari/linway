// Builds the real site into a scratch folder and checks the one-page route
// contract, the two public actions, the :target scene contract (which is also
// the no-JS path), and that the privacy audit has teeth.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { appendFileSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const out = join(root, 'tests/.out');
const read = (rel: string) => readFileSync(join(out, rel), 'utf8');
const audit = () => spawnSync('node', ['scripts/audit-dist.ts'], { cwd: root, env: { ...process.env, LINWAY_DIST: out }, encoding: 'utf8' });
const sections = ['story', 'year', 'month', 'support', 'prayer'];

test('single-page site: routes, actions, scenes and audit', { timeout: 180_000 }, (t) => {
  rmSync(out, { recursive: true, force: true });
  execFileSync('npx', ['astro', 'build', '--outDir', out], { cwd: root, stdio: 'pipe' });
  t.after(() => rmSync(out, { recursive: true, force: true }));

  const html = readdirSync(out, { recursive: true }).map(String).filter((f) => f.endsWith('.html')).sort();
  assert.deepEqual(html, ['404.html', 'experience/index.html', 'index.html', 'journal/index.html', 'story/index.html', 'support/index.html']);
  for (const old of ['story', 'experience', 'support', 'journal']) {
    assert.match(read(`${old}/index.html`), /http-equiv="refresh" content="0;url=\/"/, `/${old}/ redirects home`);
  }

  const home = read('index.html');
  assert.equal((home.match(/<h1/g) ?? []).length, 1);

  // Links: the intro's enter and skip (both #home, so they work without
  // script), wordmark home, five chapters, Home's Story arrow, each chapter's next link, the two
  // actions (shared by every state), then Lina's two contacts (shown on Support).
  const hrefs = [...home.matchAll(/<a [^>]*href="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(hrefs, [
    '#home', '#home', '#home', '#story', '#year', '#month', '#support', '#prayer',
    '#story', '#year', '#month', '#support', '#prayer', '#home',
    'https://www.stewardship.org.uk/partners/20645926', 'https://www.instagram.com/linren__/',
    'https://wa.me/447778474925', 'mailto:linamak1111@gmail.com',
  ]);
  assert.match(home, /class="next mono" href="#story"[^>]*>Next: Story/);
  // Contacts: a labelled section with exactly these visible values; no form.
  const contact = home.match(/<section[^>]*class="contact"[^>]*>([\s\S]*?)<\/section>/);
  assert.ok(contact, 'contact section exists');
  assert.match(contact[0], /aria-labelledby="contact-title"/);
  assert.match(contact[1], /<a[^>]*href="https:\/\/wa\.me\/447778474925"[^>]*>[\s\S]*?WhatsApp[\s\S]*?\+44 77 7847 4925<\/a>/);
  assert.match(contact[1], /<a[^>]*href="mailto:linamak1111@gmail\.com"[^>]*>[\s\S]*?Email[\s\S]*?linamak1111@gmail\.com<\/a>/);
  assert.equal((home.match(/href="(mailto:|tel:|https:\/\/wa\.me\/)/g) ?? []).length, 2);
  // The primary action names Lina and the year, and says where it goes.
  assert.match(home, /class="donate"[^>]*href="https:\/\/www\.stewardship\.org\.uk\/partners\/20645926"[\s\S]*?Support Lina’s year[\s\S]*?Opens her Stewardship page/);

  // Home plus one labelled scene per chapter, all with real text in the HTML.
  assert.match(home, /<section[^>]*id="home"/);
  for (const id of sections) {
    const scene = home.match(new RegExp(`<section[^>]*id="${id}"[^>]*>([\\s\\S]*?)</section>`));
    assert.ok(scene, `scene #${id} exists`);
    assert.match(scene[0], new RegExp(`aria-labelledby="${id}-title"`));
    assert.match(scene[0], new RegExp(`id="${id}-title"`));
    assert.ok(scene[1].replace(/<[^>]+>/g, '').trim().length > 60, `#${id} has readable text`);
  }

  // Gallery: four photographs (the first-month chapter uses only the café photo), each described by its alt text (no visible captions), fetched at low priority.
  const figures = [...home.matchAll(/<figure[^>]*>([\s\S]*?)<\/figure>/g)].map((m) => m[1]);
  assert.equal(figures.length, 4);
  assert.doesNotMatch(home, /\/_astro\/sport\.|life-photo|id="life"/);
  for (const f of figures) {
    assert.match(f, /<img[^>]*alt="[^"]{30,}"/);
    assert.match(f, /<img[^>]*fetchpriority="low"/);
  }
  assert.doesNotMatch(home, /<figcaption/);
  // The year shows one photograph at a time, switched by native radios (works without script).
  for (const group of ['year-photo']) assert.equal((home.match(new RegExp(`<input type="radio" name="${group}"`, 'g')) ?? []).length, 2);
  // No editorial markers in the public page; approval notes live in docs/COPY-LEDGER.md.
  assert.doesNotMatch(home, /Draft · Lina to confirm|class="review|Lina to confirm/);
  // The support chapter says plainly that the year is unpaid.
  assert.match(home, /aren’t paid a salary/);
  // No popup machinery is left.
  assert.doesNotMatch(home, /class="sheet|index-marker|data-close/);

  // The supplied favicon set is linked with a versioned URL so browsers refresh it.
  for (const [href, file] of [
    ['/favicon.ico?v=a-20261003', 'favicon.ico'],
    ['/favicon.svg?v=a-20261003', 'favicon.svg'],
    ['/favicon-32.png?v=a-20261003', 'favicon-32.png'],
    ['/apple-touch-icon.png?v=a-20261003', 'apple-touch-icon.png'],
  ]) {
    assert.ok(home.includes(`href="${href}"`), `${file} linked`);
    assert.ok(readFileSync(join(out, file)).length > 100, `${file} ships`);
  }
  assert.match(home, /rel="manifest" href="\/site\.webmanifest"/);
  const manifest = JSON.parse(read('site.webmanifest'));
  assert.deepEqual(manifest.icons.map((icon: { src: string }) => icon.src), ['/icon-192.png', '/icon-512.png']);
  for (const file of ['icon-192.png', 'icon-512.png']) assert.ok(readFileSync(join(out, file)).length > 100, `${file} ships`);

  // The enhancement script ships, small and inline; the JS flag is set before paint.
  const scripts = [...home.matchAll(/<script type="module"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  assert.equal(scripts.length, 1);
  assert.ok(scripts[0].length < 3000, `script is ${scripts[0].length} bytes`);
  assert.match(scripts[0], /Escape/);
  assert.match(home, /classList\.add\("js"\)/);

  // Content guardrails: no unconfirmed claims, no signup form, no retired photos.
  const text = home.replace(/<[^>]+>/g, ' ');
  assert.doesNotMatch(text, /self-funded|I am spending the year|Leave your email/i);
  // Free English sessions have started (Lina's first-month update); the old hope wording is gone.
  assert.match(text, /I’m learning how to serve there alongside the team/);
  assert.doesNotMatch(text, /I hope to serve with Free English|This year I’m in London/);
  // The first month's longer details open in place (native disclosure).
  assert.match(home, /<details class="more"[^>]*>\s*<summary[^>]*>More from the month<\/summary>/);
  assert.doesNotMatch(home, /<form|lina-steps|group-indoors|group-outdoors/);
  // The only inputs are the photo radios: no signup or text fields.
  for (const input of home.match(/<input[^>]*>/g) ?? []) assert.match(input, /type="radio" name="year-photo"/);

  const clean = audit();
  assert.equal(clean.status, 0, clean.stderr);

  // The audit must catch a planted identifier and a leaked source comment.
  appendFileSync(join(out, 'index.html'), '<p>Ref C1A2B34567D // Copy: note</p>');
  // …an original (unoptimised) source photo that slipped into the output…
  appendFileSync(join(out, '_astro/LinaWithkid.jpg'), 'x');
  // …and contacts beyond Lina's two allowed ones.
  appendFileSync(join(out, 'index.html'), '<a href="mailto:someone@example.org">someone@example.org</a> +44 20 7946 0123 <a href="https://wa.me/447000000000">x</a>');
  const dirty = audit();
  assert.notEqual(dirty.status, 0);
  assert.match(dirty.stderr, /document-number-like identifier/);
  assert.match(dirty.stderr, /leaked source comment/);
  assert.match(dirty.stderr, /LinaWithkid\.jpg: private-source, reference or retired-photo filename/);
  assert.match(dirty.stderr, /LinaWithkid\.jpg: unexpected image/);
  assert.match(dirty.stderr, /email-like text "someone@example\.org"/);
  assert.match(dirty.stderr, /index\.html: phone-number-like text/);
  assert.doesNotMatch(dirty.stderr, /linamak1111/);
});
