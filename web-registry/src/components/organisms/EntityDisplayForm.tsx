import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, Link } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import cx from 'clsx';

import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import OnboardingFooter from 'web-components/lib/components/fixed-footer/OnboardingFooter';
import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';

interface EntityDisplayFormProps {
  submit: (values: EntityDisplayValues) => Promise<void>;
  initialValues?: EntityDisplayValues;
}

export interface EntityDisplayValues {
  // 'http://regen.network/landOwner': string;
}

export interface EntityDisplayValuesErrors {
  // 'http://regen.network/landOwner': string;
}

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    paddingBottom: 0,
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
}));

const EntityDisplayForm: React.FC<EntityDisplayFormProps> = ({ submit, initialValues }) => {
  const styles = useStyles();

  return (
    <>
      <Formik
        enableReinitialize
        validateOnMount
        initialValues={
          initialValues || {
            'http://regen.network/landOwner': initialValues?.['http://regen.network/landOwner'] || '',
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
        {({ submitForm, isValid, isSubmitting }) => {
          return (
            <Form translate="yes">
              <OnBoardingCard className={styles.card}>
                <Title className={styles.title}>Choose the entities to show on the project page:</Title>
                <Description className={cx(styles.description, styles.field)}>
                  Showing more entities increases the salability of the project. You must show at least one
                  entity on the project page. These entities can only be edited in the previous step.&nbsp;
                  <Link>See an example»</Link>
                </Description>
                <Field classes={{ root: styles.field }} />
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
