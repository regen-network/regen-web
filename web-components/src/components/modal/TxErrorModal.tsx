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
  return (
    <TxModal
      icon={icon ?? <BrokenLinkIcon sx={{ pb: 4.5 }} />}
      cardItems={
        cardItems
          ? cardItems
          : [
              {
                label: 'error',
                value: {
                  name: error,
                },
                color: 'error.main',
              },
            ]
      }
      title={title ?? 'Sorry, your transaction was not successful.'}
      {...props}
    />
  );
};

export { TxErrorModal };
