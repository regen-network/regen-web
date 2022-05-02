import React from 'react';

import { TxModal, TxModalProps } from './TxModal';

interface Props extends TxModalProps {
  error: string;
}

const TxErrorModal: React.FC<Props> = props => {
  return (
    <TxModal
      title="Sorry, your transaction was not successful."
      cardItems={[
        {
          label: 'error',
          value: {
            name: props.error,
          },
          sx: {
            color: theme => theme.palette.error.main,
          },
        },
      ]}
      {...props}
    />
  );
};

export { TxErrorModal };
