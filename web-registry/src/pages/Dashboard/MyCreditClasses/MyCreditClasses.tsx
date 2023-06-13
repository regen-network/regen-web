import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import { CreateCreditClassCard } from 'web-components/lib/components/cards/CreateCards';

import { useDashboardContext } from '../Dashboard.context';

export const MyCreditClasses = (): JSX.Element => {
  const navigate = useNavigate();
  const { isCreditClassCreator } = useDashboardContext();
  const isFirstCreditClass = false;
  const error = '';

  function handleCreate(): void {
    navigate('/credit-classes/create');
  }

  return (
    <>
      <Grid container spacing={8}>
        <Grid item xs={12} md={6} lg={4}>
          {false && isCreditClassCreator && (
            <CreateCreditClassCard
              isFirstCreditClass={isFirstCreditClass}
              onClick={handleCreate}
            />
          )}
        </Grid>
      </Grid>
      {error && <ErrorBanner text={error} />}
    </>
  );
};
