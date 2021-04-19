import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import clsx from 'clsx';

import Section from './index';

interface OnBoardingSectionProps {
  title: string;
  formContainer?: boolean; // set max width and center
  linkText?: string;
  onLinkClick?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(12.5, 0, 30),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(8.75, 2, 20),
    },
  },
  formWrap: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(140),
      margin: '0 auto',
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      maxWidth: theme.spacing(140),
    },
  },
  link: {
    color: theme.palette.secondary.main,
    fontFamily: theme.typography.fontFamily,
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
    },
  },
}));

const OnBoardingSection: React.FC<OnBoardingSectionProps> = ({
  formContainer = false,
  linkText,
  onLinkClick,
  ...p
}) => {
  const classes = useStyles();

  return (
    <Section
      className={classes.root}
      title={p.title}
      titleAlign={onLinkClick ? 'left' : 'center'}
      titleVariant="h3"
      titleClassName={classes.title}
      topRight={
        onLinkClick && (
          <Link className={classes.link} onClick={onLinkClick}>
            {linkText}
          </Link>
        )
      }
    >
      <div className={clsx(formContainer && classes.formWrap)}>{p.children}</div>
    </Section>
  );
};

export default OnBoardingSection;
