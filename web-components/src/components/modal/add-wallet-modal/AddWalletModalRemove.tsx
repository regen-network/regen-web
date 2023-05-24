import { Box } from '@mui/material';

import {
  CancelButtonFooter,
  Props as CancelButtonFooterProps,
} from '../../organisms/CancelButtonFooter/CancelButtonFooter';
import { AddWalletModalConnectProps } from './AddWalletModalConnect';
import {
  BUTTON_LABEL,
  SUBTITLE,
  TITLE,
} from './AddWalletModalRemove.constants';
import { AddWalletModalTemplate } from './AddWalletModalTemplate';

export interface AddWalletModalRemoveProps
  extends AddWalletModalConnectProps,
    Omit<CancelButtonFooterProps, 'label'> {}

const AddWalletModalRemove: React.FC<
  React.PropsWithChildren<AddWalletModalRemoveProps>
> = ({ onClick, onCancel, ...props }) => (
  <AddWalletModalTemplate title={TITLE} subtitle={SUBTITLE} {...props}>
    <Box sx={{ mt: 12.75 }}>
      <CancelButtonFooter
        label={BUTTON_LABEL}
        onClick={onClick}
        onCancel={onCancel}
      />
    </Box>
  </AddWalletModalTemplate>
);

export { AddWalletModalRemove };
