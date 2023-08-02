import React from 'react';
import Grid from '@mui/material/Grid';

import { ImageActionCard } from 'web-components/lib/components/cards/ImageActionCard';
import { CreditClassIcon } from 'web-components/lib/components/icons/CreditClassIcon';

interface ClassOptionProps {
  title: string;
  imgSrc: string;
  description?: string;
  onClick: () => void;
}

/*
/* Grid item to be used with ChooseCreditClassGrid
*/
const ChooseCreditClassItem: React.FC<
  React.PropsWithChildren<ClassOptionProps>
> = ({ title, imgSrc, description, onClick }) => (
  <Grid item xs={12} sm={6}>
    <ImageActionCard
      btnText="Choose credit class"
      title={title}
      imgSrc={imgSrc}
      description={description || ''}
      onClick={onClick}
      startIcon={<CreditClassIcon sx={{ mt: '-2px' }} />}
    />
  </Grid>
);

export { ChooseCreditClassItem };
