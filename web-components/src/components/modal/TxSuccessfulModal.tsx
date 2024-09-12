import React from 'react';

import CelebrateRegenIcon from '../icons/CelebrateRegenIcon';
import { TxModal, TxModalProps } from './TxModal';

export interface TxSuccessfulModalProps extends TxModalProps {
  title: string;
}

const TxSuccessfulModal: React.FC<TxSuccessfulModalProps> = props => {
  return (
    <TxModal
      {...props}
      icon={<CelebrateRegenIcon sx={{ fontSize: 150, height: 100, mb: 5 }} />}
      title={props?.title}
    />
  );
};

export { TxSuccessfulModal };
