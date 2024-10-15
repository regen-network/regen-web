import { useMemo } from 'react';
import { useLingui } from '@lingui/react';
import { Grid } from '@mui/material';

import { CreditClassGridCard } from 'web-components/src/components/molecules/CreditClassGridCard/CreditClassGridCard';
import { LinkComponentType } from 'web-components/src/types/shared/linkComponentType';

import { getProjectCardBodyTextMapping } from 'lib/constants/shared.constants';
import { useWallet } from 'lib/wallet/wallet';

import { Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { useFetchCreditClassesWithOrder } from 'hooks/classes/useFetchCreditClassesWithOrder';

import { useProfileData } from '../hooks/useProfileData';

export const CreditClassTab = () => {
  const { _ } = useLingui();
  const { wallet } = useWallet();
  const { address } = useProfileData();
  const { creditClasses, isLoadingCreditClasses } =
    useFetchCreditClassesWithOrder({
      admin: address,
      userAddress: wallet?.address,
    });
  const bodyTexts = useMemo(() => getProjectCardBodyTextMapping(_), [_]);

  return (
    <>
      <WithLoader
        isLoading={isLoadingCreditClasses}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <Grid container spacing={8}>
          {creditClasses.map(creditClass => (
            <Grid item xs={12} md={6} lg={4}>
              <CreditClassGridCard
                bodyTexts={bodyTexts}
                {...creditClass}
                href={`/credit-classes/${creditClass.id}`}
                LinkComponent={Link as LinkComponentType}
              />
            </Grid>
          ))}
        </Grid>
      </WithLoader>
    </>
  );
};
