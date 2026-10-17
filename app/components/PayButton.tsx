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
    <button type="button" className="btn" onClick={handleClick}>
      {label}
    </button>
  );
}
