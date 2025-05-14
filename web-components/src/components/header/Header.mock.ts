/* eslint-disable lingui/no-unlocalized-strings */
import { truncate } from '../../utils/truncate';
import { Item } from './components/HeaderMenuItem/HeaderMenuItem';

export const headerMenuItemsMock: Item[] = [
  {
    title: 'Projects',
    href: '/projects',
  },
  {
    title: 'Trade',
    href: '/storefront',
  },
  {
    title: 'Activity',
    href: '/stats/activity',
  },
];
export const REGEN_TEST_ADDRESS =
  'regen1df675r9vnf7pdedn4sf26svdsem3ugavgxmy46';

export const profile = {
  id: '123',
  profileImage: '/profile/default-avatar.jpg',
  name: 'John Doe',
  address: REGEN_TEST_ADDRESS,
  truncatedAddress: truncate(REGEN_TEST_ADDRESS),
  profileLink: '/accounts/regen1df675r9vnf7pdedn4sf26svdsem3ugavgxmy46',
  dashboardLink: '/dashboard',
};

export const organizationProfile = {
  id: '456',
  profileImage:
    'https://cdn.sanity.io/images/jm12rn9t/staging/8b062589b6d8c6850a78bb13ead51d2f6f32b073-29x9.svg',
  name: 'John Doe Organization',
  address: 'regen18xc64ltgtu7uthkpj4fug2dnm8z5m0narvy0ww',
  truncatedAddress: truncate('regen18xc64ltgtu7uthkpj4fug2dnm8z5m0narvy0ww'),
  profileLink: '/accounts/regen2df675r9vnf7pdedn4sf26svdsem3ugavgxmy55',
  dashboardLink: '/dashboard',
};
