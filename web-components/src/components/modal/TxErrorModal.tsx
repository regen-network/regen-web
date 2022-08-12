import React from 'react';

import { BrokenLinkIcon } from '../icons/BrokenLinkIcon';
import { TxModal, TxModalProps } from './TxModal';

interface Props extends TxModalProps {
  error: string;
}

const TxErrorModal: React.FC<Props> = props => {
  return (
    <TxModal
      icon={<BrokenLinkIcon sx={{ pb: 4.5 }} />}
      cardItems={[
        {
          label: 'error',
          value: {
            name: props.error,
          },
          color: 'error.main',
        },
      ]}
      title="Sorry, your transaction was not successful."
      {...props}
    />
  );
};

export { TxErrorModal };
