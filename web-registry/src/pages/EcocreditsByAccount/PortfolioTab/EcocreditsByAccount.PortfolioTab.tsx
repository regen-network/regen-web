import { useParams } from 'react-router-dom';

import { Portfolio } from 'components/organisms';
import { useBasketTokens, useEcocredits, useQueryBaskets } from 'hooks';

export const PortfolioTab = (): JSX.Element => {
  const baskets = useQueryBaskets();
  const { accountAddress } = useParams<{ accountAddress: string }>();
  const { credits } = useEcocredits({ address: accountAddress });
  const { basketTokens } = useBasketTokens(accountAddress, baskets);

  return <Portfolio credits={credits} basketTokens={basketTokens} />;
};
