import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';

import Modal, { RegenModalProps } from 'web-components/lib/components/modal';
import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import FormLabel from 'web-components/lib/components/inputs/FormLabel';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import ControlledTextField from 'web-components/lib/components/inputs/ControlledTextField';

interface BuyCreditsModalProps extends RegenModalProps {
  onClose: () => void;
  initialValues?: BuyCreditsValues;
}

export interface BuyCreditsValues {
  'http://regen.network/test': string;
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    borderRadius: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: 0,
      paddingBottom: theme.spacing(7.5),
      paddingLeft: theme.spacing(7.5),
      paddingRight: theme.spacing(7.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(6),
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  btn: {
    marginTop: theme.spacing(4),
    width: '100%',
  },
  cardContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  description: {
    fontSize: theme.typography.pxToRem(16),
    '& a': {
      cursor: 'pointer',
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      // marginBottom: theme.spacing(10),
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
  groupTitle: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      // marginBottom: theme.spacing(10),
    },
  },
  error: {
    marginTop: 0,
  },
}));

const BuyCreditsModal: React.FC<BuyCreditsModalProps> = ({ open, onClose, initialValues }) => {
  const styles = useStyles();

  const submit = async (values: BuyCreditsValues): Promise<void> => {
    console.log('submit ', values);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={styles.root}>
        <Title variant="h4" align="center" className={styles.title}>
          Buy Credits
        </Title>
        <Formik
          enableReinitialize
          validateOnMount
          initialValues={
            initialValues || {
              'http://regen.network/test': initialValues?.['http://regen.network/test'] || '',
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
              <>
                <Form translate="yes">
                  <Title className={styles.groupTitle} variant="h5">
                    Retirement Beneficiary
                  </Title>
                  <Field
                    className={styles.field}
                    component={ControlledTextField}
                    label="Your name or organization name"
                    description="Please note that this name will be publically viewable on the ledger."
                    name="retirementBeneficiary"
                    optional
                  />
                  <Title className={styles.groupTitle} variant="h5">
                    Credit Retirement Location
                  </Title>
                  <Description className={styles.description}>
                    Please enter a location for the retirement of these credits. This prevents{' '}
                    <a href="#">double counting</a> of credits in different locations. These credits will
                    auto-retire.
                  </Description>
                  <Field className={styles.field} component={ControlledTextField} label="City" name="city" />
                </Form>
                <ContainedButton onClick={submitForm}>purchase</ContainedButton>
              </>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
};

export { BuyCreditsModal };
