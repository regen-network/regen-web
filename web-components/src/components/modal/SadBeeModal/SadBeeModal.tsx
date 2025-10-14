import { SadBeeIcon } from 'web-components/src/components/icons/SadBeeIcon';
import Modal, { RegenModalProps } from 'web-components/src/components/modal';

type Props = React.PropsWithChildren<RegenModalProps>;

export const SadBeeModal = ({ open, onClose, children }: Props) => {
  return (
    <Modal open={open} onClose={onClose} className="!p-50">
      <div className="flex justify-center">
        <SadBeeIcon />
      </div>
      {children}
    </Modal>
  );
};
