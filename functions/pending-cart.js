const KEY = "pending-cart";

export async function onRequest({ request, env }) {
    if (request.method === "POST") {
        const orders = await request.json();
        await env.KOPI.put(KEY, JSON.stringify(orders), { expirationTtl: 14400 });
        return new Response("OK");
    }

    // GET — return stored cart (for bookmarklet)
    const raw = await env.KOPI.get(KEY);
    if (!raw) return new Response("null", { headers: { "Content-Type": "application/json" } });
    return new Response(raw, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    });
}
