import PartyAddress from './PartyAddress';

export default {
  title: 'Party',
  component: PartyAddress,
};

export const partyAddress = (): JSX.Element => (
  <PartyAddress
    onClick={() => {}}
    name="Regen Network Development, PBC"
    address="regen:1p6syuqk3e5a8hwp8e20jyjwr8p7nj270x4spqm"
  />
);
