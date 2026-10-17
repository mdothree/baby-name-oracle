'use client';

import type { NameReport, Numbers } from '../lib/namesApi';

function NumbersBlock({ title, n }: { title: string; n: Numbers }) {
  return (
    <div>
      <p style={{ marginBottom: 0 }}><strong>{title}</strong> <span className="mute">({n.letters})</span></p>
      <div className="nums">
        <div>
          <div className="label">Expression</div>
          <div className="n">{n.expression.number}</div>
          <div className="k">letter sum {n.expression.letterSum}. {n.expression.keywords}</div>
        </div>
        <div>
          <div className="label">Soul urge</div>
          <div className="n">{n.soulUrge.number}</div>
          <div className="k">letter sum {n.soulUrge.letterSum}. {n.soulUrge.keywords}</div>
        </div>
        <div>
          <div className="label">Personality</div>
          <div className="n">{n.personality.number}</div>
          <div className="k">letter sum {n.personality.letterSum}. {n.personality.keywords}</div>
        </div>
      </div>
    </div>
  );
}

export default function NameReportView({ report: r }: { report: NameReport }) {
  const f = r.ideas.filters;
  const filterLabel = [f.sex === 'F' ? 'girls' : f.sex === 'M' ? 'boys' : '', f.startsWith ? `starting with "${f.startsWith}"` : '', f.origin ? `${f.origin} origin` : '']
    .filter(Boolean)
    .join(', ');
  return (
    <article data-testid="name-report" className="report" aria-label={`Name report for ${r.fullName}`}>
      <p className="label">Name report</p>
      <h2 className="rname">{r.fullName}</h2>
      <p className="meta">Initials {r.initials} &middot; {r.sound.syllables} syllable{r.sound.syllables === 1 ? '' : 's'} ({r.sound.syllablesNote}) &middot; {r.sound.length} letters</p>

      <section className="rsec">
        <h3>Meaning &amp; origin</h3>
        <div>
          {r.meaning.curated ? <p className="big">{r.meaning.meaning} <span className="mute">({r.meaning.origin})</span></p> : <p className="mute">{r.meaning.note}</p>}
        </div>
      </section>

      <section className="rsec">
        <h3>US popularity</h3>
        <div>
          {r.popularity.ranks.length ? (
            <ul>
              {r.popularity.ranks.map((p) => (
                <li key={p.sex}>
                  <strong>#{p.rank}</strong> for {p.label}s, {p.births.toLocaleString('en-US')} births; {p.note}
                </li>
              ))}
            </ul>
          ) : (
            <p>{r.popularity.note}</p>
          )}
          <p className="mute small">Source: {r.popularity.source}.</p>
        </div>
      </section>

      <section className="rsec">
        <h3>Numerology</h3>
        <div>
          <p className="mute small">{r.numerology.system}. {r.numerology.disclaimer}</p>
          <NumbersBlock title="First name" n={r.numerology.firstName} />
          {r.numerology.fullName && <NumbersBlock title="Full name" n={r.numerology.fullName} />}
        </div>
      </section>

      <section className="rsec">
        <h3>Siblings</h3>
        <div>
          {r.siblings.checks.length > 0 && (
            <ul>
              {r.siblings.checks.map((c) => (
                <li key={c.name}>With <strong>{c.name}</strong>: {c.notes.join('; ')}</li>
              ))}
            </ul>
          )}
          <p style={{ marginBottom: '4px' }}><strong>Sibling-name suggestions</strong></p>
          <ul>
            {r.siblings.suggestions.map((s) => (
              <li key={s.name + s.sex}><strong>{s.name}</strong> ({s.label}) <span className="mute">{s.reasons.join(', ')}</span></li>
            ))}
          </ul>
          <p className="mute small">{r.siblings.method}</p>
        </div>
      </section>

      <section className="rsec">
        <h3>More name ideas{filterLabel ? ` (${filterLabel})` : ''}</h3>
        <div>
          <ol>
            {r.ideas.ideas.map((i) => (
              <li key={i.name + i.sex}>
                <strong>{i.name}</strong> ({i.label}){i.rank ? ` #${i.rank}` : ''}
                {i.meaning ? <span className="mute">: {i.meaning}, {i.origin}</span> : null}
              </li>
            ))}
          </ol>
          {r.ideas.notes.map((n) => <p key={n} className="mute small">{n}</p>)}
        </div>
      </section>

      <p className="mute small" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--rule)' }}>Sources: {r.sources.join(' ')}</p>
    </article>
  );
}
