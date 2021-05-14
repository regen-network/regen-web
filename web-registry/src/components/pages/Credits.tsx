import React from 'react';
import { useParams } from 'react-router-dom';
import { PurchasedCredits, purchasedCredits } from '../../mocks';
import { UserCredits } from '../organisms';

function Credits(): JSX.Element {
  let { userId } = useParams<{ userId: string }>();
  const userCredits: PurchasedCredits | undefined = purchasedCredits.find(p => p.userId === userId);
  if (userCredits) {
    return <UserCredits credits={userCredits} />;
  }
  return <div>User not found</div>;
}

export { Credits };
