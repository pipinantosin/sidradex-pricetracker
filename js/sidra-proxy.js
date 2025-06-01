export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = "https://node.sidrachain.com";

    // Proxy semua request POST ke RPC
    if (request.method === "POST") {
      const body = await request.text();
      const proxied = await fetch(target, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      const result = await proxied.text();
      return new Response(result, {
        headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" }
      });
    }

    return new Response("Only POST supported", { status: 405 });
  }
}
