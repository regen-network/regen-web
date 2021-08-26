import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme, Link } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import cx from 'clsx';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';
import Toggle from 'web-components/lib/components/inputs/Toggle';
import ImageField from 'web-components/lib/components/inputs/ImageField';
import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import OrganizationIcon from 'web-components/lib/components/icons/OrganizationIcon';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';

interface EntityDisplayFormProps {
  submit: (values: EntityDisplayValues) => Promise<void>;
  initialValues?: EntityDisplayValues;
}

export interface EntityDisplayValues {
  // 'http://regen.network/landOwner': string;
  checkMe?: boolean;
  checkMe2?: boolean;
}

export interface EntityDisplayValuesErrors {
  // 'http://regen.network/landOwner': string;
}

const useStyles = makeStyles(theme => ({
  card: {
    // paddingBottom: 0,
  },
  title: {
    fontWeight: 700,
    color: theme.palette.primary.contrastText,
    fontFamily: theme.typography.fontFamily,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  field: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(12),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(10),
    },
  },
  description: {},
  error: {
    marginTop: 0,
  },
  activeContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    // '&:first-of-type': {
    //   marginTop: 0,
    // },
    // [theme.breakpoints.up('sm')]: {
    //   marginTop: theme.typography.pxToRem(40),
    // },
    // [theme.breakpoints.down('xs')]: {
    //   marginTop: theme.typography.pxToRem(33),
    // },
  },
  organizationIcon: {
    height: theme.spacing(11),
    width: '100%',
  },
}));

const EntityDisplayForm: React.FC<EntityDisplayFormProps> = ({ submit, initialValues }) => {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <>
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={
          initialValues ||
          {
            // 'http://regen.network/landOwner': initialValues?.['http://regen.network/landOwner'] || '',
          }
        }
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            await submit(values);
            setSubmitting(false);
          } catch (e) {
            setSubmitting(false);
          }
        }}
      >
        {({ submitForm, isValid, isSubmitting, handleChange, values }) => {
          return (
            <Form translate="yes">
              <OnBoardingCard className={styles.card}>
                <Title className={styles.title}>Choose the entities to show on the project page:</Title>
                <Description className={cx(styles.description, styles.field)}>
                  Showing more entities increases the salability of the project. You must show at least one
                  entity on the project page. These entities can only be edited in the previous step.&nbsp;
                  <Link onClick={() => {}}>See an example»</Link>
                </Description>
                <Field
                  className={styles.field}
                  label="an org"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="checkMe"
                  checked={!!values.checkMe}
                  activeContent={
                    <div className={styles.activeContent}>
                      <Field
                        className={styles.field}
                        component={ControlledTextField}
                        name="organizationDisplayName"
                        label="Organization display name"
                        optional
                        placeholder="i.e. Cherrybrook Farms"
                      />
                      <Field
                        className={styles.field}
                        component={ImageField}
                        label="Organization logo"
                        name="logo"
                        fallbackAvatar={
                          <OrganizationIcon
                            className={styles.organizationIcon}
                            color={theme.palette.info.main}
                          />
                        }
                      />
                      <Field
                        charLimit={160}
                        component={ControlledTextField}
                        label="Short organization description"
                        name="['http://regen.network/landStewardStory']"
                        rows={4}
                        multiline
                      />
                    </div>
                  }
                />
                <Field
                  className={styles.field}
                  label="a person"
                  description="recommended to increase salability"
                  type="checkbox"
                  component={Toggle}
                  onChange={handleChange}
                  name="checkMe2"
                  checked={!!values.checkMe2}
                  activeContent={
                    <div className={styles.activeContent}>
                      <Field className={styles.field} component={ImageField} label="Bio photo" name="photo" />
                      <Field
                        charLimit={160}
                        component={ControlledTextField}
                        label="Short personal description"
                        description="Describe any relevant background and experience."
                        name="['http://regen.network/landStewardStory']"
                        rows={4}
                        multiline
                      />
                    </div>
                  }
                />
              </OnBoardingCard>

              <OnboardingFooter
                onSave={submitForm}
                saveText={'Save and Next'}
                onPrev={() => null} // TODO
                onNext={() => null} // TODO
                hideProgress={false} // TODO
                saveDisabled={!isValid || isSubmitting}
                percentComplete={0} // TODO
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { EntityDisplayForm };
