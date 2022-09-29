import ArrowDownIcon from 'web-components/lib/components/icons/ArrowDownIcon';
import TradeableIcon from 'web-components/lib/components/icons/TradeableIcon';

type PurchaseIconsType = 'arrowDown' | 'tradable';

type Props = { icon: PurchaseIconsType };

export const SellOrderPurchaseIcon = ({ icon }: Props): JSX.Element => {
  const isArrowDown = icon === 'arrowDown';
  const isTradable = icon === 'tradable';

  return (
    <>
      {isArrowDown && (
        <ArrowDownIcon
          color="#8F8F8F"
          sx={{ display: 'flex', alignItems: 'center', fontSize: 18 }}
        />
      )}
      {isTradable && (
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
