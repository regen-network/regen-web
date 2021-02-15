import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import OnBoardingSection from 'web-components/lib/components/section/OnBoardingSection';

const useStyles = makeStyles((theme: Theme) => ({}));

export default function VerifyEmail(): JSX.Element {
  const classes = useStyles();

  return <OnBoardingSection title="Please confirm your email address"></OnBoardingSection>;
}
