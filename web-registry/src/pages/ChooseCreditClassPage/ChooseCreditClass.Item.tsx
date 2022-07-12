import React from 'react';
import Grid from '@mui/material/Grid';

import { ImageActionCard } from 'web-components/lib/components/cards/ImageActionCard';
import { CreditClassIcon } from 'web-components/lib/components/icons/CreditClassIcon';

import DefaultCreditClassImage from '../../assets/default-credit-class.png';

interface ClassOptionProps {
  title: string;
  imgSrc?: string;
  description?: string;
  disabled?: boolean;
  onClick: () => void;
}

/*
/* Grid item to be used with ChooseCreditClassGrid
*/
const ChooseCreditClassItem: React.FC<ClassOptionProps> = ({
  title,
  imgSrc,
  description,
  disabled,
  onClick,
}) => (
  <Grid item xs={12} sm={6}>
    <ImageActionCard
      btnText="Choose credit class"
      title={title}
      imgSrc={imgSrc || DefaultCreditClassImage}
      description={description || ''}
      onClick={onClick}
      disabled={disabled}
      startIcon={<CreditClassIcon sx={{ mt: '-2px' }} />}
    />
  </Grid>
);

export { ChooseCreditClassItem };
