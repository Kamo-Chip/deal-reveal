chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  (async () => {
    try {
      if (!msg || !msg.type?.startsWith("serper.")) return;

      const { endpoint = "search", payload = {} } = msg;
      const { apiKey } = await chrome.storage.sync.get({ apiKey: "" });

      if (!apiKey) {
        sendResponse({
          ok: false,
          error:
            'Missing API key <ol style="text-align: left; display: grid; grid-template-columns: 1fr; grid-template-rows: repeat(1fr, 4); gap: .25rem;"><li>Sign up with <a href="https://serper.dev" target="_blank">Serper.dev</a></li><li>Navigate to the API keys tab</li><li>Copy your API key</li><li>Paste your key using the link below labelled "Set API Key"</li></ol><p>You will be able to make 1500 deal reveals. (You can always sign up with a different email address and paste the new API key for more)</p>',
        });
        return;
      }

      const path =
        endpoint === "shopping"
          ? "shopping"
          : endpoint === "images"
          ? "images"
          : endpoint === "news"
          ? "news"
          : "search";

      const res = await fetch(`https://google.serper.dev/${path}`, {
        method: "POST",
        headers: {
          "X-API-KEY": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        sendResponse({
          ok: false,
          status: res.status,
          error: text || "HTTP error",
        });
        return;
      }

      const data = await res.json();
      sendResponse({ ok: true, data });
    } catch (e) {
      sendResponse({ ok: false, error: String(e) });
    }
  })();

  // Keep the message channel open for async response
  return true;
});
