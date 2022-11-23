import { Grid } from '@mui/material';

import { LineItemLabelAbove, LineItemLabelAboveProps } from '.';

export const MetaDetail = (props: LineItemLabelAboveProps): JSX.Element => (
  <Grid item xs={12} sm={6}>
    <LineItemLabelAbove {...props} />
  </Grid>
);
