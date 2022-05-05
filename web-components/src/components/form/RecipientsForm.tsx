import React from 'react';
import { makeStyles, styled } from '@mui/styles';
import {
  Formik,
  Form,
  Field,
  // FormikErrors,
  FieldArray,
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
  // validateCreditRetire,
  initialValues as initialValuesRetire,
  BottomCreditRetireFieldsProps,
} from './CreditRetireForm';
// import {
//   requiredMessage,
//   insufficientCredits,
//   validateAmount,
// } from '../inputs/validation';
import OutlinedButton from '../buttons/OutlinedButton';

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
        sender: Yup.string().required('Sender is required'),
        recipient: Yup.string().required('Recipient is required'), //.min(4, 'too short').required
        tradableAmount: Yup.number().required().positive().integer(),
        withRetire: Yup.boolean().required(),
        retiredAmount: Yup.number().when('withRetire', {
          is: true,
          then: Yup.number().required().positive().integer(),
        }),
        note: Yup.string().when('withRetire', {
          is: true,
          then: Yup.string(),
        }),
        country: Yup.string().when('withRetire', {
          is: true,
          then: Yup.string().required(),
        }),
        stateProvince: Yup.string().when('withRetire', {
          is: true,
          then: Yup.string(),
        }),
        postalCode: Yup.string().when('withRetire', {
          is: true,
          then: Yup.string(),
        }),
        retirementLocation: Yup.string().when('withRetire', {
          is: true,
          then: Yup.string(),
        }),
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

  // const validateHandler = (values: FormValues): FormikErrors<FormValues> => {
  //   let errors: FormikErrors<FormValues> = {};

  //   // if (!values.sender) {
  //   //   errors.sender = requiredMessage;
  //   // }
  //   // if (!values.recipient) {
  //   //   errors.recipient = requiredMessage;
  //   // }

  // const errAmount = validateAmount(
  //   availableTradableAmount,
  //   values.tradableAmount,
  // );
  // if (errAmount) errors.tradableAmount = errAmount;

  // // Retire form validation (optional subform)
  // if (values.withRetire) {
  //   errors = validateCreditRetire(availableTradableAmount, values, errors);

  //   // combo validation: issuance + retire
  //   if (
  //     Number(values.tradableAmount) + Number(values.retiredAmount) >
  //     availableTradableAmount
  //   ) {
  //     errors.tradableAmount = insufficientCredits;
  //     errors.retiredAmount = insufficientCredits;
  //   }
  // }

  //   return errors;
  // };

  return (
    <Formik
      initialValues={initialValues}
      // validate={validateHandler}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="recipients">
            {({ insert, remove, push }) => (
              <div>
                {values.recipients.length > 0 &&
                  values.recipients.map((friend, index) => (
                    <Card key={index}>
                      <button
                        type="button"
                        className="secondary"
                        onClick={() => remove(index)}
                      >
                        X
                      </button>
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
                        <CreditRetireFields
                          availableTradableAmount={availableTradableAmount}
                          batchDenom={batchDenom}
                          mapboxToken={mapboxToken}
                          arrayIndex={index}
                          arrayPrefix={`recipients.${index}.`}
                        />
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
