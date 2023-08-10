import { useParams } from 'react-router-dom';

import { useFetchBaskets } from 'pages/Dashboard/MyEcocredits/hooks/useFetchBaskets';
import { useFetchEcocredits } from 'pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';
import { useFetchRetirements } from 'pages/Dashboard/MyEcocredits/hooks/useFetchRetirements';
import { Portfolio } from 'components/organisms';

export const PortfolioTab = (): JSX.Element => {
  const { accountAddress } = useParams<{ accountAddress: string }>();
  const { credits, paginationParams, setPaginationParams } = useFetchEcocredits(
    { address: accountAddress },
  );
  const {
    retirements,
    retirementsSetPaginationParams,
    retirementsPaginationParams,
  } = useFetchRetirements({ address: accountAddress });

  const { basketTokens } = useFetchBaskets({
    address: accountAddress,
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
