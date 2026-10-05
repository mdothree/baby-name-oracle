'use client';

import { useState } from 'react';
import PayButton from './components/PayButton';

type BabyName = {
  name: string;
  gender: 'girl' | 'boy';
  origin: string;
  meaning: string;
};

// Local free dataset so the free search returns real results client-side.
// Premium (detailed reports, numerology, combinations) stays behind checkout.
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

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BabyName[] | null>(null);

  const runSearch = () => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults(NAMES);
      return;
    }
    const matches = NAMES.filter(
      (n) =>
        n.name.toLowerCase().startsWith(q) ||
        n.origin.toLowerCase().includes(q)
    );
    setResults(matches);
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Baby Name Oracle</h1>
      <p style={{ fontSize: '1.2rem', color: '#666' }}>
        Discover the perfect name for your baby
      </p>

      <section style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <h2>Free Search</h2>
        <p>Search for names by letter or origin:</p>
        <input
          type="text"
          placeholder="Enter a letter or origin..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') runSearch();
          }}
          style={{
            padding: '10px',
            width: '100%',
            maxWidth: '300px',
            marginTop: '0.5rem',
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
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Search Free
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
                    <strong>{n.name}</strong> <span style={{ color: '#888' }}>({n.gender})</span>
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
        <ul>
          <li>Detailed name meanings</li>
          <li>Name origin & history</li>
          <li>Popularity rankings</li>
          <li>Numerology analysis</li>
          <li>Name combinations for siblings</li>
        </ul>
        <PayButton
          paymentLink="https://buy.stripe.com/eVqeVc6l20HL1hW97Z8k802"
          priceId="price_babynames_basic"
          label="Get Premium Names - $2.99"
        />
      </section>

      <p style={{ color: '#666', marginTop: '3rem', fontSize: '0.9rem' }}>
        Deployed via Project HACK
      </p>
    </main>
  );
}
