const $apiKey = document.getElementById("apiKey");
const $save = document.getElementById("saveBtn");
const $status = document.getElementById("status");

(async function init() {
  const { apiKey } = await chrome.storage.sync.get({ apiKey: "" });
  if (apiKey) $apiKey.value = apiKey;
})();

$save.addEventListener("click", async () => {
  await chrome.storage.sync.set({ apiKey: $apiKey.value.trim() });
  $status.textContent = "Saved!";
  setTimeout(() => ($status.textContent = ""), 1200);
});
