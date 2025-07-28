import React, { useState } from 'react';
import type { Meta } from '@storybook/react';

import { Members } from './Members';
import { mockMembers } from './Members.mock';
import { Member } from './Members.types';

const meta: Meta<typeof Members> = {
  title: 'Dashboard/Members',
  component: Members,
  argTypes: {
    initialMembers: {
      control: 'object',
      description: 'Initial list of organization members',
      defaultValue: mockMembers,
    },
  },
};
export default meta;

export const Default = (args: { initialMembers?: Member[] }) => {
  const [members, setMembers] = useState<Member[]>(
    args.initialMembers ?? mockMembers,
  );

  return (
    <Members
      // @ts-ignore
      members={members}
      setMembers={setMembers}
    />
  );
};

Default.args = {
  initialMembers: mockMembers,
};
