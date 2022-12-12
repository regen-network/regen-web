import React from 'react';

import { BrokenLinkIcon } from '../icons/BrokenLinkIcon';
import { Item, TxModal, TxModalProps } from './TxModal';

interface Props extends TxModalProps {
  error: string;
  cardItems?: Item[];
}

const TxErrorModal: React.FC<React.PropsWithChildren<Props>> = ({
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
      title={title ?? 'Sorry, your transaction was not successful.'}
      {...props}
    />
  );
};

export { TxErrorModal };
