import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import ContainedButton from '../buttons/ContainedButton';
import { Body, Title } from '../typography';

export interface ErrorViewProps {
  img?: JSX.Element;
  home?: string;
  msg?: string;
}

const useStyles = makeStyles()((theme: Theme) => ({
  container: {
    textAlign: 'center',
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(15),
      paddingLeft: theme.spacing(30),
      paddingRight: theme.spacing(30),
      paddingBottom: theme.spacing(30),
    },
    [theme.breakpoints.up(theme.breakpoints.values['tablet'])]: {
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
      margin: '0 auto',
      left: `-${theme.spacing(1.5)}`,
    },
  },
}));

const ErrorView = ({ img, home = '/', msg }: ErrorViewProps): JSX.Element => {
  const { classes } = useStyles();

  return (
    <Box sx={{ backgroundColor: 'primary.main' }}>
      <div className={classes.container}>
        {img && <div className={classes.image}>{img}</div>}
        <Title
          variant="h1"
          sx={{ textAlign: 'center', color: 'primary.contrastText', mb: 4.25 }}
        >
          {'That’s an error.'}
        </Title>
        {msg && (
          <Body
            size="lg"
            color="error.main"
            sx={{ fontWeight: 'bold', mb: 4.25 }}
          >
            {msg}
          </Body>
        )}
        <Body size="md">
          {'For help resolving an issue, reach out to support@regen.network.'}
        </Body>
        <ContainedButton
          size="large"
          style={{ whiteSpace: 'nowrap' }}
          href={home}
          sx={{ whiteSpace: 'nowrap', mt: 12 }}
        >
          {'Visit Our Homepage'}{' '}
          <Box display={{ xs: 'none', sm: 'inline' }}></Box>
        </ContainedButton>
      </div>
    </Box>
  );
};

export default ErrorView;
