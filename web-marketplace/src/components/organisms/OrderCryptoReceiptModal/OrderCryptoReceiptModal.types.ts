export interface OrderCryptoReceiptModalContent {
  modalContent: {
    price: number;
    project: {
      name: string;
      projectHref: string;
    };
    amount: string | number;
    date: string;
    txType: 'retired' | 'tradable' | null;
    currency: {
      askDenom: string;
      askBaseDenom: string;
    };
    displayDenom: string;
  };
}

export interface OrderCryptoReceiptModalStateType {
  open: boolean;
  type: OrderCryptoReceiptModalContent['modalContent']['txType'];
}

export interface ReceiptSectionData {
  title: string;
  body: React.ReactNode;
}
