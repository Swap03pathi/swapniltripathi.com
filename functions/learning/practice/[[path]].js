// Cloudflare Pages Function: serves techquiz at https://www.swapniltripathi.com/learning/practice/
// by proxying to the EC2 origin. The techquiz front end uses relative URLs, so stripping the
// prefix is all that is needed. Origin lives in its own repo (Swap03pathi/techquiz).
const ORIGIN = 'https://quiz.swapniltripathi.com';
const PREFIX = '/learning/practice';

export async function onRequest({ request }) {
  const url = new URL(request.url);
  // Bare /learning/practice would break the app's relative URLs: send it to the slash form.
  if (url.pathname === PREFIX) {
    return Response.redirect(`${url.origin}${PREFIX}/${url.search}`, 301);
  }
  const target = new URL(url.pathname.slice(PREFIX.length) || '/', ORIGIN);
  target.search = url.search;

  const headers = new Headers(request.headers);
  headers.set('X-Forwarded-Host', url.host);
  headers.set('X-Forwarded-Proto', 'https');

  const upstream = await fetch(target.toString(), {
    method: request.method,
    headers,
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
    redirect: 'manual',
  });

  // Rewrite any absolute redirect from the origin back under the prefix.
  const location = upstream.headers.get('location');
  if (location && location.startsWith(ORIGIN)) {
    const res = new Response(upstream.body, upstream);
    res.headers.set('location', PREFIX + location.slice(ORIGIN.length));
    return res;
  }
  return upstream;
}
