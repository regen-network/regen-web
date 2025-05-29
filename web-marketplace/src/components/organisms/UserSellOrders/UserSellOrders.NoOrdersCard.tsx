import { Trans } from '@lingui/macro';

import SellOrderNotFoundIcon from 'web-components/src/components/icons/SellOrderNotFoundIcon';
import { Title } from 'web-components/src/components/typography';

import { UserSellOrdersToolbar } from './UserSellOrders.Toolbar';

export const NoUserSellOrdersCard = ({
  refetchSellOrders,
}: {
  refetchSellOrders: () => void;
}) => {
  return (
    <div className="rounded-xl overflow-hidden border-[1px] border-grey-300 border-solid">
      <UserSellOrdersToolbar refetchSellOrders={refetchSellOrders} />
      <div className="min-w-full bg-grey-200 flex flex-col items-center justify-center p-40">
        <SellOrderNotFoundIcon className="w-[100px] h-[100px] text-brand-400" />
        <Title variant="h4" mobileVariant="h6" align="center">
          <Trans>No open sell orders</Trans>
        </Title>
      </div>
    </div>
  );
};
