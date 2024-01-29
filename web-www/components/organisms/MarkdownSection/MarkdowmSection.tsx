import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import clsx from 'clsx';
import { makeStyles } from 'tss-react/mui';

import { Title } from 'web-components/src/components/typography';
import { Theme } from 'web-components/src/theme/muiTheme';

interface SectionProps {
  title?: string;
  children: ReactNode;
}

const useStyles = makeStyles()((theme: Theme) => ({
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

export const MarkdownSection = ({
  title,
  children,
}: SectionProps): JSX.Element => {
  const { classes } = useStyles();
  return (
    <Box
      sx={{ m: '0 auto', maxWidth: 1400, px: [2.8, 38], pb: [18.25, 21.25] }}
    >
      <Title variant="h1" mobileVariant="h2" sx={{ pt: [18.25, 21.25] }}>
        {title}
      </Title>
      <div className={clsx(classes.text)}>{children}</div>
    </Box>
  );
};
