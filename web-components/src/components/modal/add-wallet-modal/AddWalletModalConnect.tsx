import { RegenModalProps } from '..';
import { SUBTITLE, TITLE } from './AddWalletModalConnect.constants';
import { AddWalletModalTemplate } from './AddWalletModalTemplate';

export interface AddWalletModalConnectProps extends RegenModalProps {
  partyInfo: {
    addr: string;
    name: string;
    avatar: string;
  };
}
const AddWalletModalConnect: React.FC<
  React.PropsWithChildren<AddWalletModalConnectProps>
> = props => (
  <AddWalletModalTemplate title={TITLE} subtitle={SUBTITLE} {...props} />
);

export { AddWalletModalConnect };
