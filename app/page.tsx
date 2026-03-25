import PayButton from './components/PayButton';

export default function Home() {
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
          placeholder="Enter a letter..." 
          style={{ 
            padding: '10px', 
            width: '100%', 
            maxWidth: '300px',
            marginTop: '0.5rem' 
          }}
        />
        <button style={{
          display: 'block',
          marginTop: '1rem',
          padding: '10px 20px',
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Search Free
        </button>
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
