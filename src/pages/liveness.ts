export const prerender = false;

/**
 * GET Request with JSON response
 * @returns {Response}
 */
export async function GET() {
  return new Response(JSON.stringify({ alive: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

/**
 * HEAD Request
 * @returns {Response}
 */
export function HEAD() {
  return new Response(null, {
    status: 204,
  });
}
