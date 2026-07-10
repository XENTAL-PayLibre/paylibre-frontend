// Lightweight health endpoint for the load balancer / Traefik.
export const dynamic = "force-dynamic";

export function GET() {
  return new Response("ok", { status: 200, headers: { "content-type": "text/plain" } });
}
