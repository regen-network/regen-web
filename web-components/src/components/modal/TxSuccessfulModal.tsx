import React from 'react';

import { TxModal, TxModalProps } from './TxModal';

export interface TxSuccessfulModalProps extends TxModalProps {
  title?: string;
}

const TxSuccessfulModal: React.FC<TxSuccessfulModalProps> = props => {
  return (
    <TxModal
      {...props}
      title={props?.title ?? 'Congrats! Your transaction was successful.'}
    />
  );
};

export { TxSuccessfulModal };
