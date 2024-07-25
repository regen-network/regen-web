import React from 'react';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import Grid from '@mui/material/Grid';

import { ImageActionCard } from 'web-components/src/components/cards/ImageActionCard';
import { CreditClassIcon } from 'web-components/src/components/icons/CreditClassIcon';

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
> = ({ title, imgSrc, description, onClick }) => {
  const { _ } = useLingui();

  return (
    <Grid item xs={12} sm={6}>
      <ImageActionCard
        btnText={_(msg`Choose credit class`)}
        title={title}
        imgSrc={imgSrc}
        description={description || ''}
        onClick={onClick}
        startIcon={
          <CreditClassIcon className="text-brand-400" sx={{ mt: '-2px' }} />
        }
      />
    </Grid>
  );
};

export { ChooseCreditClassItem };
