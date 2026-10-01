import type { APIRoute } from 'astro';

// Previews stay non-indexable until a production URL is configured.
export const GET: APIRoute = ({ site }) =>
  new Response(site ? `User-agent: *\nAllow: /\n` : `User-agent: *\nDisallow: /\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
