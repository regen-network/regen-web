import { RegenModalProps } from '..';
import { AddWalletModalTemplate } from './AddWalletModalTemplate';

type Props = RegenModalProps & {
  title: string;
};

const AddWalletModalSwitchWarning: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  ...props
}) => <AddWalletModalTemplate title={title} {...props} />;

export { AddWalletModalSwitchWarning };
