import { Portfolio } from 'components/organisms';
import { useBasketTokens, useEcocredits, useQueryBaskets } from 'hooks';

interface Props {
  accountAddress: string | undefined;
}

export const PortfolioTab = ({ accountAddress }: Props): JSX.Element => {
  const baskets = useQueryBaskets();
  const { credits } = useEcocredits({ address: accountAddress });
  const { basketTokens } = useBasketTokens(accountAddress, baskets);

  return <Portfolio credits={credits} basketTokens={basketTokens} />;
};
