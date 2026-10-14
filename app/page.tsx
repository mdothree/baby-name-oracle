'use client';

import { useState } from 'react';
import PayButton from './components/PayButton';
import { LAST_SEARCH_KEY } from './lib/namesApi';

type BabyName = {
  name: string;
  gender: 'girl' | 'boy';
  origin: string;
  meaning: string;
};

// Curated dataset so the search returns real results client-side. The paid
// report (SSA popularity, numerology, sibling ideas) comes from the API after checkout.
const NAMES: BabyName[] = [
  { name: 'Sophia', gender: 'girl', origin: 'Greek', meaning: 'Wisdom' },
  { name: 'Emma', gender: 'girl', origin: 'Germanic', meaning: 'Whole, universal' },
  { name: 'Olivia', gender: 'girl', origin: 'Latin', meaning: 'Olive tree' },
  { name: 'Ava', gender: 'girl', origin: 'Latin', meaning: 'Like a bird' },
  { name: 'Isabella', gender: 'girl', origin: 'Hebrew', meaning: 'Devoted to God' },
  { name: 'Mia', gender: 'girl', origin: 'Scandinavian', meaning: 'Mine, beloved' },
  { name: 'Charlotte', gender: 'girl', origin: 'French', meaning: 'Free woman' },
  { name: 'Amelia', gender: 'girl', origin: 'Germanic', meaning: 'Industrious' },
  { name: 'Harper', gender: 'girl', origin: 'English', meaning: 'Harp player' },
  { name: 'Evelyn', gender: 'girl', origin: 'English', meaning: 'Wished for child' },
  { name: 'Liam', gender: 'boy', origin: 'Irish', meaning: 'Strong protector' },
  { name: 'Noah', gender: 'boy', origin: 'Hebrew', meaning: 'Rest, comfort' },
  { name: 'Oliver', gender: 'boy', origin: 'Latin', meaning: 'Olive tree' },
  { name: 'James', gender: 'boy', origin: 'Hebrew', meaning: 'Supplanter' },
  { name: 'William', gender: 'boy', origin: 'Germanic', meaning: 'Resolute protector' },
  { name: 'Lucas', gender: 'boy', origin: 'Greek', meaning: 'Light' },
  { name: 'Henry', gender: 'boy', origin: 'Germanic', meaning: 'Ruler of home' },
  { name: 'Alexander', gender: 'boy', origin: 'Greek', meaning: 'Defender of men' },
  { name: 'Benjamin', gender: 'boy', origin: 'Hebrew', meaning: 'Son of the right hand' },
  { name: 'Theodore', gender: 'boy', origin: 'Greek', meaning: 'Gift of God' },
];

// Name matches by prefix (so "a" means names starting with A, not names whose
// origin merely contains an "a"). Origin and gender match only as whole words
// ("greek", "hebrew", "boy", "girls"), never as substrings.
function matchesName(n: BabyName, rawQuery: string): boolean {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return true;
  const name = n.name.toLowerCase();
  if (name.startsWith(q)) return true;
  const originWords = n.origin.toLowerCase().split(/[^a-z]+/).filter(Boolean);
  // Every word must match, so "hebrew girl" narrows rather than widens.
  return q
    .split(/[\s,]+/)
    .filter(Boolean)
    .every(
      (w) =>
        name.startsWith(w) ||
        (w.length >= 2 &&
          (originWords.includes(w) || w === n.gender || w === `${n.gender}s`))
    );
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BabyName[] | null>(null);

  const runSearch = () => {
    const q = query.trim().toLowerCase();
    try {
      // The report page pre-fills its name-ideas filters from the last search.
      window.localStorage.setItem(LAST_SEARCH_KEY, q);
    } catch {
      /* storage unavailable */
    }
    if (!q) {
      setResults(NAMES);
      return;
    }
    setResults(NAMES.filter((n) => matchesName(n, q)));
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '800px', margin: '0 auto' }}>
      <main id="main-content">
      <h1>Baby Name Oracle</h1>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>
        Discover the perfect name for your baby
      </p>

      <section style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h2>Name Search</h2>
        <p>Search for names by letter or origin:</p>
        <input
          type="text"
          placeholder="Enter a letter or origin..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') runSearch();
          }}
          aria-label="Search names by letter or origin"
          style={{
            padding: '10px 12px',
            width: '100%',
            maxWidth: '300px',
            marginTop: '0.5rem',
            font: 'inherit',
            fontSize: '1rem',
            color: '#222',
            backgroundColor: '#fff',
            border: '1px solid #bbb',
            borderRadius: '6px',
            boxSizing: 'border-box',
          }}
        />
        <button
          onClick={runSearch}
          style={{
            display: 'block',
            marginTop: '1rem',
            padding: '10px 20px',
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            font: 'inherit',
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          Search Names
        </button>

        {results !== null && (
          <div style={{ marginTop: '1.5rem' }}>
            {results.length === 0 ? (
              <p style={{ color: '#666' }}>
                No names matched &ldquo;{query}&rdquo;. Try a single letter or an origin like Greek, Latin, or Hebrew.
              </p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.75rem' }}>
                {results.map((n) => (
                  <li
                    key={n.name}
                    style={{ padding: '0.75rem 1rem', backgroundColor: 'white', borderRadius: '6px', border: '1px solid #eee' }}
                  >
                    <strong>{n.name}</strong> <span style={{ color: '#666' }}>({n.gender})</span>
                    <div style={{ color: '#666', fontSize: '0.9rem' }}>
                      {n.origin} &middot; {n.meaning}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>

      <section style={{ marginTop: '2rem', padding: '1.5rem', border: '2px solid #635bff', borderRadius: '8px' }}>
        <h2>Premium Name Report</h2>
        <p>For the name you are considering, the report gives you:</p>
        <ul>
          <li>US popularity rank and trend, from US Social Security Administration 2025 birth data</li>
          <li>Meaning and origin for names in our curated set</li>
          <li>Numerology: expression, soul urge and personality numbers, for entertainment</li>
          <li>A sibling check (first letters, endings, rhythm) against your other children&rsquo;s names, plus up to 6 sibling-name suggestions</li>
          <li>Up to 10 more name ideas that match your search</li>
          <li>Download as text, or print</li>
        </ul>
        <p style={{ color: '#555', fontSize: '0.9rem' }}>One purchase covers reports for up to 5 different names. After checkout you build your report on our report page, <a href="/success" style={{ color: '#635bff' }}>names.mdo3d.com/success</a>.</p>
        <PayButton
          paymentLink="https://buy.stripe.com/eVqeVc6l20HL1hW97Z8k802"
          priceId="price_babynames_basic"
          label="Get Premium Names - $2.99"
        />
      </section>
      </main>

      <footer style={{ marginTop: '2rem', textAlign: 'center', color: '#666', fontSize: '0.9rem' }}>
        <p>For reflection and entertainment; not professional advice.</p>
        <p><a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="/refund">Refunds</a> · <a href="/contact">Contact</a></p>
      </footer>
    </div>
  );
}
