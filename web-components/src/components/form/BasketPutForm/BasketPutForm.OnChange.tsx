import { useEffect } from 'react';
import { useFormikContext } from 'formik';

import { FormValues } from './BasketPutForm';

type Props = {
  onBatchDenomChange?: (batchDenom: string | undefined) => void;
};

export const BasketPutFormOnChange = ({ onBatchDenomChange }: Props): null => {
  const { values } = useFormikContext<FormValues>();

  useEffect(() => {
    onBatchDenomChange && onBatchDenomChange(values.batchDenom);
  }, [values.batchDenom, onBatchDenomChange]);

  return null;
};
