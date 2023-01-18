import { forwardRef, PropsWithChildren } from 'react';

import { AuxiliarLabel } from './AmountField.AuxiliarLabel';
import { AmountLabel } from './AmountField.Label';
import { useAmountFieldStyles } from './AmountField.styles';
import { AmountTextField } from './AmountField.TextField';
import { AmountLabelProps } from './AmountField.types';

interface AmountFieldProps extends AmountLabelProps, PropsWithChildren {
  name: string;
  auxiliarLabel?: string;
  formErrors: string[];
  className?: string;
  onMaxClick?: (amount: number) => void;
}

const AmountField = forwardRef<HTMLDivElement, AmountFieldProps>(
  (
    {
      name,
      label = 'Amount',
      auxiliarLabel,
      availableAmount,
      denom,
      formErrors,
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
          {...props}
          ref={ref}
          name={name}
          formErrors={formErrors}
          type="number"
          availableAmount={availableAmount}
          className={cx(styles.textField, className)}
          onMaxClick={onMaxClick}
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
  },
);

export default AmountField;
