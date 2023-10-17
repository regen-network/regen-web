import { useFetchBaskets } from 'pages/Dashboard/MyEcocredits/hooks/useFetchBaskets';
import { useFetchEcocredits } from 'pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';
import { useFetchRetirements } from 'pages/Dashboard/MyEcocredits/hooks/useFetchRetirements';
import { Portfolio } from 'components/organisms';

import { useProfileData } from '../hooks/useProfileData';

export const PortfolioTab = (): JSX.Element => {
  const { address } = useProfileData();

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
