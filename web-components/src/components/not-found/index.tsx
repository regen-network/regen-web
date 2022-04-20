import React from 'react';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';
import Box from '@mui/material/Box';

import ContainedButton from '../buttons/ContainedButton';
import { Body, ButtonText, Title } from '../typography';

interface NotFoundProps {
  img: JSX.Element;
  home?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
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

const NotFound = ({ img, home = '/' }: NotFoundProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Box sx={{ backgroundColor: 'primary.main' }}>
      <div className={classes.container}>
        <div className={classes.image}>{img}</div>
        <ButtonText
          color="secondary.dark"
          sx={{
            mb: [2, 8],
            textAlign: 'center',
            fontSize: [123, 192],
            lineHeight: ['100%'],
          }}
        >
          404
        </ButtonText>
        <Title
          variant="h1"
          sx={{ textAlign: 'center', color: 'primary.contrastText', mb: 4.25 }}
        >
          Oops! Page not found.
        </Title>
        <Body size="lg">
          The page you are looking for might have been temporarily removed or
          had its name changed.
        </Body>
        <ContainedButton
          size="large"
          style={{ whiteSpace: 'nowrap' }}
          href={home}
          sx={{ whiteSpace: 'nowrap', mt: 8 }}
        >
          Visit Our Homepage{' '}
          <Box display={{ xs: 'none', sm: 'inline' }}>{'\u00A0'}Instead</Box>
        </ContainedButton>
      </div>
    </Box>
  );
};

export default NotFound;
