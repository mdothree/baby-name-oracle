'use client';

import { useState } from 'react';
import PayButton from './components/PayButton';
import { SiteHeader, SiteFooter } from './components/SiteChrome';
import { NAMES_PAYMENT_LINK, NAMES_PRICE_LABEL } from './lib/checkout';
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
    <>
      <SiteHeader />
      <main id="main-content" className="wrap">
        <section className="hero" aria-labelledby="hero-title">
          <div>
            <p className="label">Baby Name Oracle</p>
            <h1 id="hero-title">A name, <em>read closely.</em></h1>
            <p className="lead">
              Search names by first letter or origin and see each one&rsquo;s meaning. When one stays with you, the report reads
              it in full: US popularity, numerology, and how it sits beside your other children&rsquo;s names.
            </p>
          </div>
          <figure className="specimen" aria-label="Example entry from the name list">
            <span className="label">From the list</span>
            <div className="nm">Theodore</div>
            <span className="tag">Boy</span>
            <dl>
              <dt>Origin</dt><dd>Greek</dd>
              <dt>Meaning</dt><dd>Gift of God</dd>
            </dl>
            <figcaption className="cap">An entry exactly as the search shows it. Popularity and numerology are in the report.</figcaption>
          </figure>
        </section>

        <section className="sec" id="search" aria-labelledby="search-title">
          <div>
            <p className="label">01 · Search</p>
            <h2 id="search-title">Name search</h2>
          </div>
          <div>
            <label className="field" htmlFor="name-query">
              <span>Search by letter or origin</span>
            </label>
            <div className="searchrow">
              <input
                id="name-query"
                type="text"
                placeholder="A, Greek, hebrew girl…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') runSearch();
                }}
              />
              <button className="btn dark" onClick={runSearch}>
                Search names
              </button>
            </div>

            {results === null ? (
              <p className="count">Try a first letter, an origin such as Latin or Hebrew, or leave it empty to see the whole list.</p>
            ) : results.length === 0 ? (
              <div className="state" role="status">
                No names matched &ldquo;{query}&rdquo;. Try a single letter or an origin like Greek, Latin, or Hebrew.
              </div>
            ) : (
              <>
                <p className="count" role="status">
                  {results.length} name{results.length === 1 ? '' : 's'}
                </p>
                <ul className="results">
                  {results.map((n) => (
                    <li key={n.name}>
                      <span className="nm">{n.name}</span>
                      <span><span className="tag">{n.gender}</span></span>
                      <span className="m">
                        {n.origin} <span className="mute">&middot;</span> <span className="mute">{n.meaning}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>

        <section className="sec" id="report" aria-labelledby="report-title">
          <div>
            <p className="label">02 · The report</p>
            <h2 id="report-title">Premium Name Report</h2>
          </div>
          <div className="offer">
            <div className="what">
              <p>For the name you are considering, the report gives you:</p>
              <ol>
                <li>US popularity rank and trend, from US Social Security Administration 2025 birth data</li>
                <li>Meaning and origin for names in our curated set</li>
                <li>Numerology: expression, soul urge and personality numbers, for entertainment</li>
                <li>A sibling check (first letters, endings, rhythm) against your other children&rsquo;s names, plus up to 6 sibling-name suggestions</li>
                <li>Up to 10 more name ideas that match your search</li>
                <li>Download as text, or print</li>
              </ol>
            </div>
            <div className="buy">
              <p className="covers">
                One purchase covers reports for up to 5 different names. After checkout you build your report on our report
                page, <a href="/success">names.mdo3d.com/success</a>.
              </p>
              <div>
                <PayButton
                  paymentLink={NAMES_PAYMENT_LINK}
                  label={`Get Premium Names - ${NAMES_PRICE_LABEL}`}
                />
                <p className="mute small" style={{ marginTop: '12px' }}>Secure checkout by Stripe.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
