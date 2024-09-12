import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import ContainedButton from '../buttons/ContainedButton';
import { Body, Label, Title } from '../typography';

export interface NotFoundProps {
  img?: JSX.Element;
  home?: string;
  title: string;
  bodyText: string;
  buttonChildren: ReactNode;
}

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    textAlign: 'center',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(30),
      paddingRight: theme.spacing(30),
      paddingBottom: theme.spacing(30),
    },
    [theme.breakpoints.up(theme.breakpoints.values['tablet'])]: {
      paddingTop: theme.spacing(17),
      paddingLeft: 'unset',
      paddingRight: 'unset',
      width: theme.spacing(132.75),
      margin: '0 auto',
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(11),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
      paddingBottom: theme.spacing(7),
    },
  },
  image: {
    '& img': {
      width: '70%',
      [theme.breakpoints.up('sm')]: {
        marginBottom: theme.spacing(6.25),
      },
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(2),
      },
      margin: '0 auto',
      left: `-${theme.spacing(1.5)}`,
    },
  },
}));

const NotFound = ({
  img,
  home = '/',
  title,
  bodyText,
  buttonChildren,
}: NotFoundProps): JSX.Element => {
  const { classes } = useStyles();

  return (
    <Box sx={{ backgroundColor: 'primary.main' }}>
      <div className={classes.container}>
        <div className={classes.image}>{img}</div>
        <Label
          color="secondary.dark"
          sx={{
            mb: [2, 8],
            textAlign: 'center',
            fontSize: [123, 192],
            lineHeight: ['100%'],
          }}
        >
          404
        </Label>
        <Title
          variant="h1"
          sx={{ textAlign: 'center', color: 'primary.contrastText', mb: 4.25 }}
        >
          {title}
        </Title>
        <Body size="lg">{bodyText}</Body>
        <ContainedButton
          size="large"
          style={{ whiteSpace: 'nowrap' }}
          href={home}
          sx={{ whiteSpace: 'nowrap', mt: 8 }}
        >
          {buttonChildren}
        </ContainedButton>
      </div>
    </Box>
  );
};

export default NotFound;
