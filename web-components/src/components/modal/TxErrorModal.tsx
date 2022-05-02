import React from 'react';

import { TxModal, TxModalProps } from './TxModal';
import { BrokenLinkIcon } from '../icons/BrokenLinkIcon';

interface Props extends TxModalProps {
  error: string;
}

const TxErrorModal: React.FC<Props> = props => {
  return (
    <TxModal
      icon={<BrokenLinkIcon sx={{ pb: 4.5 }} />}
      title="Sorry, your transaction was not successful."
      cardItems={[
        {
          label: 'error',
          value: {
            name: props.error,
          },
          sx: {
            color: 'error.main',
          },
        },
      ]}
      {...props}
    />
  );
};

export { TxErrorModal };
