import React from 'react';
import { makeStyles, useTheme, DefaultTheme as Theme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

import Typography from '@mui/material/Typography';
import CurrentCreditsIcon from '../icons/CurrentCreditsIcon';
import ContainedButton from '../buttons/ContainedButton';

export interface CreditPrice {
  unitPrice: number;
  currency: string;
}

interface BuyFooterProps {
  creditPrice?: CreditPrice;
  href?: string;
  onClick?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  background: {
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(30),
    },
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(19),
    },
    boxShadow: theme.shadows[7],
  },
  root: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(37.5),
      paddingLeft: theme.spacing(37.5),
    },
    [theme.breakpoints.down('md')]: {
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
    },
    [theme.breakpoints.down('sm')]: {
      height: theme.spacing(19),
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(4),
    },
    [theme.breakpoints.up('xl')]: {
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
    },
    maxWidth: theme.breakpoints.values.lg,
    margin: '0 auto',
    '& a': {
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
  creditsText: {
    color: theme.palette.info.dark,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.125rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
    },
  },
  number: {
    fontFamily: theme.typography.h1.fontFamily,
    fontWeight: 800,
    [theme.breakpoints.up('sm')]: {
      fontSize: '1.3125rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.125rem',
    },
  },
  creditPrice: {
    [theme.breakpoints.up('sm')]: {
      paddingRight: theme.spacing(5),
    },
  },
  buyText: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(1.5),
      lineHeight: theme.spacing(6),
    },
  },
}));

export default function BuyFooter({
  creditPrice,
  href,
  onClick,
}: BuyFooterProps): JSX.Element {
  const classes = useStyles({});
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div className={classes.background}>
      <Grid
        container
        wrap="nowrap"
        alignItems="center"
        justifyContent={matches ? 'flex-end' : 'space-between'}
        className={classes.root}
      >
        {creditPrice && (
          <Grid item className={classes.creditPrice}>
            <Typography>
              <span className={classes.number}>
                $
                {new Intl.NumberFormat('en-US', {
                  minimumFractionDigits: 2,
                }).format(creditPrice.unitPrice)}
              </span>
              <span className={classes.creditsText}>
                /credit {creditPrice.currency}
              </span>
            </Typography>
          </Grid>
        )}
        <Grid item>
          <ContainedButton onClick={onClick}>
            <CurrentCreditsIcon
              height={matches ? '1.625rem' : '1.375rem'}
              width={matches ? '1.75rem' : '1.5rem'}
              color={theme.palette.primary.main}
            />
            <span className={classes.buyText}>buy credits</span>
          </ContainedButton>
        </Grid>
      </Grid>
    </div>
  );
}
