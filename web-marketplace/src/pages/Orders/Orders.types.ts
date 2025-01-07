export type Order = {
  txHash: string;
  projectId: string;
  askDenom: string;
  timestamp: string;
  creditsAmount: string | number;
  retiredCredits: boolean;
  totalPrice: string | number;
  cardLast4?: string;
  cardBrand?: string;
  receiptUrl?: string;
};
