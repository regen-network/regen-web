import { RegenModalProps } from '..';
import { AddWalletModalTemplate } from './AddWalletModalTemplate';

export interface AddWalletModalConnectProps extends RegenModalProps {
  partyInfo?: {
    addr: string;
    name: string;
    profileImage: string;
    title: string;
    subtitle: string;
  };
  title: string;
  subtitle?: string;
}
const AddWalletModalConnect: React.FC<
  React.PropsWithChildren<AddWalletModalConnectProps>
> = props => (
  <AddWalletModalTemplate
    {...props}
    title={props.title}
    subtitle={props.subtitle}
  />
);

export { AddWalletModalConnect };
