// Client for the premium report API (numerology-api, POST /api/names/*).
// The API verifies the Stripe Checkout Session server-side before returning a report.

export const NAMES_API_URL = (process.env.NEXT_PUBLIC_NAMES_API_URL || 'https://numerology-api.vercel.app').replace(/\/$/, '');

// The 8 origins in the curated set (same names as app/page.tsx).
export const CURATED_ORIGINS = ['English', 'French', 'Germanic', 'Greek', 'Hebrew', 'Irish', 'Latin', 'Scandinavian'];

export const LAST_SEARCH_KEY = 'bno:lastSearch';

export type Sex = 'F' | 'M';
type NumberEntry = { number: number; letterSum: number; keywords: string };
export type Numbers = { letters: string; expression: NumberEntry; soulUrge: NumberEntry; personality: NumberEntry };

export type NameReport = {
  product: string;
  name: string;
  surname: string | null;
  fullName: string;
  initials: string;
  meaning: { curated: true; origin: string; meaning: string } | { curated: false; note: string };
  popularity: {
    source: string;
    year: number;
    ranks: { sex: Sex; label: string; rank: number; births: number; prevRank: number | null; trend: string; note: string }[];
    note: string | null;
  };
  sound: { syllables: number; syllablesNote: string; length: number };
  numerology: { system: string; disclaimer: string; firstName: Numbers; fullName: Numbers | null };
  siblings: {
    checks: { name: string; sameInitial: boolean; sameEnding: boolean; syllables: number; notes: string[] }[];
    suggestions: { name: string; sex: Sex; label: string; rank: number; reasons: string[] }[];
    method: string;
  };
  ideas: {
    filters: { sex: Sex | null; startsWith: string | null; origin: string | null };
    ideas: { name: string; sex: Sex; label: string; rank: number | null; origin?: string; meaning?: string }[];
    notes: string[];
  };
  sources: string[];
};

export type ReportRequest = {
  name: string;
  surname?: string;
  siblings?: string[];
  filters?: { sex?: string; startsWith?: string; origin?: string };
};

export type ReportResponse =
  | { success: true; report: NameReport; text: string; reportsUsed: number; reportsAllowed: number }
  | { success: false; error: string };

async function post(path: string, body: unknown): Promise<ReportResponse> {
  try {
    const res = await fetch(`${NAMES_API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => null);
    if (json && typeof json === 'object' && 'success' in json) return json as ReportResponse;
    return { success: false, error: `The report service answered with an error (${res.status}). Please try again.` };
  } catch {
    return { success: false, error: 'Could not reach the report service. Check your connection and try again.' };
  }
}

export const fetchReport = (sessionId: string, req: ReportRequest) =>
  post('/api/names/report', { session_id: sessionId, ...req });

export const fetchReportByEmail = (email: string, cardLast4: string, req: ReportRequest) =>
  post('/api/names/report-by-email', { email, card_last4: cardLast4, ...req });

/** Turns the visitor's last search ("a", "greek", "hebrew girl") into report filters. */
export function filtersFromSearch(raw: string | null): { sex: string; startsWith: string; origin: string } {
  const out = { sex: '', startsWith: '', origin: '' };
  if (!raw) return out;
  for (const w of raw.toLowerCase().split(/[\s,]+/).filter(Boolean)) {
    const origin = CURATED_ORIGINS.find((o) => o.toLowerCase() === w);
    if (origin) out.origin = origin;
    else if (w === 'girl' || w === 'girls') out.sex = 'F';
    else if (w === 'boy' || w === 'boys') out.sex = 'M';
    else if (/^[a-z]{1,10}$/.test(w) && !out.startsWith) out.startsWith = w;
  }
  return out;
}
