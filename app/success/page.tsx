'use client';

import { useEffect, useState } from 'react';
import NameReportView from '../components/NameReportView';
import { SiteHeader, SiteFooter } from '../components/SiteChrome';
import {
  CURATED_ORIGINS,
  LAST_SEARCH_KEY,
  fetchReport,
  fetchReportByEmail,
  filtersFromSearch,
  type NameReport,
  type ReportRequest,
} from '../lib/namesApi';

const SESSION_RE = /^cs_(live|test)_[A-Za-z0-9]{10,250}$/;

export default function Success() {
  const [ready, setReady] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [siblings, setSiblings] = useState('');
  const [sex, setSex] = useState('');
  const [startsWith, setStartsWith] = useState('');
  const [origin, setOrigin] = useState('');
  const [email, setEmail] = useState('');
  const [last4, setLast4] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<NameReport | null>(null);
  const [text, setText] = useState('');
  const [usage, setUsage] = useState<string | null>(null);

  useEffect(() => {
    const sid = new URLSearchParams(window.location.search).get('session_id');
    setSessionId(sid && SESSION_RE.test(sid) ? sid : null);
    try {
      const f = filtersFromSearch(window.localStorage.getItem(LAST_SEARCH_KEY));
      setSex(f.sex);
      setStartsWith(f.startsWith);
      setOrigin(f.origin);
    } catch {
      /* storage unavailable */
    }
    setReady(true);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError('Please enter a first name.');
      return;
    }
    const req: ReportRequest = {
      name: name.trim(),
      ...(surname.trim() ? { surname: surname.trim() } : {}),
      siblings: siblings.split(',').map((s) => s.trim()).filter(Boolean),
      filters: { ...(sex ? { sex } : {}), ...(startsWith.trim() ? { startsWith: startsWith.trim() } : {}), ...(origin ? { origin } : {}) },
    };
    setBusy(true);
    const res = sessionId ? await fetchReport(sessionId, req) : await fetchReportByEmail(email.trim(), last4.trim(), req);
    setBusy(false);
    if (res.success) {
      setReport(res.report);
      setText(res.text);
      setUsage(`This purchase has been used for ${res.reportsUsed} of ${res.reportsAllowed} names.`);
    } else {
      setReport(null);
      setError(res.error);
    }
  };

  const download = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `name-report-${(report?.fullName || 'baby-name').toLowerCase().replace(/[^a-z]+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="no-print"><SiteHeader /></div>
      <main id="main-content" className="wrap">
        <section className="sec" aria-labelledby="success-title" style={{ borderBottom: 0 }}>
          <div>
            <p className="label">Premium Name Report</p>
            <h2 id="success-title" style={{ fontSize: '44px' }}>Your Premium Name Report</h2>
          </div>
          <div>
            {!ready ? (
              <div aria-hidden="true" className="state">Loading your purchase…</div>
            ) : (
              <>
                {sessionId ? (
                  <p data-testid="paid-intro" className="lead" style={{ marginBottom: '28px' }}>
                    Thank you for your purchase. Enter the name you are considering and we will build its report.
                  </p>
                ) : (
                  <div data-testid="email-intro" className="note">
                    <p>
                      <strong>Already paid?</strong> After checkout you should land on this page with your purchase attached. If you paid
                      earlier, or closed the page, find your report with the email you entered at checkout and the last 4 digits of the
                      card you paid with.
                    </p>
                    <p style={{ marginBottom: 0 }}>
                      Haven&rsquo;t bought a report? <a href="/">See what it includes</a>.
                    </p>
                  </div>
                )}

                <form onSubmit={submit} className="no-print" aria-label="Report details">
                  {!sessionId && (
                    <div className="grid2">
                      <label className="field">
                        <span>Checkout email</span>
                        <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </label>
                      <label className="field">
                        <span>Last 4 digits of the card you paid with</span>
                        <input className="w-sm" inputMode="numeric" pattern="[0-9]{4}" maxLength={4} required value={last4} onChange={(e) => setLast4(e.target.value.replace(/\D/g, ''))} />
                      </label>
                    </div>
                  )}
                  <div className="grid2">
                    <label className="field">
                      <span>First name <span className="hint">(the name you are considering)</span></span>
                      <input required maxLength={40} value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label className="field">
                      <span>Surname <span className="hint">(optional, adds full-name numerology and initials)</span></span>
                      <input maxLength={40} value={surname} onChange={(e) => setSurname(e.target.value)} />
                    </label>
                  </div>
                  <label className="field">
                    <span>Siblings&rsquo; names <span className="hint">(optional, comma separated)</span></span>
                    <input maxLength={250} value={siblings} onChange={(e) => setSiblings(e.target.value)} />
                  </label>
                  <fieldset>
                    <legend className="legend">Name ideas filters <span className="hint">(optional)</span></legend>
                    <div className="grid3">
                      <label className="field">
                        <span>For</span>
                        <select value={sex} onChange={(e) => setSex(e.target.value)}>
                          <option value="">Girls and boys</option>
                          <option value="F">Girls</option>
                          <option value="M">Boys</option>
                        </select>
                      </label>
                      <label className="field">
                        <span>Starting with</span>
                        <input maxLength={10} value={startsWith} onChange={(e) => setStartsWith(e.target.value)} />
                      </label>
                      <label className="field">
                        <span>Origin <span className="hint">(our curated names only)</span></span>
                        <select value={origin} onChange={(e) => setOrigin(e.target.value)}>
                          <option value="">Any</option>
                          {CURATED_ORIGINS.map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </fieldset>
                  <button type="submit" className="btn" disabled={busy} aria-busy={busy}>
                    {busy ? 'Building your report…' : report ? 'Build another report' : 'Get my report'}
                  </button>
                </form>

                {error && (
                  <p role="alert" data-testid="report-error" className="alert">
                    {error}
                  </p>
                )}
              </>
            )}
          </div>
        </section>

        {ready && report && (
          <div>
            <div className="toolbar no-print">
              <button type="button" className="btn ghost" onClick={download}>Download as text</button>
              <button type="button" className="btn ghost" onClick={() => window.print()}>Print</button>
              {usage && <span className="mute small">{usage}</span>}
            </div>
            <NameReportView report={report} />
          </div>
        )}

        <p className="mute small" style={{ marginTop: '40px' }}>For reflection and entertainment; not professional advice.</p>
        <a href="/" className="no-print">Return Home</a>
      </main>
      <div className="no-print"><SiteFooter /></div>
    </>
  );
}
