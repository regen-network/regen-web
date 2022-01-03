import React from 'react';
import { makeStyles } from '@mui/styles';

import { Theme } from 'web-components/lib/theme/muiTheme';
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
    [theme.breakpoints.down('sm')]: {
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
