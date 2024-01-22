import { Grid } from '@mui/material';

import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import EyeIcon from 'web-components/src/components/icons/EyeIcon';

type Props = {
  href: string;
  label: string;
};

export const DetailsSectionButton = ({ href, label }: Props) => (
  <Grid item sx={{ flexBasis: { xs: '100%', tablet: 'auto' } }}>
    <OutlinedButton
      sx={{ width: '100%' }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      startIcon={<EyeIcon />}
    >
      {label}
    </OutlinedButton>
  </Grid>
);
