import { forwardRef } from 'react';

import { RegenTextFieldProps } from '../TextField/TextField.types';
import { AuxiliaryLabel } from './AmountField.AuxiliaryLabel';
import { AmountLabel } from './AmountField.Label';
import { useAmountFieldStyles } from './AmountField.styles';
import { AmountTextField } from './AmountField.TextField';
import { AmountLabelProps } from './AmountField.types';

interface AmountFieldProps
  extends AmountLabelProps,
    Omit<RegenTextFieldProps, 'label'> {
  name: string;
  auxiliaryLabel?: string;
  maxLabel: string;
  availableLabel: string;
  className?: string;
  onMaxClick?: (amount: number) => void;
}

const AmountField = forwardRef<HTMLDivElement, AmountFieldProps>(
  (
    {
      name,
      label,
      auxiliaryLabel,
      availableAmount,
      denom,
      maxLabel,
      availableLabel,
      className,
      onMaxClick,
      ...props
    },
    ref,
  ) => {
    const { classes: styles, cx } = useAmountFieldStyles();
    return (
      <>
        <AmountTextField
          customInputProps={{
            step: 'any',
            max: availableAmount,
          }}
          ref={ref}
          name={name}
          type="number"
          availableAmount={availableAmount}
          className={cx(styles.textField, className)}
          onMaxClick={onMaxClick}
          maxLabel={maxLabel}
          label={
            <AmountLabel
              label={label}
              auxiliaryLabel={auxiliaryLabel}
              availableLabel={availableLabel}
              availableAmount={availableAmount}
              denom={denom}
            />
          }
          {...props}
        />
        <AuxiliaryLabel
          availableLabel={availableLabel}
          availableAmount={availableAmount}
          denom={denom}
          className={styles.auxiliarLabelMobile}
        />
      </>
    );
  },
);

export default AmountField;
