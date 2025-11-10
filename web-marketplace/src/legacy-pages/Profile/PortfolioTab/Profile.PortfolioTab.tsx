import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchBaskets } from 'legacy-pages/Dashboard/MyEcocredits/hooks/useFetchBaskets';
import { useFetchEcocredits } from 'legacy-pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';
import { useFetchRetirements } from 'legacy-pages/Dashboard/MyEcocredits/hooks/useFetchRetirements';

import { Portfolio } from 'components/organisms';

import { useProfileData } from '../hooks/useProfileData';

export const PortfolioTab = (): JSX.Element => {
  const { address, account, isLoading } = useProfileData();
  const { accountAddressOrId } = useParams<{ accountAddressOrId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!address && !isLoading) {
      navigate(`/profiles/${accountAddressOrId}/projects`, { replace: true });
    }
  }, [accountAddressOrId, address, isLoading, navigate]);

  // Ecocredits
  const { credits, paginationParams, setPaginationParams } = useFetchEcocredits(
    { address },
  );

  // Retirement certificates
  const {
    retirements,
    retirementsSetPaginationParams,
    retirementsPaginationParams,
  } = useFetchRetirements({ address });

  // Basket tokens
  const { basketTokens } = useFetchBaskets({
    address,
    credits,
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
    />
  );
};
