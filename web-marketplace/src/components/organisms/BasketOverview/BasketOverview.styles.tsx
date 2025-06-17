import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import { makeStyles } from 'tss-react/mui';

import { Theme } from 'web-components/src/theme/muiTheme';

import topoImg from '../../../assets/background-contour-2.svg';

export const useBasketOverviewStyles = makeStyles()((theme: Theme) => ({
  content: {
    display: 'flex',
    width: '100%',
    padding: theme.spacing(0, 5),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(30, 5),
      maxWidth: theme.breakpoints.values.lg,
    },
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
    },
  },
  image: {
    width: '100%',
    maxWidth: theme.spacing(103),
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(76.4),
      minWidth: theme.spacing(103),
      overflow: 'hidden',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  },
  card: {
    margin: theme.spacing(8, 0, 0),
    padding: theme.spacing(3, 5, 7),
  },
}));

export const BasketSectionContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  borderBottom: `1px solid ${theme.palette.grey[100]}`,
  backgroundColor: theme.palette.grey[50],
  backgroundImage: `url(${topoImg.src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

export const BasketImageContainer = styled(Grid)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    height: theme.spacing(57.5),
    overflowY: 'clip',
  },
}));

export const BasketTextContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  [theme.breakpoints.down('lg')]: {
    paddingLeft: theme.spacing(8),
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: theme.spacing(8, 0),
    '&:last-child': {
      paddingBottom: theme.spacing(15),
    },
  },
}));
