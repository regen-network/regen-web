import { Box } from '@mui/material';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import CertifiedDocumentIcon from 'web-components/src/components/icons/CertifiedDocumentIcon';

import { VIEW_CERTIFICATE } from './Portfolio.constants';

type Props = {
  onClick?: () => void;
};

export const ViewCertificateButton = ({ onClick }: Props) => {
  return (
    <OutlinedButton
      startIcon={
        <CertifiedDocumentIcon sx={{ width: '18x', height: '22px' }} />
      }
      onClick={onClick}
      size="small"
    >
      <Box
        sx={{
          maxWidth: { xs: 36, sm: '100%' },
          overflow: { xs: 'hidden', sm: 'visible' },
        }}
      >
        {VIEW_CERTIFICATE}
      </Box>
    </OutlinedButton>
  );
};
