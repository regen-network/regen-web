import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/';

import Section from 'web-components/lib/components/section';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    [theme.breakpoints.up('sm')]: {
      display: 'inline-block',
      border: '1px solid #ccc',
      background: 'transparent',
      width: '40rem',
    },
    height: '110.5rem',
    '& .formHeader': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  section: {
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(22.75),
      paddingBottom: theme.spacing(22.75),
      paddingRight: theme.spacing(89.75),
      paddingLeft: theme.spacing(89.75),
    },
    [theme.breakpoints.down('md')]: {
      paddingRight: theme.spacing(25),
      paddingLeft: theme.spacing(25),
    },
    [theme.breakpoints.down('xs')]: {
      height: '110rem',
      paddingRight: theme.spacing(0),
      paddingLeft: theme.spacing(0),
      marginLeft: '-1rem',
      width: 'calc(100% + 2rem)',
    },
  },
}));

const FormSection = (): JSX.Element => {
  const classes = useStyles();

  return (
    <Section className={classes.section}>
      <iframe
        title="form"
        className={classes.form}
        src="https://airtable.com/embed/shrY8kWzjn2kDKtl7?backgroundColor=yellow"
        frameBorder="0"
        width="100%"
      ></iframe>
    </Section>
  );
};

export default FormSection;
