import React from 'react';

import { AuxiliarLabel } from './AmountField.AuxiliarLabel';
import { AmountLabel } from './AmountField.Label';
import { useAmountFieldStyles } from './AmountField.styles';
import { AmountTextField } from './AmountField.TextField';
import { AmountLabelProps } from './AmountField.types';

interface AmountFieldProps extends AmountLabelProps {
  name: string;
  auxiliarLabel?: string;
  formErrors: string[];
  className?: string;
}

const AmountField: React.FC<React.PropsWithChildren<AmountFieldProps>> = ({
  name,
  label = 'Amount',
  auxiliarLabel,
  availableAmount,
  denom,
  formErrors,
  className,
}) => {
  const { classes: styles, cx } = useAmountFieldStyles();
  return (
    <>
      <AmountTextField
        formErrors={formErrors}
        name={name}
        type="number"
        availableAmount={availableAmount}
        className={cx(styles.textField, className)}
        label={
          <AmountLabel
            label={label}
            auxiliarLabel={auxiliarLabel}
            availableAmount={availableAmount}
            denom={denom}
          />
        }
      />
      <AuxiliarLabel
        availableAmount={availableAmount}
        denom={denom}
        className={styles.auxiliarLabelMobile}
      />
    </>
  );
};

export default AmountField;
