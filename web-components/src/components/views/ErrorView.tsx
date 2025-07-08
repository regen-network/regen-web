import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import Image, { StaticImageData } from 'next/image';

import ContainedButton from '../buttons/ContainedButton';
import { Body, Title } from '../typography';
import { SadBeeIcon } from '../../components/icons/SadBeeIcon';

export interface ErrorViewProps {
  home?: string;
  msg?: string;
  title: string;
  bodyText: string;
  buttonText: string;
  isNetworkError?: boolean;
  imgSrc?: StaticImageData;
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
    width: '70%',
    margin: '0 auto',
    left: `-${theme.spacing(1.5)}`,
  },
}));

const ErrorView = ({
  home = '/',
  msg,
  title,
  bodyText,
  buttonText,
  isNetworkError,
  imgSrc,
}: ErrorViewProps): JSX.Element => {
  const { classes } = useStyles();

  return (
    <Box sx={{ backgroundColor: 'primary.main' }}>
      <div className={classes.container}>
        {isNetworkError && (
          <div className={classes.image}>
            <SadBeeIcon />
          </div>
        )}
        {!isNetworkError && imgSrc && (
          <div className={classes.image}>
            <Image
              alt="error"
              src={imgSrc}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
        )}
        <Title
          variant="h1"
          sx={{ textAlign: 'center', color: 'primary.contrastText', mb: 4.25 }}
        >
          {title}
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
        <Body size="md">{bodyText}</Body>
        <ContainedButton
          size="large"
          style={{ whiteSpace: 'nowrap' }}
          href={home}
          sx={{ whiteSpace: 'nowrap', mt: 12 }}
        >
          {buttonText}
        </ContainedButton>
      </div>
    </Box>
  );
};

export default ErrorView;
