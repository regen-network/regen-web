import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/';

import Section from 'web-components/lib/components/section';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      width: theme.spacing(150),
    },
    [theme.breakpoints.up(theme.breakpoints.values.tablet)]: {
      width: theme.spacing(160),
    },
    [theme.breakpoints.up('sm')]: {
      border: '1px solid #ccc',
      background: 'transparent',
      height: theme.spacing(444.4),
    },
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(475),
      marginLeft: '-1rem',
      width: 'calc(100% + 2rem)',
    },
    [theme.breakpoints.down(300)]: {
      height: theme.spacing(504),
    },
  },
  section: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(22.25),
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingRight: 0,
      paddingLeft: 0,
    },
  },
}));

const FormSection = (): JSX.Element => {
  const styles = useStyles();

  return (
    <Section className={styles.section}>
      <iframe
        title="form"
        className={styles.form}
        src="https://airtable.com/embed/shrY8kWzjn2kDKtl7?backgroundColor=yellow"
        frameBorder="0"
        width="100%"
      ></iframe>
    </Section>
  );
};

export default FormSection;
