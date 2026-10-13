'use client';

import { useEffect, useState } from 'react';
import NameReportView from '../components/NameReportView';
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

const field: React.CSSProperties = { display: 'block', width: '100%', maxWidth: '360px', padding: '8px', marginTop: '0.25rem', boxSizing: 'border-box' };
const label: React.CSSProperties = { display: 'block', marginTop: '0.75rem', fontWeight: 600 };
const hint: React.CSSProperties = { fontWeight: 400, color: '#555', fontSize: '0.85rem' };
const btn: React.CSSProperties = { padding: '10px 20px', backgroundColor: '#635bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 600 };
const btn2: React.CSSProperties = { ...btn, backgroundColor: '#333', marginRight: '0.5rem' };

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
    <main id="main-content" style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Your Premium Name Report</h1>

      {!ready ? null : (
        <>
          {sessionId ? (
            <p data-testid="paid-intro">Thank you for your purchase. Enter the name you are considering and we will build its report.</p>
          ) : (
            <div data-testid="email-intro" style={{ padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
              <p style={{ marginTop: 0 }}>
                <strong>Already paid?</strong> After checkout you should land on this page with your purchase attached. If you paid
                earlier, or closed the page, find your report with the email you entered at checkout and the last 4 digits of the
                card you paid with.
              </p>
              <p style={{ marginBottom: 0 }}>
                Haven&rsquo;t bought a report? <a href="/" style={{ color: '#4f46e5' }}>See what it includes</a>.
              </p>
            </div>
          )}

          <form onSubmit={submit} className="no-print" style={{ marginTop: '1rem' }} aria-label="Report details">
            {!sessionId && (
              <>
                <label style={label}>
                  Checkout email
                  <input style={field} type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label style={label}>
                  Last 4 digits of the card you paid with
                  <input style={{ ...field, maxWidth: '120px' }} inputMode="numeric" pattern="[0-9]{4}" maxLength={4} required value={last4} onChange={(e) => setLast4(e.target.value.replace(/\D/g, ''))} />
                </label>
              </>
            )}
            <label style={label}>
              First name <span style={hint}>(the name you are considering)</span>
              <input style={field} required maxLength={40} value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label style={label}>
              Surname <span style={hint}>(optional, adds full-name numerology and initials)</span>
              <input style={field} maxLength={40} value={surname} onChange={(e) => setSurname(e.target.value)} />
            </label>
            <label style={label}>
              Siblings&rsquo; names <span style={hint}>(optional, comma separated)</span>
              <input style={field} maxLength={250} value={siblings} onChange={(e) => setSiblings(e.target.value)} />
            </label>
            <fieldset style={{ border: 'none', padding: 0, marginTop: '0.75rem' }}>
              <legend style={{ fontWeight: 600 }}>Name ideas filters <span style={hint}>(optional)</span></legend>
              <label style={label}>
                For
                <select style={field} value={sex} onChange={(e) => setSex(e.target.value)}>
                  <option value="">Girls and boys</option>
                  <option value="F">Girls</option>
                  <option value="M">Boys</option>
                </select>
              </label>
              <label style={label}>
                Starting with
                <input style={{ ...field, maxWidth: '160px' }} maxLength={10} value={startsWith} onChange={(e) => setStartsWith(e.target.value)} />
              </label>
              <label style={label}>
                Origin <span style={hint}>(our curated names only)</span>
                <select style={field} value={origin} onChange={(e) => setOrigin(e.target.value)}>
                  <option value="">Any</option>
                  {CURATED_ORIGINS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </label>
            </fieldset>
            <button type="submit" style={{ ...btn, marginTop: '1rem' }} disabled={busy}>
              {busy ? 'Building your report…' : report ? 'Build another report' : 'Get my report'}
            </button>
          </form>

          {error && (
            <p role="alert" data-testid="report-error" style={{ color: '#b91c1c', marginTop: '1rem' }}>
              {error}
            </p>
          )}

          {report && (
            <div style={{ marginTop: '2rem' }}>
              <div className="no-print" style={{ marginBottom: '1rem' }}>
                <button type="button" style={btn2} onClick={download}>Download as text</button>
                <button type="button" style={btn2} onClick={() => window.print()}>Print</button>
                {usage && <p style={hint}>{usage}</p>}
              </div>
              <NameReportView report={report} />
            </div>
          )}
        </>
      )}

      <style dangerouslySetInnerHTML={{ __html: '@media print{.no-print,.skip-link{display:none!important}}' }} />
      <p style={{ marginTop: '2rem', color: '#555', fontSize: '0.9rem' }}>
        For reflection and entertainment; not professional advice.
      </p>
      <a href="/" className="no-print" style={{ display: 'inline-block', marginTop: '1rem', color: '#635bff' }}>
        Return Home
      </a>
    </main>
  );
}
