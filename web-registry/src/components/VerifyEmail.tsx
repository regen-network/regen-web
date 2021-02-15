import React, { useCallback } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import axios from 'axios';

import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import Description from 'web-components/lib/components/description';
import getApiUri from '../lib/apiUri';

const useStyles = makeStyles((theme: Theme) => ({
  description: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
  },
  resend: {
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      padding: `0 ${theme.spacing(10)}`,
      fontSize: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(33)} ${theme.spacing(2.5)} 0`,
      fontSize: theme.spacing(4.5),
    },
  },
}));

export default function VerifyEmail(): JSX.Element {
  const classes = useStyles();
  const search = new URLSearchParams(window.location.search);
  const email = search.get('email');

  const resendEmail = useCallback(() => {
    axios
      .post(`${getApiUri()}/auth/verification-email`, {
        email,
      })
      .then(resp => {
        console.log(resp);
      })
      .catch(err => {
        console.log(err);
      });
  }, [email]);

  return (
    <OnBoardingSection title="Please confirm your email address">
      <OnBoardingCard>
        <Description className={classes.description}>
          We've just sent a confirmation email to: <a href={`mailto:${email}`}>{email}</a>.
        </Description>
        <br />
        <Description className={classes.description}>
          Click on the confirmation link to return to Regen Network.
        </Description>
      </OnBoardingCard>
      <Description className={classes.resend}>
        Don’t see anything? <Link onClick={resendEmail}>Resend email</Link>.
      </Description>
    </OnBoardingSection>
  );
}
