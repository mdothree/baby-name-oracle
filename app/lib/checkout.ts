// Baby Name Oracle checkout (MDO-NAMES-PRICE (a), 2026-10-14): $3 one-time.
// The link URL is filled in by ~/mdo3d/staged/pricing/PRICING_GO.sh from out/new_ids.json (names_link_url)
// right before deploy; the script refuses to ship while the placeholder is still here.
// The previous link (buy.stripe.com/...8k802, the old price) stays active in Stripe (never paused); the site no longer links to it.
export const NAMES_PAYMENT_LINK = '__NAMES_PAYMENT_LINK_URL__';
export const NAMES_PRICE_LABEL = '$3';
