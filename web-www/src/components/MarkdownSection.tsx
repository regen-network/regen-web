import React from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { Variant } from '@mui/material/styles/createTypography';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Title from 'web-components/lib/components/title';

interface SectionProps {
  children?: any;
  mdContent: string;
  className?: string;
  title?: string;
  titleVariant?: Variant;
  titleLineHeight?: string;
}

interface StyleProps {
  titleLineHeight?: string;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  sectionPadding: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(37.5),
      paddingRight: theme.spacing(38.25),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2.8),
      paddingRight: theme.spacing(2.8),
    },
  },
  title: props => ({
    lineHeight: props.titleLineHeight || '130%',
    maxWidth: theme.spacing(350),
    margin: '0px auto',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(21.25),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(9.5),
      paddingTop: theme.spacing(18.25),
    },
  }),
  text: {
    fontSize: theme.spacing(4.5),
    [theme.breakpoints.down('md')]: {
      fontSize: theme.spacing(4),
    },
    lineHeight: '150%',
    maxWidth: theme.spacing(350),
    margin: '0px auto',
    color: theme.palette.info.dark,
    '& p:first-of-type': {
      marginBottom: theme.spacing(11.25),
    },
    '& ol, ul': {
      marginLeft: theme.spacing(10),
    },
    '& a, a:visited': {
      textDecoration: 'none',
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
    },
    '& h2': {
      color: theme.palette.primary.contrastText,
      marginTop: theme.spacing(15),
      marginBottom: theme.spacing(10.5),
      fontFamily: theme.typography.h1.fontFamily,
      fontWeight: 900,
      lineHeight: '150%',
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.spacing(5.25),
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(4),
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(6),
      },
    },
    '& h4': {
      marginBottom: theme.spacing(7.25),
      marginTop: theme.spacing(10.5),
      color: theme.palette.primary.contrastText,
      fontSize: theme.spacing(4.5),
      textTransform: 'uppercase',
      letterSpacing: theme.spacing(0.2),
      [theme.breakpoints.down('sm')]: {
        fontSize: theme.spacing(4),
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
      },
    },
  },
}));

const MarkdownSection = ({
  children,
  mdContent,
  className,
  titleLineHeight,
  titleVariant = 'h2',
  title,
}: SectionProps) => {
  const classes = useStyles({ titleLineHeight });
  return (
    <>
      <Title className={clsx(classes.title, classes.sectionPadding)} variant="h1">
        {title}
      </Title>
      <div
        className={clsx(classes.sectionPadding, classes.text)}
        dangerouslySetInnerHTML={{ __html: mdContent }}
      />
    </>
  );
};

export default MarkdownSection;
