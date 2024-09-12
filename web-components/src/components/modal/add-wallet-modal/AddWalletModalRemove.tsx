import { Box } from '@mui/material';

import {
  CancelButtonFooter,
  Props as CancelButtonFooterProps,
} from '../../organisms/CancelButtonFooter/CancelButtonFooter';
import { AddWalletModalConnectProps } from './AddWalletModalConnect';
import { AddWalletModalTemplate } from './AddWalletModalTemplate';

export interface AddWalletModalRemoveProps
  extends AddWalletModalConnectProps,
    Omit<CancelButtonFooterProps, 'label'> {
  title: string;
  subtitle: string;
  buttonLabel: string;
}

const AddWalletModalRemove: React.FC<
  React.PropsWithChildren<AddWalletModalRemoveProps>
> = ({ onClick, onCancel, title, subtitle, buttonLabel, ...props }) => (
  <AddWalletModalTemplate title={title} subtitle={subtitle} {...props}>
    <Box sx={{ mt: 12.75 }}>
      <CancelButtonFooter
        label={buttonLabel}
        onClick={onClick}
        onCancel={onCancel}
      />
    </Box>
  </AddWalletModalTemplate>
);

export { AddWalletModalRemove };
