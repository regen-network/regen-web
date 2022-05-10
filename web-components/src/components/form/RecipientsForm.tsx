/* eslint-disable no-console */
import React from 'react';
import { makeStyles, styled } from '@mui/styles';
import {
  Formik,
  Form,
  Field,
  // FormikErrors,
  FieldArray,
  validateYupSchema,
  yupToFormErrors,
} from 'formik';
import * as Yup from 'yup';

import { Theme } from '../../theme/muiTheme';
import TextField from '../inputs/TextField';
import AmountField from '../inputs/AmountField';
import Description from '../description';
import CheckboxLabel from '../inputs/CheckboxLabel';
import {
  CreditRetireFields,
  RetireFormValues,
  RetirementReminder,
  initialValues as initialValuesRetire,
  BottomCreditRetireFieldsProps,
} from './CreditRetireForm';
import {
  requiredMessage,
  insufficientCredits,
  invalidAmount,
} from '../inputs/validation';
import OutlinedButton from '../buttons/OutlinedButton';
// import { SchemaLike } from 'yup/lib/types';

const useStyles = makeStyles((theme: Theme) => ({
  //   senderField: {
  //     '& label': {
  //       color: `${theme.palette.primary.contrastText} !important`,
  //     },
  //     '& .MuiInputBase-formControl': {
  //       backgroundColor: theme.palette.info.light,
  //     },
  //   },
  description: {
    marginBottom: theme.spacing(5),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(4),
    },
    '& a': {
      cursor: 'pointer',
    },
  },
  checkboxLabel: {
    marginTop: theme.spacing(10.75),
    alignItems: 'initial',
    '& .MuiCheckbox-root': {
      alignSelf: 'end',
    },
  },
  checkboxDescription: {
    color: theme.palette.primary.contrastText,
    fontSize: theme.spacing(4.5),
    fontWeight: 'bold',
    marginLeft: theme.spacing(1),
  },
}));

export interface FormProps extends BottomCreditRetireFieldsProps {
  sender: string;
  batchDenom: string;
  availableTradableAmount: number;
  onSubmit: (values: FormValues) => void;
}

export interface Recipient extends RetireFormValues {
  sender: string;
  recipient: string;
  tradableAmount: number;
  withRetire: boolean;
}

export interface FormValues {
  recipients: Recipient[];
}

const validationSchema = Yup.object().shape({
  recipients: Yup.array()
    .of(
      Yup.object().shape({
        sender: Yup.string().required(),
        recipient: Yup.string().required(requiredMessage), // TODO: improve validation: .min(20, 'too short').required
        tradableAmount: Yup.number()
          .required(invalidAmount)
          .positive()
          .integer()
          .min(1, invalidAmount)
          .test(
            'tradableAmount-test',
            insufficientCredits,
            // 'The amount of available credits has been exceeded',
            (value, context): any => {
              const totalAmount =
                context.options.context?.values.recipients.reduce(
                  (sum: number, recipient: Recipient) =>
                    (sum += Number(recipient.tradableAmount)
                      ? Number(recipient.tradableAmount)
                      : 0),
                  0,
                );
              return (
                totalAmount <=
                  context.options.context?.availableTradableAmount &&
                (value as number) <=
                  context.options.context?.availableTradableAmount
              );
            },
          ),

        withRetire: Yup.boolean().required(),
        retiredAmount: Yup.number()
          .when('withRetire', {
            is: true,
            then: Yup.number()
              .required()
              .positive()
              .integer()
              .min(1, invalidAmount),
          })
          .test(
            'retiredAmount-test',
            // insufficientCredits,
            'The amount retired cannot exceed the amount allocated to this recipient',
            (value, context): any => {
              // eslint-disable-next-line no-console
              console.log('retiredAmount-test', context);
              return (value as number) <= context.parent.tradableAmount;
            },
          ),
        // note: Yup.string().when('withRetire', {
        //   is: true,
        //   then: Yup.string(),
        // }),
        country: Yup.string().when('withRetire', {
          is: true,
          then: Yup.string().required(),
        }),
        // stateProvince: Yup.string().when('withRetire', {
        //   is: true,
        //   then: Yup.string(),
        // }),
        // postalCode: Yup.string().when('withRetire', {
        //   is: true,
        //   then: Yup.string(),
        // }),
        // retirementLocation: Yup.string().when('withRetire', {
        //   is: true,
        //   then: Yup.string(),
        // }),
      }),
    )
    .required('Must have recipients') // these constraints are shown if and only if inner constraints are satisfied
    .min(1, 'Minimum of 1 recipient'),
});

export const RecipientsForm: React.FC<FormProps> = ({
  sender,
  batchDenom,
  availableTradableAmount,
  mapboxToken,
  onSubmit,
}) => {
  const styles = useStyles();

  const recipientInitialValues = {
    sender,
    recipient: '',
    tradableAmount: 0,
    withRetire: false,
    ...initialValuesRetire,
  };

  const initialValues = {
    recipients: [{ ...recipientInitialValues }],
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values: FormValues) => {
        // eslint-disable-next-line no-console
        console.log('validate values', values);
        try {
          validateYupSchema<FormValues>(values, validationSchema, true, {
            values,
            availableTradableAmount,
          });
        } catch (err) {
          return yupToFormErrors(err);
        }
        return {};
      }}
      onSubmit={onSubmit}
    >
      {({ values, errors }) => (
        <Form>
          {console.log('> VALUES', values)}
          {errors && console.log('> ERRORS', errors)}
          <FieldArray name="recipients">
            {({ insert, remove, push }) => (
              <div>
                {values.recipients.length > 0 &&
                  values.recipients.map((recipient, index) => (
                    <Card key={index}>
                      {index > 0 && (
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          X Delete
                        </button>
                      )}
                      <Field
                        name={`recipients.${index}.recipient`}
                        type="text"
                        label="Recipient address"
                        component={TextField}
                      />
                      <AmountField
                        name={`recipients.${index}.tradableAmount`}
                        label={'Amount'}
                        availableAmount={availableTradableAmount}
                        denom={batchDenom}
                      />

                      <Field
                        name={`recipients.${index}.withRetire`}
                        component={CheckboxLabel}
                        type="checkbox"
                        className={styles.checkboxLabel}
                        label={
                          <Description className={styles.checkboxDescription}>
                            Retire credits upon issuance
                          </Description>
                        }
                      />

                      {values.recipients[index].withRetire && (
                        <>
                          <RetirementReminder />
                          <CreditRetireFields
                            availableTradableAmount={availableTradableAmount}
                            batchDenom={batchDenom}
                            mapboxToken={mapboxToken}
                            arrayIndex={index}
                            arrayPrefix={`recipients.${index}.`}
                          />
                        </>
                      )}
                    </Card>
                  ))}

                <Card>
                  <OutlinedButton
                    onClick={() => push({ ...recipientInitialValues })}
                  >
                    + Add recipient
                  </OutlinedButton>
                </Card>
              </div>
            )}
          </FieldArray>

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
