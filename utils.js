export function extractProductSlug(rawUrl) {
  try {
    const url = new URL(rawUrl);
    const host = url.hostname.toLowerCase();
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts.length === 0) return "";

    if (host.endsWith("takealot.com")) {
      const last = parts[parts.length - 1];
      const isPLID = /^PLID\d+$/i.test(last);
      if (isPLID && parts.length >= 2)
        return sanitizeSlug(parts[parts.length - 2]);
    } else if (host.includes("amazon.") || host.includes("makro.")) {
        return sanitizeSlug(parts[0]);
    }

    return "Manually enter product name"
  } catch {
    return "Manually enter product name";
  }
}

function sanitizeSlug(seg) {
  let s = decodeURIComponent(seg);
  s = s.replace(/\.[a-z0-9]+$/i, "");
  s = s
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
  return s;
}
