'use client';

interface PayButtonProps {
  paymentLink?: string;
  priceId?: string;
  label?: string;
}

export default function PayButton({
  paymentLink = 'https://buy.stripe.com/eVqeVc6l20HL1hW97Z8k802',
  priceId,
  label = 'Get Premium - $2.99'
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
