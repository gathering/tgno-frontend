export const prerender = false;

import.meta.env.SITE_URL;

var prod_robots = `User-agent: *
Disallow: /api/
Disallow: /admin/
Disallow: /django-admin/`;

var dev_robots = `User-agent: *
Disallow: /`;

/**
 * GET Request
 */
export async function GET() {
  if (import.meta.env.SITE_URL == "https://www.tg.no/") {
    return new Response(prod_robots, {
      status: 200,
    });
  }
  return new Response(dev_robots, {
    status: 200,
  });
}
