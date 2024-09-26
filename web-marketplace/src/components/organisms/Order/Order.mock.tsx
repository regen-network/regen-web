/* eslint-disable lingui/no-unlocalized-strings */
import { BlockchainIcon } from 'web-components/src/components/icons/BlockchainIcon';
import CertifiedDocumentIcon from 'web-components/src/components/icons/CertifiedDocumentIcon';
import CreditsIcon from 'web-components/src/components/icons/CreditsIcon';
import { PaymentInfoIcon } from 'web-components/src/components/icons/PaymentInfoIcon';

import { OrderSummarySectionProps } from './Order.types';

export const retirementInfo: OrderSummarySectionProps = {
  icon: <CertifiedDocumentIcon sx={{ color: 'info.dark' }} />,
  title: 'Retirement Info',
  data: {
    tradableCredits: null,
    reason:
      'For the betterment of my children lorem ipsum. For the betterment children lorem ipsum. For the betterment of my children lorem ipsum.',
    location: 'location',
    makeAnonymous: false,
  },
};

export const blockchainDetails: OrderSummarySectionProps = {
  icon: <BlockchainIcon />,
  title: 'Blockchain Details',
  data: {
    purchaseDate: 'Dec 15, 2024',
    blockchainRecord: 'd6jfk121o54ded6jfk121o54de',
  },
};

export const credits: OrderSummarySectionProps = {
  icon: <CreditsIcon fontSize="medium" className="text-grey-500" />,
  title: 'Credits',
  data: {
    credits: '2',
    price: '40',
    denom: 'usd',
  },
};

export const paymentInfo: OrderSummarySectionProps = {
  icon: <PaymentInfoIcon className="text-grey-500" />,
  title: 'payment info',
  data: {
    denom: 'usd',
    nameOnCard: 'Steph Green',
    cardLast4: '1234',
  },
};
