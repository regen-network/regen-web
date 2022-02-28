import React from 'react';
import { useParams } from 'react-router-dom';

import { PortfolioTemplate } from '../components/templates';

export const EcocreditsByAccount: React.FC = () => {
  const { accountAddress } = useParams<{ accountAddress: string }>();

  return <PortfolioTemplate accountAddress={accountAddress} />;
};
