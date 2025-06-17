import { useMemo } from 'react';
//import { Link } from 'react-router-dom';
//import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Grid, useTheme } from '@mui/material';

//import OutlinedButton from 'web-components/src/components/buttons/OutlinedButton';
import EmptyState from 'web-components/src/components/empty-state';
import EditIcon from 'web-components/src/components/icons/EditIcon';
import { NoCreditClassesIcon } from 'web-components/src/components/icons/NoCreditClassesIcon';
//import PlusIcon from 'web-components/src/components/icons/PlusIcon';
import { CreditClassGridCard } from 'web-components/src/components/molecules/CreditClassGridCard/CreditClassGridCard';
import { LinkComponentType } from 'web-components/src/types/shared/linkComponentType';

import { getProjectCardBodyTextMapping } from 'lib/constants/shared.constants';
import { useWallet } from 'lib/wallet/wallet';

import { Link as LinkComponent } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { useFetchCreditClassesWithOrder } from 'hooks/classes/useFetchCreditClassesWithOrder';

import {
  MY_CREDIT_CLASS_BUTTON,
  NO_CREDIT_CLASSES_MESSAGE,
} from './MyCreditClasses.constants';

export const MyCreditClasses = (): JSX.Element => {
  const { _ } = useLingui();
  //const theme = useTheme();
  const { wallet } = useWallet();
  const { creditClasses, isLoadingCreditClasses } =
    useFetchCreditClassesWithOrder({
      admin: wallet?.address,
    });
  const bodyTexts = useMemo(() => getProjectCardBodyTextMapping(_), [_]);
  const hasNoCreditClasses = creditClasses && creditClasses.length === 0;

  return (
    <div className="shadow-[0_2px_5px_0.5px_rgba(0,0,0,0.05)] w-[100%]">
      <WithLoader
        isLoading={isLoadingCreditClasses}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        <>
          {hasNoCreditClasses ? (
            <EmptyState
              message={_(NO_CREDIT_CLASSES_MESSAGE)}
              icon={<NoCreditClassesIcon />}
              sx={{ backgroundColor: 'info.light' }}
            />
          ) : (
            /* <OutlinedButton
                startIcon={<PlusIcon className="text-brand-400" />}
                component={Link}
                to="/credit-classes/create"
              >
                <Trans>create credit class</Trans>
              </OutlinedButton> */
            <Grid container spacing={8}>
              {creditClasses.map(creditClass => (
                <Grid item xs={12} md={6} lg={4} key={creditClass.id}>
                  <CreditClassGridCard
                    bodyTexts={bodyTexts}
                    {...creditClass}
                    button={{
                      text: _(MY_CREDIT_CLASS_BUTTON),
                      startIcon: <EditIcon sx={{ color: 'grey.100' }} />,
                      disabled: true,
                    }}
                    href={`/credit-classes/${creditClass.id}`}
                    LinkComponent={LinkComponent as LinkComponentType}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      </WithLoader>
    </div>
  );
};
