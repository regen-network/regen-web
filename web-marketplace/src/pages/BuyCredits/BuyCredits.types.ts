export type PaymentOptionsType = 'card' | 'crypto';
export type CardDetails = {
  brand: string;
  last4: string;
  country: string | null;
};
