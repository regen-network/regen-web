import { ProfileEdit } from './ProfileEdit';
import { Meta } from '@storybook/react';
// import { graphql } from 'msw';
import { AppMiddleware } from '../../middleware';

export default {
  title: 'Registry/Pages/profile/edit',
  component: ProfileEdit,
} as Meta<typeof ProfileEdit>;

export const Default = {
  msw: {
    handlers: [
      // graphql.query('ProfileEdit', (req, res, ctx) => {
      //
      // },
    ],
  },
  render: () => (
    <AppMiddleware>
      <ProfileEdit />
    </AppMiddleware>
  ),
};
