import { RegenModalProps } from '..';
import { SUBTITLE, TITLE } from './AddWalletModalSwitch.constants';
import { AddWalletModalTemplate } from './AddWalletModalTemplate';

const AddWalletModalSwitch: React.FC<React.PropsWithChildren<RegenModalProps>> =
  props => (
    <AddWalletModalTemplate title={TITLE} subtitle={SUBTITLE} {...props} />
  );

export { AddWalletModalSwitch };
