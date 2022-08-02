import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import { CreateCreditClassCard } from 'web-components/lib/components/cards/CreateCards';

export const MyCreditClasses = (): JSX.Element => {
  const navigate = useNavigate();
  const isFirstCreditClass = false;
  const error = '';

  function handleCreate(): void {
    navigate('/credit-classes/create');
  }

  return (
    <>
      <Grid container spacing={8}>
        <Grid item xs={12} md={6} lg={4}>
          <CreateCreditClassCard
            isFirstCreditClass={isFirstCreditClass}
            onClick={handleCreate}
          />
          {/* TODO: display user credits */}
        </Grid>
      </Grid>
      {error && <ErrorBanner text={error} />}
    </>
  );
};
