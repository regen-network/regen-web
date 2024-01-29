import { Box, Grid } from '@mui/material';

import { Label } from 'web-components/src/components/typography';

interface GridItemProps {
  label: string;
  children: React.ReactNode;
}

export const BasketGridItem = ({
  label,
  children,
}: GridItemProps): JSX.Element => {
  return (
    <Grid item xs={12} sm={6}>
      <Box sx={{ mt: 4 }}>
        <Label size="xs" sx={{ color: 'primary.contrastText', mb: 2 }}>
          {label}
        </Label>
        {children}
      </Box>
    </Grid>
  );
};
