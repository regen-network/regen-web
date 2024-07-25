import { useLingui } from '@lingui/react';
import { Grid } from '@mui/material';

import EditIcon from 'web-components/src/components/icons/EditIcon';
import { CreditClassGridCard } from 'web-components/src/components/molecules/CreditClassGridCard/CreditClassGridCard';
import { LinkComponentType } from 'web-components/src/types/shared/linkComponentType';

import { useWallet } from 'lib/wallet/wallet';

import { Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { useFetchCreditClassesWithOrder } from 'hooks/classes/useFetchCreditClassesWithOrder';

import { MY_CREDIT_CLASS_BUTTON } from './MyCreditClasses.constants';

export const MyCreditClasses = (): JSX.Element => {
  const { _ } = useLingui();
  const { wallet } = useWallet();
  const { creditClasses, isLoadingCreditClasses } =
    useFetchCreditClassesWithOrder({
      admin: wallet?.address,
    });

  return (
    <WithLoader
      isLoading={isLoadingCreditClasses}
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      <Grid container spacing={8}>
        {creditClasses.map(creditClass => (
          <Grid item xs={12} md={6} lg={4}>
            <CreditClassGridCard
              {...creditClass}
              button={{
                text: _(MY_CREDIT_CLASS_BUTTON),
                startIcon: <EditIcon sx={{ color: 'grey.100' }} />,
                disabled: true,
              }}
              href={`/credit-classes/${creditClass.id}`}
              LinkComponent={Link as LinkComponentType}
            />
          </Grid>
        ))}
      </Grid>
    </WithLoader>
  );
};
