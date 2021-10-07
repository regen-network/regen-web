import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';

import Modal, { RegenModalProps } from 'web-components/lib/components/modal';
import FormLabel from 'web-components/lib/components/inputs/FormLabel';
import RegenTextField from 'web-components/lib/components/inputs/TextField';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';

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
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 900,
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
    marginBottom: 0,
    fontSize: theme.typography.pxToRem(16),
  },
  field: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(12),
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(10),
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
                <Field
                  className={styles.field}
                  component={RegenTextField}
                  label="test"
                  description="desc"
                  name="['http://regen.network/test']"
                />
              </Form>
              <ContainedButton onClick={submitForm}>submeezy</ContainedButton>
            </>
          );
        }}
      </Formik>
    </Modal>
  );
};

export { BuyCreditsModal };
