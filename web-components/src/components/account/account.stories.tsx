import AccountAddress from './AccountAddress';

export default {
  title: 'Account',
  component: AccountAddress,
};

export const accountAddress = (): JSX.Element => (
  <AccountAddress
    onClick={() => {}}
    name="Regen Network Development, PBC"
    address="regen:1p6syuqk3e5a8hwp8e20jyjwr8p7nj270x4spqm"
  />
);
