# Deal Reveal

Tired of fake discounts and misleading sales? Deal Reveal brings honesty and clarity to your online shopping.

This lightweight extension checks whether a sale is real by pulling verified price history and comparing offers across multiple stores. Whenever you view a product, Deal Reveal instantly shows you the true price changes, the lowest available offer, and whether the “discount” is actually a discount.

Get reliable information with a single click. No scraping, no guesswork, and no jumping between tabs. Deal Reveal helps you make informed decisions so you never fall for inflated prices or fake markdowns again.

Perfect for everyday shoppers, students, bargain hunters, and anyone who wants real transparency during big sale seasons.

## What it is

- Lightweight Chrome extension that exposes a popup UI and background logic

## Quick install (dev)

1. Open your browser's extensions page (chrome://extensions or edge://extensions).
2. Enable "Developer mode".
3. Click "Load unpacked" and select this repository folder.
4. Click the extension icon to open the popup.

## Files of interest

- `manifest.json` — extension manifest and permissions.
- `background.js` — background/service-worker logic.
- `popup.html`, `popup.js`, `popup.css` — popup UI and behavior.
- `options.html`, `options.js` — optional settings UI.
- `utils.js` — shared utility functions.
- `icons/` — extension icons.

## Development notes

- No build step required — plain HTML/CSS/JS. Edit files directly and reload the extension in developer mode to see changes. 