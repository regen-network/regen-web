export interface OrderCryptoReceiptModalContent {
  modalContent: {
    price: number;
    project: {
      name: string;
      projectHref: string;
    };
    amount: string | number;
    date: string;
    retiredCredits: boolean | undefined;
    currency: {
      askDenom: string;
      askBaseDenom: string;
    };
    displayDenom: string;
  };
}

export interface ReceiptSectionData {
  title: string;
  body: React.ReactNode;
  classNames?: string;
}
