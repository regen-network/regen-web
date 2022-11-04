import React from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Title } from '@regen-network/web-components/lib/components/typography';
import type { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import clsx from 'clsx';

interface SectionProps {
  mdContent: string;
  title?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
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

const MarkdownSection = ({ mdContent, title }: SectionProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Box sx={{ m: '0 auto', maxWidth: 1400, px: [2.8, 38] }}>
      <Title variant="h1" mobileVariant="h2" sx={{ pt: [18.25, 21.25] }}>
        {title}
      </Title>
      <div
        className={clsx(classes.text)}
        dangerouslySetInnerHTML={{ __html: mdContent }}
      />
    </Box>
  );
};

export default MarkdownSection;
