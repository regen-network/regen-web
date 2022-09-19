import ArrowDownIcon from 'web-components/lib/components/icons/ArrowDownIcon';
import TradeableIcon from 'web-components/lib/components/icons/TradeableIcon';

type Props = { disableAutoRetire: boolean };

export const SellOrderPurchaseIcon = ({
  disableAutoRetire,
}: Props): JSX.Element => {
  return (
    <>
      {disableAutoRetire && (
        <ArrowDownIcon
          color="#8F8F8F"
          sx={{ display: 'flex', alignItems: 'center', fontSize: 18 }}
        />
      )}
      {!disableAutoRetire && (
        <TradeableIcon
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: 'info.main',
            fontSize: 18,
          }}
        />
      )}
    </>
  );
};
