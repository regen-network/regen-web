import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Theme,
  makeStyles,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Collapse,
  Zoom,
} from '@material-ui/core';
import { Form, Formik, Field } from 'formik';

import ControlledTextField from '../inputs/ControlledTextField';
import ImageField from '../inputs/ImageField';
import { requiredMessage } from '../inputs/validation';
import OnBoardingCard from '../cards/OnBoardingCard';
import FormLabel from './ControlledFormLabel';
import LocationField from '../inputs/LocationField';
import { OnboardingSubmit } from '../form/OnboardingSubmit';

interface FormProps {
  submit: (values: OrgProfileFormValues) => Promise<void>;
  goBack: () => void;
  skip: () => void;
  initialValues?: OrgProfileFormValues;
  mapToken: string;
}

export interface OrgProfileFormValues {
  description?: string;
  displayName: string;
  legalName: string;
  location: string;
  logo: string;
}

type AcctType = 'user' | 'organization';

const useStyles = makeStyles((theme: Theme) => ({
  topCard: {
    marginBottom: 0,
  },
  radio: {
    border: `1px solid ${theme.palette.grey[100]}`,
    borderRadius: '5px',
    margin: `${theme.spacing(4)} 0 0`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(4)} ${theme.spacing(4)}`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  radioActive: {
    backgroundColor: theme.palette.grey[50],
    transform: 'scale(1.01)',
    boxShadow: theme.shadows[1],
    border: `1px solid ${theme.palette.secondary.light}`,
    '& .MuiTypography-body1': {
      fontWeight: 'bold',
    },
  },
  radioBtn: {
    padding: `0 ${theme.spacing(2)} ${theme.spacing(2)} 0`,
  },
  textField: {
    '&:first-of-type': {
      marginTop: 0,
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(4),
    },
  },
}));

const OrganizationProfileForm: React.FC<FormProps> = props => {
  const [acctType, setAcctType] = useState<AcctType>('user');
  const classes = useStyles();
  const isIndividual = acctType === 'user';
  const isOrg = acctType === 'organization';

  return (
    <Formik
      enableReinitialize
      initialValues={
        props.initialValues || {
          description: '',
          displayName: '',
          legalName: '',
          location: '',
          logo: '',
        }
      }
      validate={(values: OrgProfileFormValues) => {
        const errors: Partial<OrgProfileFormValues> = {};
        if (isOrg) {
          const errorFields: Array<keyof OrgProfileFormValues> = [
            'displayName',
            'legalName',
            'location',
            'logo',
          ];
          errorFields.forEach(value => {
            if (!values[value]) {
              errors[value] = requiredMessage;
            }
          });
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          await props.submit(values);
          setSubmitting(false);
        } catch (e) {
          setSubmitting(false);
        }
      }}
    >
      {({ submitForm, isSubmitting, isValid, submitCount }) => {
        return (
          <Form>
            <OnBoardingCard className={classes.topCard}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel>Are you part of an organization?</FormLabel>
                <RadioGroup
                  aria-label="isOrganization"
                  name="isOrganization"
                  value={acctType}
                  onChange={({ target: { value } }) => setAcctType(value as AcctType)}
                >
                  <FormControlLabel
                    className={clsx(classes.radio, isIndividual && classes.radioActive)}
                    value="personal"
                    control={<Radio className={classes.radioBtn} />}
                    label="No, I will register projects only as an individual"
                  />
                  <FormControlLabel
                    className={clsx(classes.radio, isOrg && classes.radioActive)}
                    value="organization"
                    control={<Radio className={classes.radioBtn} />}
                    label="Yes, I am part of an organization which will be associated with my project(s)"
                  />
                </RadioGroup>
              </FormControl>
            </OnBoardingCard>

            <PopIn isOpen={acctType === 'organization'}>
              <OnBoardingCard>
                <Field
                  className={classes.textField}
                  component={ControlledTextField}
                  description="This is the name of your farm, ranch, cooperative, non-profit, or other organization."
                  label="Organization legal name"
                  name="legalName"
                  placeholder="i.e. Cherrybrook Farms LLC"
                />
                <Field
                  className={classes.textField}
                  component={ControlledTextField}
                  description="This is the display name on your project page, if you choose to make this entity publically viewable."
                  label="Display name for organization"
                  name="displayName"
                  placeholder="i.e. Cherrybrook Farms"
                />
                <Field
                  className={classes.textField}
                  component={LocationField}
                  description="This address is used for issuing credits.  If you choose to show this entity on the project page, only city, state/province, and country will be displayed. "
                  label="Organization location"
                  name="location"
                  placeholder="Start typing the location"
                  token={props.mapToken}
                />
                <Field
                  className={classes.textField}
                  component={ImageField}
                  label="Organization logo"
                  name="logo"
                />
                <Field
                  className={classes.textField}
                  charLimit={160}
                  component={ControlledTextField}
                  description="Describe any relevant background and experience. This info may be shown on the project page."
                  label="Short organization description"
                  name="description"
                  rows={3}
                  multiline
                  optional
                />
              </OnBoardingCard>
            </PopIn>

            <OnboardingSubmit
              onSubmit={isIndividual ? props.skip : submitForm}
              onCancel={props.goBack}
              disabled={(submitCount > 0 && !isValid) || isSubmitting}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

const PopIn: React.FC<{ isOpen: boolean }> = ({ children, isOpen }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Zoom in={isOpen}>
        <div>
          <Collapse in={isOpen} collapsedHeight={0}>
            <div>{children}</div>
          </Collapse>
        </div>
      </Zoom>
    </div>
  );
};

export default OrganizationProfileForm;
