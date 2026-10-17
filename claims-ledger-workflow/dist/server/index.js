export default {
  async fetch(request, env) {
    if (env?.ASSETS?.fetch) return env.ASSETS.fetch(request);
    return new Response("Claims & Ledger Workflow Lab", {
      headers: { "content-type": "text/plain; charset=utf-8" }
    });
  }
};
