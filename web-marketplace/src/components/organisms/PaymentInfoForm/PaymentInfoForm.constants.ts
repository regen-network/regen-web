import { Layout, StripeElementsOptions } from '@stripe/stripe-js';
import { fonts } from 'web-marketplace/src/lib/fonts/regen';

export const paymentElementOptions = {
  layout: 'tabs' as Layout,
};

export const defaultStripeOptions: StripeElementsOptions = {
  mode: 'payment',
  paymentMethodCreation: 'manual',
  fonts: [
    {
      cssSrc:
        'https://fonts.googleapis.com/css?family=Lato:100,300,400,700,800',
    },
  ],
  appearance: {
    theme: 'stripe',
    variables: {
      colorText: '#000',
      colorDanger: '#DE4526',
      fontFamily: fonts[0].style.fontFamily,
      spacingUnit: '5px',
      borderRadius: '2px',
    },
    rules: {
      '.Label': {
        fontWeight: 'bold',
        fontSize: '16px',
      },
      '.Input': {
        boxShadow: 'none',
        borderColor: '#D2D5D9',
        marginTop: '9px',
      },
    },
  },
};
