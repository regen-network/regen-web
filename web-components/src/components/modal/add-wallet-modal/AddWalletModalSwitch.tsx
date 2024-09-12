import { RegenModalProps } from '..';
import { AddWalletModalTemplate } from './AddWalletModalTemplate';

type Props = RegenModalProps & {
  title: string;
  subtitle: string;
};

const AddWalletModalSwitch: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  subtitle,
  ...props
}) => <AddWalletModalTemplate title={title} subtitle={subtitle} {...props} />;

export { AddWalletModalSwitch };
