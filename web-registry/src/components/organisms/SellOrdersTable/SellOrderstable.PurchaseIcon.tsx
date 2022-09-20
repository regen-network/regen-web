import ArrowDownIcon from 'web-components/lib/components/icons/ArrowDownIcon';
import TradeableIcon from 'web-components/lib/components/icons/TradeableIcon';

type PurchaseIconsType = 'arrowDown' | 'tradeable';

type Props = { icon: PurchaseIconsType };

export const SellOrderPurchaseIcon = ({ icon }: Props): JSX.Element => {
  const isArrowDown = icon === 'arrowDown';
  const isTradeable = icon === 'tradeable';

  return (
    <>
      {isArrowDown && (
        <ArrowDownIcon
          color="#8F8F8F"
          sx={{ display: 'flex', alignItems: 'center', fontSize: 18 }}
        />
      )}
      {isTradeable && (
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
