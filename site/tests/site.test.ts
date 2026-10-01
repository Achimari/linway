// Builds the real site into a scratch folder and checks the one-page route
// contract, the two public actions, the no-JS panel contract, and that the
// privacy audit has teeth. (Open/close/focus logic: tests/panels.test.ts.)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { appendFileSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const out = join(root, 'tests/.out');
const read = (rel: string) => readFileSync(join(out, rel), 'utf8');
const audit = () => spawnSync('node', ['scripts/audit-dist.ts'], { cwd: root, env: { ...process.env, LINWAY_DIST: out }, encoding: 'utf8' });
const panels = ['story', 'year', 'prayer'];

test('single-page site: routes, actions, panels and audit', { timeout: 180_000 }, (t) => {
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

  // Links: three in-page index anchors (the no-JS path), then the two actions.
  const hrefs = [...home.matchAll(/<a [^>]*href="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(hrefs, ['#story', '#year', '#prayer', 'https://www.stewardship.org.uk/partners/20645926', 'https://www.instagram.com/linren__/']);
  assert.match(home, /Give through Stewardship/);

  // Every index anchor has a matching, labelled sheet with real text in the HTML,
  // and a close button that stays hidden until the script enables it.
  for (const id of panels) {
    const sheet = home.match(new RegExp(`<section[^>]*id="${id}"[^>]*>([\\s\\S]*?)</section>`));
    assert.ok(sheet, `sheet #${id} exists`);
    assert.match(sheet[0], new RegExp(`aria-labelledby="${id}-title"`));
    assert.match(sheet[0], new RegExp(`id="${id}-title"`));
    assert.match(sheet[1], /<button[^>]*data-close[^>]*hidden/);
    assert.ok(sheet[1].replace(/<[^>]+>/g, '').trim().length > 60, `#${id} has readable text`);
  }

  // The index marker is decorative and starts hidden; icons: SVG, PNG fallback, touch icon.
  assert.match(home, /<span[^>]*class="index-marker"[^>]*aria-hidden="true"/);
  for (const [href, file] of [['/favicon.svg', 'favicon.svg'], ['/favicon-32.png', 'favicon-32.png'], ['/apple-touch-icon.png', 'apple-touch-icon.png']]) {
    assert.match(home, new RegExp(`href="${href}"`));
    assert.ok(readFileSync(join(out, file)).length > 100, `${file} ships`);
  }

  // The panel script ships, small and inline; the JS flag is set before paint.
  const scripts = [...home.matchAll(/<script type="module"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  assert.equal(scripts.length, 1);
  assert.ok(scripts[0].length < 5000, `panel script is ${scripts[0].length} bytes`);
  assert.match(scripts[0], /Escape/);
  assert.match(home, /classList\.add\("js"\)/);

  // Content guardrails: no unconfirmed claims, no signup form, no retired photos.
  const text = home.replace(/<[^>]+>/g, ' ');
  assert.doesNotMatch(text, /Free English|self-funded|I am spending the year|Leave your email/i);
  assert.doesNotMatch(home, /<form|<input|lina-steps|group-indoors|group-outdoors/);

  const clean = audit();
  assert.equal(clean.status, 0, clean.stderr);

  // The audit must catch a planted identifier and a leaked source comment.
  appendFileSync(join(out, 'index.html'), '<p>Ref C1A2B34567D // Copy: note</p>');
  const dirty = audit();
  assert.notEqual(dirty.status, 0);
  assert.match(dirty.stderr, /document-number-like identifier/);
  assert.match(dirty.stderr, /leaked source comment/);
});
