import React, { useEffect } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';

const useStyles = makeStyles((theme: Theme) => ({}));

const PURCHASE_BY_STRIPE_ID = loader('../graphql/PurchaseByStripeId.graphql');

export default function Certificate(): JSX.Element {
  const classes = useStyles();
  const searchParams = new URLSearchParams(window.location.search);
  const stripeId = searchParams.get('stripeId');

  const { data } = useQuery(PURCHASE_BY_STRIPE_ID, {
    errorPolicy: 'ignore',
    variables: { stripeId },
  });

  return <></>;
}
