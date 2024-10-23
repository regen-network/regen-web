export type FiatModalStateType = {
  openModal: boolean;
  creditsAvailable: number;
};
type BuyFiatModalButtonType = 'outlined' | 'contained';

interface BuyFiatModalButton {
  text: string;
  action: string | null;
  type: BuyFiatModalButtonType;
}

export interface BuyFiatModalContent {
  title: string;
  content: React.ReactNode;
  buttons: BuyFiatModalButton[];
}
