import * as React from 'react';

import PartyAddress from 'web-components/lib/components/party/PartyAddress';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Components|Party',
  component: PartyAddress,
  decorators: [withKnobs],
};

export const partyAddress = (): JSX.Element => (
  <PartyAddress
    onClick={() => {}}
    name="Regen Network Development, Inc."
    address="regen:1p6syuqk3e5a8hwp8e20jyjwr8p7nj270x4spqm"
  />
);
