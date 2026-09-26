# Petalora Landing Page

Sellable single-page landing for **Petalora** — an AI-inspired botanical daily planner digital product (€12 one-time).

German UI copy · cream / sage / dusty rose / terracotta · works fully offline.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Landing page (hero, benefits, mock, price, CTA, footer) |
| `styles.css` | Botanical theme styles |
| `main.js` | Checkout wiring (reads `CHECKOUT_URL`) |
| `config.js` | Your live checkout URL (start empty) |
| `config.example.js` | How to set Stripe / Gumroad / Whop |
| `ads/` | Meta, Google, TikTok copy + creative briefs + budget |

## Connect checkout

1. Copy the example and edit:

```bash
cp config.example.js config.js
```

2. Set `CHECKOUT_URL` in `config.js` to your payment link, e.g.:

```js
export const CHECKOUT_URL = 'https://buy.stripe.com/xxxxx';
```

3. Refresh the page. Buy buttons (`#buy` / `.buy-btn`) navigate to that URL.

If `CHECKOUT_URL` is empty (`''`), buttons show a polite disabled state: **„Checkout wird verbunden…“**.

CTA markup (for injection / search):

```html
<!-- CHECKOUT_URL will be injected via config.js -->
<a id="buy" href="#" class="buy-btn">Jetzt kaufen — €12</a>
```

## Host locally

```bash
cd petalora-landing
# Any static server works. Examples:
python3 -m http.server 8080
# or
npx --yes serve .
```

Open `http://localhost:8080`.  
(`file://` may block ES modules — prefer a local server.)

## Deploy: Netlify Drop

1. Open [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `petalora-landing` folder
3. Done — you get a `*.netlify.app` URL

Set `CHECKOUT_URL` in `config.js` **before** uploading (or use Netlify env + a tiny build step later).

## Deploy: GitHub Pages

1. Create a repo and push this folder (as root or `/docs`)
2. Settings → Pages → Source: Deploy from branch → `main` / `/ (root)` or `/docs`
3. Site URL: `https://<user>.github.io/<repo>/`

Again: commit `config.js` with your real `CHECKOUT_URL`, or keep secrets out of git and inject at deploy time.

## Product notes

- Price: **€12 once** (launch). Range note on page: €9–19.
- Support: `teamcashchefflow@gmail.com`
- Digital download · no shipping
- Privacy claim: localStorage (no invented revenue metrics)

## Ads package

See `ads/` for Meta, Google RSA, TikTok scripts, image creative briefs, and a €5–10/day budget plan.

## Do not

- Invent revenue claims in ads or on-page
- Call paid APIs from this static page
- Register domains or spend money from this repo
