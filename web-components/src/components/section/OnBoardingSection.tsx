import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import cx from 'clsx';

import Section from './index';
import Description from '../description';

interface OnBoardingSectionProps {
  title: string;
  formContainer?: boolean; // set max width and center
  linkText?: string;
  exampleProjectUrl?: string;
  onLinkClick?: () => void;
  classes?: {
    root?: string;
    title?: string;
    titleWrap?: string;
    formWrap?: string;
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(12.5, 0, 30),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(8.75, 2.5, 20),
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
      flex: 'unset',
    },
    [theme.breakpoints.down('xs')]: {
      margin: 'inherit',
      flex: 1,
    },
  },
  titleWrap: {
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      maxWidth: theme.spacing(140),
    },
    [theme.breakpoints.down('xs')]: {
      margin: 'inherit',
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
      marginLeft: theme.spacing(4),
    },
  },
  description: {
    fontSize: theme.typography.pxToRem(16),
    padding: theme.spacing(2, 0, 1),
  },
  topRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
}));

const OnBoardingSection: React.FC<OnBoardingSectionProps> = ({
  formContainer = false,
  linkText,
  onLinkClick,
  exampleProjectUrl = '/projects/wilmot',
  classes,
  ...p
}) => {
  const styles = useStyles();
  const { root, title, titleWrap } = styles;

  return (
    <Section
      classes={{
        root: cx(root, !!classes && classes.root),
        title: cx(title, !!classes && classes.title),
        titleWrap: cx(titleWrap, !!classes && classes.titleWrap),
      }}
      title={p.title}
      titleAlign={onLinkClick ? 'left' : 'center'}
      titleVariant="h3"
      topRight={
        onLinkClick && (
          <Link className={styles.link} onClick={onLinkClick}>
            {linkText}
          </Link>
        )
      }
    >
      <div className={cx(formContainer && styles.formWrap, !!classes && classes.formWrap)}>
        <Description className={styles.description}>
          See an example{' '}
          <RouterLink to={exampleProjectUrl} target="_blank">
            project page»
          </RouterLink>
        </Description>
        {p.children}
      </div>
    </Section>
  );
};

export default OnBoardingSection;
