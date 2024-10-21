export const prerender = false;

/**
 * GET Request with JSON response
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
 * HEAD Request. Just return 204
 */
export function HEAD() {
  return new Response(null, {
    status: 204,
  });
}
