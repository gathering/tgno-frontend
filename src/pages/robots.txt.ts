export const prerender = false;

import { SITE_URL } from "../utils/runtime-env";

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
  if (SITE_URL == "https://www.tg.no/") {
    return new Response(prod_robots, {
      status: 200,
    });
  }
  return new Response(dev_robots, {
    status: 200,
  });
}
