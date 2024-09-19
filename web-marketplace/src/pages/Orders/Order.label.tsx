import ArrowDownIcon from 'web-components/src/components/icons/ArrowDownIcon';
import PendingIcon from 'web-components/src/components/icons/PendingIcon';
import InfoLabel from 'web-components/src/components/info-label';
import { InfoLabelVariant } from 'web-components/src/components/info-label/InfoLabel.types';

import { ORDER_LABEL_TYPE } from './Order.constants';
import { OrderLabelType } from './Order.types';

type OrderLabelProps = {
  type: OrderLabelType;
};

type LabelConfig = {
  [key in OrderLabelType]: {
    variant: InfoLabelVariant;
    label: string;
    labelColor: `text-${string}`;
    icon: JSX.Element;
  };
};

const labelConfig: LabelConfig = {
  [ORDER_LABEL_TYPE.delivered]: {
    variant: 'success' as InfoLabelVariant,
    label: 'Credits delivered',
    labelColor: 'text-brand-400',
    icon: (
      <ArrowDownIcon
        sx={theme => ({
          color: theme.palette.secondary.main,
          display: 'flex',
          alignItems: 'center',
        })}
      />
    ),
  },
  [ORDER_LABEL_TYPE.pending]: {
    variant: 'pending' as InfoLabelVariant,
    label: 'Credit issuance pending',
    labelColor: 'text-orange-700',
    icon: (
      <PendingIcon
        sx={{
          color: '#7A400B',
          display: 'flex',
          alignItems: 'center',
          '&.MuiSvgIcon-root': { width: '16px', height: '16px' },
        }}
      />
    ),
  },
};

export const OrderLabel = ({ type }: OrderLabelProps) => {
  const { variant, label, labelColor, icon } = labelConfig[type];

  return (
    <InfoLabel
      variant={variant}
      label={label}
      sx={{ padding: '6px 10px', borderRadius: '50px' }}
      labelClassName={`${labelColor} text-xs font-extrabold}`}
      icon={icon}
    />
  );
};
