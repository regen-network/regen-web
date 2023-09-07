import { useParams } from 'react-router-dom';

import { isValidAddress } from 'web-components/lib/components/inputs/validation';

import { useFetchBaskets } from 'pages/Dashboard/MyEcocredits/hooks/useFetchBaskets';
import { useFetchEcocredits } from 'pages/Dashboard/MyEcocredits/hooks/useFetchEcocredits';
import { useFetchRetirements } from 'pages/Dashboard/MyEcocredits/hooks/useFetchRetirements';
import { Portfolio } from 'components/organisms';

export const PortfolioTab = (): JSX.Element => {
  const { accountAddressOrId } = useParams<{ accountAddressOrId: string }>();
  const { credits, paginationParams, setPaginationParams } = useFetchEcocredits(
    { address: accountAddressOrId },
  );
  const isValidRegenAddress = isValidAddress(accountAddressOrId ?? '', 'regen');
  const address = isValidRegenAddress ? accountAddressOrId : '';

  const {
    retirements,
    retirementsSetPaginationParams,
    retirementsPaginationParams,
  } = useFetchRetirements({ address });

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
