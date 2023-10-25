import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import {
  AccountFieldsFragment,
  GetAccountsByNameOrAddrQuery,
} from '../../../../../generated/graphql';
import { ProfileModalSchemaType } from '../ProfileModal/ProfileModal.schema';
import { RoleField } from './RoleField';
import {
  activeAccountId,
  allAccounts as initialAllAccounts,
  authenticatedAccountIds,
  authenticatedAccounts,
} from './RoleField.mock';

export default {
  title: 'Registry/Organisms/RolesForm/RoleField',
  component: RoleField,
} as ComponentMeta<typeof RoleField>;

const Template: ComponentStory<typeof RoleField> = args => {
  const [value, setValue] = useState<ProfileModalSchemaType | null>(null);
  const [debouncedValue, setDebouncedValue] = useState('');
  const [allAccounts, setAllAccounts] =
    useState<AccountFieldsFragment[]>(initialAllAccounts);
  const [accounts, setAccounts] = useState<
    GetAccountsByNameOrAddrQuery | null | undefined
  >();

  const saveProfile = async (profile: ProfileModalSchemaType) => {
    const newProfile = { id: 'new', accountId: 'new', ...profile };
    const { id, accountId, profileType, profileImage, name, address } =
      newProfile;
    const newAccount = [
      {
        id,
        accountId,
        type: profileType,
        image: profileImage,
        name,
        walletByWalletId: address ? { addr: address } : undefined,
      },
    ];
    setAllAccounts([...newAccount, ...allAccounts]);
    return { id: newProfile.id, creatorId: accountId ?? '' };
  };

  useEffect(() => {
    const filteredAccounts = allAccounts.filter(
      p =>
        debouncedValue &&
        (p.name.toLowerCase().indexOf(debouncedValue.toLowerCase()) > -1 ||
          (p.addr &&
            p.addr.toLowerCase().indexOf(debouncedValue.toLowerCase()) > -1)),
    );
    setAccounts({ getAccountsByNameOrAddr: { nodes: filteredAccounts } });
  }, [allAccounts, debouncedValue]);

  return (
    <Box p={10}>
      <RoleField
        {...args}
        setDebouncedValue={setDebouncedValue}
        value={value}
        setValue={setValue}
        accounts={accounts}
        saveProfile={saveProfile}
      />
    </Box>
  );
};

export const Default = Template.bind({});

Default.args = {
  label: 'Project Developer',
  description:
    'The individual or organization that is in charge of managing the project and will appear on the project page.',
  authenticatedAccounts,
  authenticatedAccountIds,
  activeAccountId,
};

Default.argTypes = {};
