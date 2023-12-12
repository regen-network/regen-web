import { useState } from 'react';
import { Grid } from '@mui/material';

import CurrentCreditsIcon from 'web-components/src/components/icons/CurrentCreditsIcon';
import { CreditClassGridCard } from 'web-components/src/components/molecules/CreditClassGridCard/CreditClassGridCard';

import { useWallet } from 'lib/wallet/wallet';

import { BuySellOrderFlow } from 'features/marketplace/BuySellOrderFlow/BuySellOrderFlow';
import { useBuySellOrderData } from 'features/marketplace/BuySellOrderFlow/hooks/useBuySellOrderData';
import { Link } from 'components/atoms';
import WithLoader from 'components/atoms/WithLoader';
import { useFetchCreditClassesWithOrder } from 'hooks/classes/useFetchCreditClassesWithOrder';

import { useProfileData } from '../hooks/useProfileData';
import { ACCOUNT_CREDIT_CLASS_BUTTON } from './CreditClassTab.constants';

export const CreditClassTab = () => {
  const [isBuyFlowStarted, setIsBuyFlowStarted] = useState(false);
  const [creditClassId, setCreditClassId] = useState<string | undefined>();
  const { wallet } = useWallet();
  const { projectsWithOrderData } = useBuySellOrderData({
    classId: creditClassId,
  });
  const { address } = useProfileData();
  const { creditClasses, isLoadingCreditClasses } =
    useFetchCreditClassesWithOrder({
      admin: address,
      userAddress: wallet?.address,
    });

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
                {...creditClass}
                button={{
                  text: ACCOUNT_CREDIT_CLASS_BUTTON,
                  startIcon: <CurrentCreditsIcon height="18px" width="18px" />,
                  onClick: () => {
                    setCreditClassId(creditClass.id);
                    setIsBuyFlowStarted(true);
                  },
                  disabled:
                    (creditClass.purchaseInfo?.sellInfo
                      ?.creditsAvailableForUser ?? 0) === 0,
                }}
                href={`/credit-classes/${creditClass.id}`}
                LinkComponent={Link}
              />
            </Grid>
          ))}
        </Grid>
      </WithLoader>
      <BuySellOrderFlow
        isFlowStarted={isBuyFlowStarted}
        setIsFlowStarted={setIsBuyFlowStarted}
        projects={projectsWithOrderData}
      />
    </>
  );
};
