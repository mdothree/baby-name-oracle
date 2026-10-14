'use client';

import { NAMES_PAYMENT_LINK, NAMES_PRICE_LABEL } from '../lib/checkout';

interface PayButtonProps {
  paymentLink?: string;
  label?: string;
}

export default function PayButton({
  paymentLink = NAMES_PAYMENT_LINK,
  label = `Get Premium - ${NAMES_PRICE_LABEL}`
}: PayButtonProps) {
  const handleClick = () => {
    window.location.href = paymentLink;
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: '#635bff',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        marginTop: '1rem'
      }}
    >
      {label}
    </button>
  );
}