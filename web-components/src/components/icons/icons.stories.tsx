import * as React from 'react';
import ArrowDownIcon from 'web-components/lib/components/icons/ArrowDownIcon';
import AvailableCreditsIcon from 'web-components/lib/components/icons/AvailableCreditsIcon';
import CloseIcon from 'web-components/lib/components/icons/CloseIcon';
import CreditsIcon from 'web-components/lib/components/icons/CreditsIcon';
import CurrentCreditsIcon from 'web-components/lib/components/icons/CurrentCreditsIcon';
import OrganizationIcon from 'web-components/lib/components/icons/OrganizationIcon';
import PinIcon from 'web-components/lib/components/icons/PinIcon';
import PointerIcon from 'web-components/lib/components/icons/PointerIcon';
import RegenIcon from 'web-components/lib/components/icons/RegenIcon';
import RegenLogoIcon from 'web-components/lib/components/icons/RegenLogoIcon';
import TotalCreditsIcon from 'web-components/lib/components/icons/TotalCreditsIcon';
import VerifiedIcon from 'web-components/lib/components/icons/VerifiedIcon';
import PlayIcon from 'web-components/lib/components/icons/PlayIcon';
import { withKnobs, text } from '@storybook/addon-knobs';

export default {
  title: 'Components|Icons',
  component: ArrowDownIcon,
  decorators: [withKnobs],
};

export const arrowIcon = (): JSX.Element => (
  <ArrowDownIcon color={text('color', '#000')} direction={text('direction', 'down')} />
);

export const availableCreditsIcon = (): JSX.Element => <AvailableCreditsIcon />;

export const closeIcon = (): JSX.Element => <CloseIcon />;

export const playIcon = (): JSX.Element => <PlayIcon />;

export const creditsIcon = (): JSX.Element => <CreditsIcon color={text('color', '#000')} />;

export const currentCreditsIcon = (): JSX.Element => <CurrentCreditsIcon color={text('color', '#4FB573')} />;

export const organizationIcon = (): JSX.Element => <OrganizationIcon />;

export const pinIcon = (): JSX.Element => <PinIcon fontSize={text('fontSize', 'small')} />;

export const pointerIcon = (): JSX.Element => <PointerIcon />;

export const regenIcon = (): JSX.Element => <RegenIcon />;

export const regenLogoIcon = (): JSX.Element => <RegenLogoIcon />;

export const totalCreditsIcon = (): JSX.Element => <TotalCreditsIcon />;

export const verifiedIcon = (): JSX.Element => <VerifiedIcon color={text('color', '#000')} />;
