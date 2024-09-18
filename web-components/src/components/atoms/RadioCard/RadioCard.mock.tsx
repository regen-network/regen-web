/* eslint-disable lingui/no-unlocalized-strings */
import OrganizationIcon from '../../../components/icons/OrganizationIcon';
import UserIcon from '../../../components/icons/UserIcon';
import { RadioCardItem } from './RadioCard.types';

export const radioCardItemsMock: RadioCardItem[] = [
  {
    id: 'individual',
    label: 'Individual',
    value: 'individual',
    icon: <UserIcon />,
  },
  {
    id: 'organization',
    label: 'Organization',
    value: 'organization',
    icon: <OrganizationIcon />,
  },
];
