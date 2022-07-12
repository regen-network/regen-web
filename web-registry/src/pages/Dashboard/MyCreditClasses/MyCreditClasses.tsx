import { Grid } from '@mui/material';
import { CreateCreditClassCard } from 'components/molecules/CreateCreditClassCard';
import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';

export const MyCreditClasses = (): JSX.Element => {
  const isFirstCreditClass = false;
  const error = '';

  async function submitCreateCreditClass(): Promise<void> {
    return Promise.resolve();
  }

  return (
    <>
      <Grid container spacing={8}>
        <Grid item xs={12} md={6} lg={4}>
          <CreateCreditClassCard
            isFirstCreditClass={isFirstCreditClass}
            onClick={submitCreateCreditClass}
          />
        </Grid>
      </Grid>
      {error && <ErrorBanner text={error} />}
    </>
  );
};
