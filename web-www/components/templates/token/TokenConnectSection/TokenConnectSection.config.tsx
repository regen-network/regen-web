import DiscordIcon from 'web-components/src/components/icons/social/DiscordIcon';
import TwitterIcon from 'web-components/src/components/icons/social/TwitterIcon';
import { Theme } from 'web-components/src/theme/muiTheme';

import { IconLabelProps } from '@/components/organisms/ConnectSection/ConnectSection.types';

type Params = {
  theme: Theme;
};

export const getIcons = ({ theme }: Params): IconLabelProps[] => [
  {
    icon: (
      <DiscordIcon
        color={theme.palette.primary.main}
        hoverColor={theme.palette.secondary.main}
      />
    ),
    href: 'https://discord.gg/6ghMcMBjbz',
    label: 'Discord community',
    smallSvg: true,
  },
  {
    icon: (
      <TwitterIcon
        color={theme.palette.primary.main}
        hoverColor={theme.palette.secondary.main}
        className="!p-15 sm:!p-25"
      />
    ),
    href: 'https://twitter.com/regen_network',
    label: 'Twitter',
  },
];
