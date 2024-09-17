import { RegenModalProps } from '..';
import { AddWalletModalTemplate } from './AddWalletModalTemplate';

type Props = RegenModalProps & {
  title: string;
  subtitle?: string;
};

const AddWalletModalSwitchWarning: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  subtitle,
  ...props
}) => <AddWalletModalTemplate title={title} subtitle={subtitle} {...props} />;

export { AddWalletModalSwitchWarning };
