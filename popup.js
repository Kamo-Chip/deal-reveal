import { extractProductSlug } from "./utils.js";

const $slug = document.getElementById("slug");
const $serper = document.getElementById("serperBtn");
const $result = document.getElementById("result");
const $openOptions = document.getElementById("openOptions");
const $countrySelect = document.getElementById("countrySelect");

async function init() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = tab?.url || "";

  const slug = extractProductSlug(url);
  $slug.value = slug;
  $serper.disabled = !slug;

  $serper.addEventListener("click", async () => {
    $result.textContent = "Searching (shopping)…";
    const payload = {
      q: slug,
      gl: $countrySelect.value || "za",
    };

    chrome.runtime.sendMessage(
      { type: "serper.search", endpoint: "shopping", payload },
      (resp) => {
        if (!resp || !resp.ok) {
          $result.innerHTML = `Error: ${resp?.status || ""} ${
            resp?.error || "Unknown"
          }`;
          return;
        }
        const link = resp.data.shopping[0]?.link || "";
        if (link) {
          $result.innerHTML = `<a href="${link}" target="_blank" rel="noopener noreferrer">Verify</a>`;
        } else {
          $result.textContent = "No shopping results found.";
        }
      }
    );
  });

  $openOptions.addEventListener("click", (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });
}
init();
