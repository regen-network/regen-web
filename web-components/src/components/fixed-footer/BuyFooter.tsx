import React from 'react';
import { makeStyles, useTheme, DefaultTheme as Theme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

import Typography from '@mui/material/Typography';
import CurrentCreditsIcon from '../icons/CurrentCreditsIcon';
import ContainedButton from '../buttons/ContainedButton';
import FixedFooter from './';

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
    // [theme.breakpoints.down('xs')]: {
    //   fontSize: '1.125rem',
    // },
  },
  buyText: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(1.5),
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
    <FixedFooter>
      {creditPrice && (
        <Grid item className={classes.creditPrice}>
          <Typography>
            <span className={classes.number}>${creditPrice.unitPrice}</span>
            <span className={classes.creditsText}>
              /credit {creditPrice.currency}
            </span>
          </Typography>
        </Grid>
      )}
      <Grid item>
        {/*<a href={href} target="_blank" rel="noopener noreferrer">*/}
        <ContainedButton onClick={onClick}>
          <CurrentCreditsIcon
            height={matches ? '1.625rem' : '1.375rem'}
            width={matches ? '1.75rem' : '1.5rem'}
            color={theme.palette.primary.main}
          />
          <span className={classes.buyText}>buy credits</span>
        </ContainedButton>
        {/*</a>*/}
      </Grid>
    </FixedFooter>
  );
}
