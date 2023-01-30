import { useParams } from 'react-router-dom';

import { useFetchBaskets } from 'pages/Dashboard/MyEcocredits/hooks/useFetchBaskets';
import { useFetchEcocredits } from 'pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';
import { Portfolio } from 'components/organisms';

export const PortfolioTab = (): JSX.Element => {
  const { accountAddress } = useParams<{ accountAddress: string }>();
  const { credits, paginationParams, setPaginationParams } = useFetchEcocredits(
    { address: accountAddress },
  );
  const { basketTokens } = useFetchBaskets({
    address: accountAddress,
    credits,
  });

  return (
    <Portfolio
      credits={credits}
      basketTokens={basketTokens}
      onTableChange={setPaginationParams}
      initialPaginationParams={paginationParams}
      isIgnoreOffset
    />
  );
};
