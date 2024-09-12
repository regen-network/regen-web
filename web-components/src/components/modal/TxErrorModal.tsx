import React from 'react';

import { BrokenLinkIcon } from '../icons/BrokenLinkIcon';
import { Item, TxModal, TxModalProps } from './TxModal';

export interface TxErrorModalProps extends TxModalProps {
  error: string;
  txError?: string;
  cardItems?: Item[];
}

const TxErrorModal: React.FC<React.PropsWithChildren<TxErrorModalProps>> = ({
  error,
  cardItems,
  title,
  icon,
  ...props
}) => {
  const defaultCardItems = error
    ? ([
        {
          label: 'error',
          value: {
            name: error,
          },
          color: 'error.main',
        },
      ] as Item[])
    : undefined;

  return (
    <TxModal
      icon={icon ?? <BrokenLinkIcon sx={{ pb: 4.5 }} />}
      cardItems={cardItems ? cardItems : defaultCardItems}
      title={title}
      {...props}
    />
  );
};

export { TxErrorModal };
