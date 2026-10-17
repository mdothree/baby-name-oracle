import { SiteHeader, SiteFooter } from '../components/SiteChrome';

export default function Cancel() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="wrap">
        <div className="cancel">
          <p className="label">Checkout</p>
          <h1>Payment cancelled</h1>
          <p className="mute">Your payment was cancelled. Nothing was charged.</p>
          <div className="btnrow" style={{ justifyContent: 'center', marginTop: '28px' }}>
            <a className="btn" href="/#report">Try again</a>
            <a className="btn ghost" href="/#search">Back to the name search</a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
