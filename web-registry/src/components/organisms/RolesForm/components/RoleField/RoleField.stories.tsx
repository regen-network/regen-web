import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import {
  GetPartiesByNameOrAddrQuery,
  PartyWithAccountFieldsFragment,
} from '../../../../../generated/graphql';
import { ProfileModalSchemaType } from '../ProfileModal/ProfileModal.schema';
import { RoleField } from './RoleField';
import {
  accountId,
  allParties as initialAllParties,
  partiesByAccountId,
} from './RoleField.mock';

export default {
  title: 'Registry/Organisms/RolesForm/RoleField',
  component: RoleField,
} as ComponentMeta<typeof RoleField>;

const Template: ComponentStory<typeof RoleField> = args => {
  const [value, setValue] = useState<ProfileModalSchemaType | null>(null);
  const [debouncedValue, setDebouncedValue] = useState('');
  const [allParties, setAllParties] =
    useState<PartyWithAccountFieldsFragment[]>(initialAllParties);
  const [parties, setParties] = useState<
    GetPartiesByNameOrAddrQuery | null | undefined
  >();

  const saveProfile = async (profile: ProfileModalSchemaType) => {
    const newProfile = { id: 'new', accountId: 'new', ...profile };
    const { id, accountId, profileType, profileImage, name, address } =
      newProfile;
    const newParty = [
      {
        id,
        accountId,
        type: profileType,
        image: profileImage,
        name,
        walletByWalletId: address ? { addr: address } : undefined,
      },
    ];
    setAllParties([...newParty, ...allParties]);
    return newProfile.id;
  };

  useEffect(() => {
    const filteredParties = allParties.filter(
      p =>
        debouncedValue &&
        (p.name.toLowerCase().indexOf(debouncedValue.toLowerCase()) > -1 ||
          (p.walletByWalletId?.addr &&
            p.walletByWalletId?.addr
              .toLowerCase()
              .indexOf(debouncedValue.toLowerCase()) > -1)),
    );
    setParties({ getPartiesByNameOrAddr: { nodes: filteredParties } });
  }, [allParties, debouncedValue]);

  return (
    <Box p={10}>
      <RoleField
        {...args}
        accountId={accountId}
        setDebouncedValue={setDebouncedValue}
        value={value}
        setValue={setValue}
        parties={parties}
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
  partiesByAccountId,
};

Default.argTypes = {};
