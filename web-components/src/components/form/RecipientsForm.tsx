import React from 'react';
import { styled, useTheme } from '@mui/styles';
import { Field, FieldArray, Form, Formik, useFormikContext } from 'formik';
import { makeStyles } from 'tss-react/mui';
import * as Yup from 'yup';

import { Theme } from '../../theme/muiTheme';
import OutlinedButton from '../buttons/OutlinedButton';
import OnBoardingCard from '../cards/OnBoardingCard';
import TrashIcon from '../icons/TrashIcon';
import CheckboxLabel from '../inputs/CheckboxLabel';
import TextField from '../inputs/TextField';
import {
  invalidAmount,
  invalidRegenAddress,
  isValidAddress,
  requiredMessage,
} from '../inputs/validation';
import { Label, Subtitle } from '../typography';
import {
  BottomCreditRetireFields,
  BottomCreditRetireFieldsProps,
  initialValues as initialValuesRetire,
  RetireFormValues,
  RetirementReminder,
} from './CreditRetireForm';

const useStyles = makeStyles()((theme: Theme) => ({
  checkboxLabel: {
    marginTop: theme.spacing(10.75),
  },
}));

export interface FormProps extends BottomCreditRetireFieldsProps {
  addressPrefix: string;
  onSubmit: (values: FormValues) => void;
}

export interface Recipient extends RetireFormValues {
  recipient: string;
  tradableAmount: number;
  withRetire: boolean;
}

export interface FormValues {
  recipients: Recipient[];
}

type Return = {
  recipients: Yup.ArraySchema<Yup.AnyObjectSchema>;
};

// validationSchemaFields
export function getValidationSchemaFields(addressPrefix: string): Return {
  return {
    recipients: Yup.array()
      .of(
        Yup.object().shape({
          recipient: Yup.string()
            .required(requiredMessage)
            .test('is-regen-address', invalidRegenAddress, value =>
              typeof value === 'string'
                ? isValidAddress(value, addressPrefix)
                : false,
            ),
          tradableAmount: Yup.number()
            .required(requiredMessage)
            .positive()
            .integer()
            .min(1, invalidAmount)
            .when('withRetire', {
              is: true,
              then: Yup.number()
                .required(requiredMessage)
                .positive()
                .integer()
                .min(0, invalidAmount),
            }),
          withRetire: Yup.boolean().required(),
          retiredAmount: Yup.number().when('withRetire', {
            is: true,
            then: Yup.number()
              .required(requiredMessage)
              .positive()
              .integer()
              .min(1, invalidAmount),
          }),
        }),
      )
      .required('Must have recipients') // these constraints are shown if and only if inner constraints are satisfied
      .min(1, 'Minimum of 1 recipient'),
  };
}

export function getValidationSchema(
  addressPrefix: string,
): Yup.AnyObjectSchema {
  return Yup.object().shape(getValidationSchemaFields(addressPrefix));
}

const recipientInitialValues = {
  recipient: '',
  tradableAmount: 0,
  withRetire: false,
  ...initialValuesRetire,
};

export const initialValues = {
  recipients: [{ ...recipientInitialValues }],
};

export const RecipientsForm: React.FC<React.PropsWithChildren<FormProps>> = ({
  addressPrefix,
  mapboxToken,
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={getValidationSchema(addressPrefix)}
      onSubmit={onSubmit}
    >
      {() => (
        <Form>
          <RecipientsFieldArray mapboxToken={mapboxToken} />
          <Card>
            <OutlinedButton type="submit">Next</OutlinedButton>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

const Card = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(10),
  marginBottom: theme.spacing(10),
  border: `1px solid ${theme.palette.grey[100]}`,
  borderRadius: '5px',
  backgroundColor: theme.palette.primary.main,
}));

interface ButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  onClick,
}) => {
  const theme = useTheme<Theme>();

  return (
    <OutlinedButton
      size="small"
      sx={{
        border: 'none',
        maxWidth: '100px',
        float: 'right',
        mb: 4,
      }}
      onClick={onClick}
      startIcon={<TrashIcon className="text-brand-100" />}
    >
      <Label
        sx={{
          fontSize: {
            xs: '14px',
            sm: '18px',
            color: theme.palette.info.dark,
          },
        }}
      >
        Delete
      </Label>
    </OutlinedButton>
  );
};

const AddRecipientButton: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  onClick,
}) => (
  <OnBoardingCard>
    <OutlinedButton onClick={onClick} sx={{ width: '100%' }}>
      + Add recipient
    </OutlinedButton>
  </OnBoardingCard>
);

export function RecipientsFieldArray({
  mapboxToken,
}: BottomCreditRetireFieldsProps): React.ReactElement {
  const { classes: styles } = useStyles();
  const { values } = useFormikContext<FormValues>();

  return (
    <FieldArray name="recipients">
      {({ remove, push }) => (
        <div>
          {values.recipients.length > 0 &&
            values.recipients.map((recipient, index) => (
              <OnBoardingCard key={`recipient-${index}`}>
                {index > 0 && <DeleteButton onClick={() => remove(index)} />}
                <Field
                  name={`recipients.${index}.recipient`}
                  type="text"
                  label="Recipient address"
                  component={TextField}
                />
                <Field
                  name={`recipients.${index}.tradableAmount`}
                  type="number"
                  label="Amount tradable"
                  component={TextField}
                />
                <Field
                  name={`recipients.${index}.withRetire`}
                  component={CheckboxLabel}
                  type="checkbox"
                  className={styles.checkboxLabel}
                  label={
                    <Subtitle size="lg" color="primary.contrastText">
                      Send additional retired credits
                    </Subtitle>
                  }
                />

                {values.recipients[index].withRetire && (
                  <>
                    <RetirementReminder sx={{ mt: 8 }} />
                    <Field
                      name={`recipients.${index}.retiredAmount`}
                      type="number"
                      label="Amount retired"
                      component={TextField}
                    />
                    <BottomCreditRetireFields
                      mapboxToken={mapboxToken}
                      arrayIndex={index}
                      arrayPrefix={`recipients.${index}.`}
                    />
                  </>
                )}
              </OnBoardingCard>
            ))}

          <AddRecipientButton
            onClick={() => push({ ...recipientInitialValues })}
          />
        </div>
      )}
    </FieldArray>
  );
}
