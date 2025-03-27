import React from 'react';
import { useTheme } from '@mui/styles';
import { Field, FieldArray, useFormikContext } from 'formik';
import { makeStyles } from 'tss-react/mui';
import * as Yup from 'yup';

import { Theme } from '../../theme/muiTheme';
import OutlinedButton from '../buttons/OutlinedButton';
import OnBoardingCard from '../cards/OnBoardingCard';
import TrashIcon from '../icons/TrashIcon';
import CheckboxLabel from '../inputs/CheckboxLabel';
import TextField from '../inputs/TextField';
import { isValidAddress } from '../inputs/validation';
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
  retirementInfoText: string;
  addressPrefix: string;
  deleteButtonText: string;
  addButtonText: string;
  recipientLabel: string;
  amountTradableLabel: string;
  amountRetiredLabel: string;
  withRetireLabel: string;
  submitButtonText: string;
  requiredError: string;
  minimumError: string;
  requiredMessage: string;
  invalidRegenAddress: string;
  invalidAmount: string;
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

type ValidationSchemaFieldsType = {
  requiredMessage: string;
  invalidRegenAddress: string;
  invalidAmount: string;
  addressPrefix: string;
  requiredError: string;
  minimumError: string;
};

// validationSchemaFields
export function getValidationSchemaFields({
  requiredMessage,
  invalidRegenAddress,
  invalidAmount,
  addressPrefix,
  requiredError,
  minimumError,
}: ValidationSchemaFieldsType): Return {
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
      .required(requiredError) // these constraints are shown if and only if inner constraints are satisfied
      .min(1, minimumError),
  };
}

type ValidationSchemaType = {
  requiredMessage: string;
  invalidRegenAddress: string;
  invalidAmount: string;
  addressPrefix: string;
  requiredError: string;
  minimumError: string;
};

export function getValidationSchema({
  requiredMessage,
  invalidRegenAddress,
  invalidAmount,
  addressPrefix,
  requiredError,
  minimumError,
}: ValidationSchemaType): Yup.AnyObjectSchema {
  return Yup.object().shape(
    getValidationSchemaFields({
      requiredMessage,
      invalidRegenAddress,
      invalidAmount,
      addressPrefix,
      requiredError,
      minimumError,
    }),
  );
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

interface ButtonProps {
  buttonText: string;
  onClick: () => void;
}

const DeleteButton: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  buttonText,
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
        {buttonText}
      </Label>
    </OutlinedButton>
  );
};

const AddRecipientButton: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  buttonText,
  onClick,
}) => (
  <OnBoardingCard>
    <OutlinedButton onClick={onClick} sx={{ width: '100%' }}>
      {buttonText}
    </OutlinedButton>
  </OnBoardingCard>
);

export type RecipientsFieldArrayProps = BottomCreditRetireFieldsProps & {
  deleteButtonText: string;
  addButtonText: string;
  recipientLabel: string;
  amountTradableLabel: string;
  amountRetiredLabel: string;
  withRetireLabel: string;
  retirementInfoText: string;
};

export function RecipientsFieldArray({
  mapboxToken,
  bottomTextMapping,
  retirementInfoText,
  deleteButtonText,
  addButtonText,
  recipientLabel,
  amountTradableLabel,
  amountRetiredLabel,
  withRetireLabel,
}: RecipientsFieldArrayProps): React.ReactElement {
  const { classes: styles } = useStyles();
  const { values } = useFormikContext<FormValues>();

  return (
    <FieldArray name="recipients">
      {({ remove, push }) => (
        <div>
          {values.recipients.length > 0 &&
            values.recipients.map((recipient, index) => (
              <OnBoardingCard key={`recipient-${index}`}>
                {index > 0 && (
                  <DeleteButton
                    buttonText={deleteButtonText}
                    onClick={() => remove(index)}
                  />
                )}
                <Field
                  name={`recipients.${index}.recipient`}
                  type="text"
                  label={recipientLabel}
                  component={TextField}
                />
                <Field
                  name={`recipients.${index}.tradableAmount`}
                  type="number"
                  label={amountTradableLabel}
                  component={TextField}
                />
                <Field
                  name={`recipients.${index}.withRetire`}
                  component={CheckboxLabel}
                  type="checkbox"
                  className={styles.checkboxLabel}
                  label={
                    <Subtitle size="lg" color="primary.contrastText">
                      {withRetireLabel}
                    </Subtitle>
                  }
                />

                {values.recipients[index].withRetire && (
                  <>
                    <RetirementReminder
                      sx={{ mt: 8 }}
                      retirementInfoText={retirementInfoText}
                    />
                    <Field
                      name={`recipients.${index}.retiredAmount`}
                      type="number"
                      label={amountRetiredLabel}
                      component={TextField}
                    />
                    <BottomCreditRetireFields
                      bottomTextMapping={bottomTextMapping}
                      mapboxToken={mapboxToken}
                      arrayIndex={index}
                      arrayPrefix={`recipients.${index}.`}
                    />
                  </>
                )}
              </OnBoardingCard>
            ))}

          <AddRecipientButton
            buttonText={addButtonText}
            onClick={() => push({ ...recipientInitialValues })}
          />
        </div>
      )}
    </FieldArray>
  );
}
