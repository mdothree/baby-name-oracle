// MDO3 family header + footer (square M3 mark), in Baby Name Oracle's original accent. Markup only; no state.
export function SiteHeader() {
  return (
    <header className="wrap">
      <div className="hdr">
        <a className="mark" href="/" aria-label="Baby Name Oracle, home">
          <span className="logo-mark" aria-hidden="true">M3</span>
          Baby Name Oracle
        </a>
        <nav aria-label="Site">
          <a className="opt" href="/#search">Search</a>
          <a href="/#report">The report</a>
          <a className="opt" href="https://mdo3d.com">MDO3D</a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="wrap">
      <div className="ftr">
        <span>&copy; 2026 Baby Name Oracle · MDO3D. For reflection and entertainment; not professional advice.</span>
        <span>
          <a href="/privacy">Privacy</a>{' · '}
          <a href="/terms">Terms</a>{' · '}
          <a href="/refund">Refunds</a>{' · '}
          <a href="/contact">Contact</a>
        </span>
      </div>
    </footer>
  );
}
