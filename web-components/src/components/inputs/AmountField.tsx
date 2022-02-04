import React from 'react';
import { Field } from 'formik';
import TextField from './TextField';

interface AvailableProp {
  amount: number;
  type: string;
}

const AvailableLabel: React.FC<AvailableProp> = ({ amount, type }) => {
  return (
    <>
      <span style={{ fontSize: '14px' }}>Available:</span>{' '}
      <span style={{ fontSize: '12px' }}>
        {amount} {type}
      </span>
    </>
  );
};

interface FieldProps {
  label: string;
  available: AvailableProp;
}

const AmountField: React.FC<FieldProps> = ({ label, available }) => {
  return (
    <Field
      component={TextField}
      type="number"
      label={
        <>
          {label}
          <AvailableLabel amount={available.amount} type={available.type} />
        </>
      }
      name="amount"
    />
  );
};

export default AmountField;
