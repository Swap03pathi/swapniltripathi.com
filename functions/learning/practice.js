// /learning/practice (no trailing slash) -> /learning/practice/ so the app's relative URLs resolve.
export function onRequest({ request }) {
  const url = new URL(request.url);
  return Response.redirect(`${url.origin}/learning/practice/${url.search}`, 301);
}
