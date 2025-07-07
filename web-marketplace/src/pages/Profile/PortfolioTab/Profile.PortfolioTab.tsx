import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useFetchBaskets } from 'pages/Dashboard/MyEcocredits/hooks/useFetchBaskets';
import { useFetchEcocredits } from 'pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';
import { useFetchRetirements } from 'pages/Dashboard/MyEcocredits/hooks/useFetchRetirements';
import { Portfolio } from 'components/organisms';

import { useProfileData } from '../hooks/useProfileData';

export const PortfolioTab = (): JSX.Element => {
  const { address, account, isLoading } = useProfileData();
  const { accountAddressOrId } = useParams<{ accountAddressOrId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!!account?.hideEcocredits && !!account?.hideRetirements && !isLoading) {
      navigate(`/profiles/${accountAddressOrId}/projects`, { replace: true });
    }
  }, [
    account?.hideEcocredits,
    account?.hideRetirements,
    accountAddressOrId,
    address,
    isLoading,
    navigate,
  ]);

  const hideEcocredits = !!account?.hideEcocredits;
  const hideRetirements = !!account?.hideRetirements;

  // Ecocredits
  const { credits, paginationParams, setPaginationParams } = useFetchEcocredits(
    { address, hideEcocredits },
  );

  // Retirement certificates
  const {
    retirements,
    retirementsSetPaginationParams,
    retirementsPaginationParams,
  } = useFetchRetirements({ address, hideRetirements });

  // Basket tokens
  const { basketTokens } = useFetchBaskets({
    address,
    credits,
    hideEcocredits,
  });

  return (
    <Portfolio
      credits={credits}
      basketTokens={basketTokens}
      onTableChange={setPaginationParams}
      retirements={retirements}
      retirementsPaginationParams={retirementsPaginationParams}
      onRetirementTableChange={retirementsSetPaginationParams}
      initialPaginationParams={paginationParams}
      isIgnoreOffset
      hideEcocredits={hideEcocredits}
      hideRetirements={hideRetirements}
    />
  );
};
