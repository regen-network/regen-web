export type BuyWarningModalStateType = {
  openModal: boolean;
  creditsAvailable: number;
};
type BuyWarningModalButtonType = 'outlined' | 'contained';

interface BuyWarningModalButton {
  text: string;
  action: string | null;
  type: BuyWarningModalButtonType;
}

export interface BuyWarningModalContent {
  modalContent: {
    title: string;
    content: React.ReactNode;
    buttons: BuyWarningModalButton[];
  };
}
