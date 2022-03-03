import React from 'react';
import { useParams } from 'react-router-dom';

import { BasketOverview, BasketEcocredits } from '../components/organisms';

const BasketDetails: React.FC = () => {
  const { basketDenom } = useParams<{ basketDenom: string }>();

  return (
    <>
      {basketDenom && <BasketOverview basketDenom={basketDenom} />}
      {basketDenom && <BasketEcocredits basketDenom={basketDenom} />}
    </>
  );
};

export { BasketDetails };
