import React from 'react';

import { TxModal, TxModalProps } from './TxModal';

const TxSuccessfulModal: React.FC<TxModalProps & { title?: string }> =
  props => {
    return (
      <TxModal
        {...props}
        title={props?.title ?? 'Congrats! Your transaction was successful.'}
      />
    );
  };

export { TxSuccessfulModal };
