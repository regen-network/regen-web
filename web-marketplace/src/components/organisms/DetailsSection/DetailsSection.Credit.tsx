import { Box, Grid } from '@mui/material';

import { Flex } from 'web-components/src/components/box';
import { Title } from 'web-components/src/components/typography';

type Props = {
  src: string;
  label: string;
};

export const DetailsSectionCredit = ({ src, label }: Props) => (
  <Grid item width={{ xs: '100%', tablet: 163 }}>
    <Flex
      sx={{
        margin: 'auto',
        borderRadius: '50%',
        background:
          'linear-gradient(219deg, #EEF1F3 0%, #F1F9F6 50%, #F9FBF8 100%)',
        width: { xs: 90, sm: 104 },
        height: { xs: 90, sm: 104 },
      }}
    >
      <Box
        sx={{ margin: 'auto', maxWidth: '100%' }}
        component="img"
        src={src}
      />
    </Flex>
    <Title variant="h6" align="center" pt={2.5}>
      {label}
    </Title>
  </Grid>
);
