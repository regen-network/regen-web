import * as React from 'react';
import BuyFooter from 'web-components/lib/components/buy-footer';
import { User } from 'web-components/lib/components/user/UserInfo';

export default {
  title: 'Components|BuyFooter',
  component: BuyFooter,
};

const user: User = {
  name: 'Regen Network',
  place: 'Massachussets, United States',
  imgSrc: './regen.png',
};

function onClick(): void {}

export const buyFooter = (): JSX.Element => <BuyFooter onClick={onClick} user={user} />;
