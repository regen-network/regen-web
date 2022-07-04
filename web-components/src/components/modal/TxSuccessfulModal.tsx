import React from 'react';

import { TxModal, TxModalProps } from './TxModal';

const TxSuccessfulModal: React.FC<TxModalProps & { title?: string }> =
  props => {
    return (
      <TxModal
        title={props?.title ?? 'Congrats! Your transaction was successful.'}
        {...props}
      />
    );
  };

export { TxSuccessfulModal };
