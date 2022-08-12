import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

import ErrorBanner from 'web-components/lib/components/banner/ErrorBanner';
import { CreateCreditClassCard } from 'web-components/lib/components/cards/CreateCards';

interface MyCreditClassesProps {
  isCreditClassCreator: boolean;
  isCreditClassAdmin: boolean;
}

export const MyCreditClasses = ({
  isCreditClassCreator,
  isCreditClassAdmin,
}: MyCreditClassesProps): JSX.Element => {
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
          {isCreditClassCreator && (
            <CreateCreditClassCard
              isFirstCreditClass={isFirstCreditClass}
              onClick={handleCreate}
            />
          )}
          {/* TODO: display user credits */}
          {isCreditClassAdmin && <p>credit class admin credits todo...</p>}
        </Grid>
      </Grid>
      {error && <ErrorBanner text={error} />}
    </>
  );
};
