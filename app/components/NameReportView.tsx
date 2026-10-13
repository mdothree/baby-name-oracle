'use client';

import type { NameReport, Numbers } from '../lib/namesApi';

const box: React.CSSProperties = { padding: '1rem 1.25rem', border: '1px solid #e5e5e5', borderRadius: '8px', marginTop: '1rem', textAlign: 'left' };
const muted: React.CSSProperties = { color: '#555', fontSize: '0.9rem' };

function NumbersBlock({ title, n }: { title: string; n: Numbers }) {
  return (
    <div style={{ marginTop: '0.5rem' }}>
      <strong>{title}</strong> <span style={muted}>({n.letters})</span>
      <ul style={{ margin: '0.25rem 0 0', paddingLeft: '1.25rem' }}>
        <li>Expression: <strong>{n.expression.number}</strong> <span style={muted}>(letter sum {n.expression.letterSum}) {n.expression.keywords}</span></li>
        <li>Soul urge: <strong>{n.soulUrge.number}</strong> <span style={muted}>(letter sum {n.soulUrge.letterSum}) {n.soulUrge.keywords}</span></li>
        <li>Personality: <strong>{n.personality.number}</strong> <span style={muted}>(letter sum {n.personality.letterSum}) {n.personality.keywords}</span></li>
      </ul>
    </div>
  );
}

export default function NameReportView({ report: r }: { report: NameReport }) {
  const f = r.ideas.filters;
  const filterLabel = [f.sex === 'F' ? 'girls' : f.sex === 'M' ? 'boys' : '', f.startsWith ? `starting with "${f.startsWith}"` : '', f.origin ? `${f.origin} origin` : '']
    .filter(Boolean)
    .join(', ');
  return (
    <article data-testid="name-report" aria-label={`Name report for ${r.fullName}`}>
      <h2 style={{ marginBottom: 0 }}>{r.fullName}</h2>
      <p style={muted}>Initials {r.initials} &middot; {r.sound.syllables} syllable{r.sound.syllables === 1 ? '' : 's'} ({r.sound.syllablesNote}) &middot; {r.sound.length} letters</p>

      <section style={box}>
        <h3 style={{ marginTop: 0 }}>Meaning &amp; origin</h3>
        {r.meaning.curated ? <p>{r.meaning.meaning} <span style={muted}>({r.meaning.origin})</span></p> : <p style={muted}>{r.meaning.note}</p>}
      </section>

      <section style={box}>
        <h3 style={{ marginTop: 0 }}>US popularity</h3>
        {r.popularity.ranks.length ? (
          <ul style={{ paddingLeft: '1.25rem' }}>
            {r.popularity.ranks.map((p) => (
              <li key={p.sex}>
                <strong>#{p.rank}</strong> for {p.label}s, {p.births.toLocaleString('en-US')} births; {p.note}
              </li>
            ))}
          </ul>
        ) : (
          <p>{r.popularity.note}</p>
        )}
        <p style={muted}>Source: {r.popularity.source}.</p>
      </section>

      <section style={box}>
        <h3 style={{ marginTop: 0 }}>Numerology</h3>
        <p style={muted}>{r.numerology.system}. {r.numerology.disclaimer}</p>
        <NumbersBlock title="First name" n={r.numerology.firstName} />
        {r.numerology.fullName && <NumbersBlock title="Full name" n={r.numerology.fullName} />}
      </section>

      <section style={box}>
        <h3 style={{ marginTop: 0 }}>Siblings</h3>
        {r.siblings.checks.length > 0 && (
          <ul style={{ paddingLeft: '1.25rem' }}>
            {r.siblings.checks.map((c) => (
              <li key={c.name}>With <strong>{c.name}</strong>: {c.notes.join('; ')}</li>
            ))}
          </ul>
        )}
        <p style={{ marginBottom: '0.25rem' }}><strong>Sibling-name suggestions</strong></p>
        <ul style={{ paddingLeft: '1.25rem', marginTop: 0 }}>
          {r.siblings.suggestions.map((s) => (
            <li key={s.name + s.sex}><strong>{s.name}</strong> ({s.label}) <span style={muted}>{s.reasons.join(', ')}</span></li>
          ))}
        </ul>
        <p style={muted}>{r.siblings.method}</p>
      </section>

      <section style={box}>
        <h3 style={{ marginTop: 0 }}>More name ideas{filterLabel ? ` (${filterLabel})` : ''}</h3>
        <ol style={{ paddingLeft: '1.5rem' }}>
          {r.ideas.ideas.map((i) => (
            <li key={i.name + i.sex}>
              <strong>{i.name}</strong> ({i.label}){i.rank ? ` #${i.rank}` : ''}
              {i.meaning ? <span style={muted}>: {i.meaning}, {i.origin}</span> : null}
            </li>
          ))}
        </ol>
        {r.ideas.notes.map((n) => <p key={n} style={muted}>{n}</p>)}
      </section>

      <p style={{ ...muted, marginTop: '1rem' }}>Sources: {r.sources.join(' ')}</p>
    </article>
  );
}
