import { Box, SxProps } from '@mui/material';

import { BlockContent } from '../../../components/block-content';
import { Body, Label, Title } from '../../../components/typography';
import { Theme } from '../../../theme/muiTheme';
import { StatCardType } from './StatCard.types';

type Props = {
  sx?: SxProps<Theme>;
} & StatCardType;

const StatCard = ({ label, stat, description, image, sx = [] }: Props) => (
  <Box
    sx={[
      {
        px: { xs: 5, sm: 7.5 },
        py: { xs: 7.5, sm: 12.5 },
        borderRadius: '20px',
        background: `url(${image.src}), linear-gradient(204.4deg, #EEF1F3 5.94%, #F1F9F6 51.92%, #F9FBF8 97.89%);`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom 0 right 0',
        border: theme => `1px solid ${theme.palette.info.light}`,
      },
      ...(Array.isArray(sx) ? sx : [sx]),
    ]}
  >
    <Box>
      <Label size="xs" sx={{ mb: 2.5, color: 'info.dark' }}>
        {label}
      </Label>
      <Title variant="h2" as="div" sx={{ mb: 5.5 }}>
        {stat}
      </Title>
      <Body size="lg" as="div" sx={{ maxWidth: 355 }}>
        <BlockContent content={description} />
      </Body>
    </Box>
  </Box>
);
export { StatCard };
