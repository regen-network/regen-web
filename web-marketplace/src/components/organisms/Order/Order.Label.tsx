import { MessageDescriptor } from '@lingui/core';
import { useLingui } from '@lingui/react';

import ArrowDownIcon from 'web-components/src/components/icons/ArrowDownIcon';
import PendingIcon from 'web-components/src/components/icons/PendingIcon';
import InfoLabel from 'web-components/src/components/info-label';
import { InfoLabelVariant } from 'web-components/src/components/info-label/InfoLabel.types';

import {
  CREDIT_ISSUANCE_PENDING,
  CREDITS_DELIVERED,
  ORDER_STATUS,
} from './Order.constants';
import { OrderStatus } from './Order.types';

type OrderLabelProps = {
  type: OrderStatus;
  wrapperClassName?: string;
};

type LabelConfig = {
  [key in OrderStatus]: {
    variant: InfoLabelVariant;
    label: MessageDescriptor;
    labelColor: `text-${string}`;
    icon: JSX.Element;
  };
};

const labelConfig: LabelConfig = {
  [ORDER_STATUS.delivered]: {
    variant: 'success' as InfoLabelVariant,
    label: CREDITS_DELIVERED,
    labelColor: 'text-brand-500',
    icon: <ArrowDownIcon className="text-brand-500 flex items-center" />,
  },
  [ORDER_STATUS.pending]: {
    variant: 'pending' as InfoLabelVariant,
    label: CREDIT_ISSUANCE_PENDING,
    labelColor: 'text-orange-700',
    icon: (
      <PendingIcon
        sx={{
          '&.MuiSvgIcon-root': { width: '16px', height: '16px' },
        }}
        className="text-orange-700 flex items-center"
      />
    ),
  },
};

export const OrderLabel = ({
  type,
  wrapperClassName = '',
}: OrderLabelProps) => {
  const { variant, label, labelColor, icon } = labelConfig[type];
  const { _ } = useLingui();
  return (
    <InfoLabel
      variant={variant}
      label={_(label)}
      sx={{ padding: '6px 10px', borderRadius: '50px' }}
      labelClassName={`${labelColor} text-xs font-bold`}
      icon={icon}
      wrapperClassName={wrapperClassName}
    />
  );
};
