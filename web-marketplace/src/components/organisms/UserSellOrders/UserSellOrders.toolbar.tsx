import { Trans } from '@lingui/macro';

import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import { Subtitle } from 'web-components/src/components/typography';
import { cn } from 'web-components/src/utils/styles/cn';

export const UserSellOrdersToolbar = ({
  wrapperClassName,
}: {
  wrapperClassName?: string;
}) => {
  return (
    <div
      className={cn(
        'p-0 flex justify-between w-full rounded-tl-xl rounded-tr-xl bg-grey-0 border-b-[1px] border-grey-300 border-solid border-t-0 border-r-0 border-l-0',
        wrapperClassName,
      )}
    >
      <Subtitle size="xl" className="p-30">
        <Trans>Sell orders</Trans>
      </Subtitle>
      <div className="flex-none pt-15 pr-15">
        <ContainedButton>
          <Trans>Create Sell Order</Trans>
        </ContainedButton>
      </div>
    </div>
  );
};
