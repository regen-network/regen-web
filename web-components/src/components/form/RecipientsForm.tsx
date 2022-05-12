import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { makeStyles, styled, useTheme } from '@mui/styles';

import { Theme } from '../../theme/muiTheme';
import {
  BottomCreditRetireFields,
  RetireFormValues,
  RetirementReminder,
  initialValues as initialValuesRetire,
  BottomCreditRetireFieldsProps,
} from './CreditRetireForm';
import { requiredMessage, invalidAmount } from '../inputs/validation';
import TextField from '../inputs/TextField';
import CheckboxLabel from '../inputs/CheckboxLabel';
import OutlinedButton from '../buttons/OutlinedButton';
import TrashIcon from '../icons/TrashIcon';
import { Subtitle, Label } from '../typography';

const useStyles = makeStyles((theme: Theme) => ({
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
          .min(1, invalidAmount),
        withRetire: Yup.boolean().required(),
        retiredAmount: Yup.number().when('withRetire', {
          is: true,
          then: Yup.number()
            .required()
            .positive()
            .integer()
            .min(1, invalidAmount),
        }),
      }),
    )
    .required('Must have recipients') // these constraints are shown if and only if inner constraints are satisfied
    .min(1, 'Minimum of 1 recipient'),
});

export const RecipientsForm: React.FC<FormProps> = ({
  sender,
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
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="recipients">
            {({ remove, push }) => (
              <div>
                {values.recipients.length > 0 &&
                  values.recipients.map((recipient, index) => (
                    <Card key={`recipient-${index}`}>
                      {index > 0 && (
                        <DeleteButton onClick={() => remove(index)} />
                      )}
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
                    </Card>
                  ))}

                <AddRecipientButton
                  onClick={() => push({ ...recipientInitialValues })}
                />
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

interface ButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<ButtonProps> = ({ onClick }) => {
  const theme = useTheme<Theme>();

  return (
    <OutlinedButton
      size="small"
      sx={{
        border: 'none !important',
        maxWidth: '100px',
        alignSelf: 'flex-end',
        mb: 4,
      }}
      onClick={onClick}
      startIcon={<TrashIcon color={theme.palette.secondary.main} />}
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

const AddRecipientButton: React.FC<ButtonProps> = ({ onClick }) => (
  <Card>
    <OutlinedButton onClick={onClick}>+ Add recipient</OutlinedButton>
  </Card>
);
