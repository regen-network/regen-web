import { RegenModalProps } from '../../components/modal';

export type RegenModalPropsWithOnClose = Omit<RegenModalProps, 'onClose'> & {
  onClose: () => void;
};
