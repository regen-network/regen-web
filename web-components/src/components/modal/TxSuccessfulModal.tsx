import React from 'react';

import { TxModal, TxModalProps } from './TxModal';

const TxSuccessfulModal: React.FC<TxModalProps> = props => {
  return (
    <TxModal title="Congrats! Your transaction was successful." {...props} />
  );
};

export { TxSuccessfulModal };
