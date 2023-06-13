import { RegenModalProps } from '..';
import { TITLE } from './AddWalletModalSwitchWarning.constants';
import { AddWalletModalTemplate } from './AddWalletModalTemplate';

const AddWalletModalSwitchWarning: React.FC<
  React.PropsWithChildren<RegenModalProps>
> = props => <AddWalletModalTemplate title={TITLE} {...props} />;

export { AddWalletModalSwitchWarning };
