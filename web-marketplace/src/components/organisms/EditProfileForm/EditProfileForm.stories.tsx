import { Box } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { EditProfileForm } from './EditProfileForm';
import { EditProfileFormActionBar } from './EditProfileForm.ActionBar';

export default {
  title: 'Marketplace/Organisms/EditProfileForm',
  component: EditProfileForm,
} as ComponentMeta<typeof EditProfileForm>;

const Template: ComponentStory<typeof EditProfileForm> = args => (
  <Box sx={{ pb: 20 }}>
    <EditProfileForm {...args} onSubmit={async () => alert('submit')}>
      <EditProfileFormActionBar />
    </EditProfileForm>
  </Box>
);

export const Default = Template.bind({});

Default.args = {};
