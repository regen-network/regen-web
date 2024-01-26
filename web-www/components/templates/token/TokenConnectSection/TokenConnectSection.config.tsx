import DiscordIcon from 'web-components/src/components/icons/social/DiscordIcon';
import TelegramIcon from 'web-components/src/components/icons/social/TelegramIcon';
import TwitterIcon from 'web-components/src/components/icons/social/TwitterIcon';

import { Theme } from 'web-components/src/theme/muiTheme';
import { IconLabelProps } from '@/components/organisms/ConnectSection/ConnectSection.types';

type Params = {
  theme: Theme;
};

export const getIcons = ({ theme }: Params): IconLabelProps[] => [
  {
    icon: (
      <TelegramIcon
        color={theme.palette.primary.main}
        hoverColor={theme.palette.secondary.main}
      />
    ),
    href: 'https://t.me/regennetworkdevannounce',
    label: 'Telegram',
  },
  {
    icon: (
      <DiscordIcon
        color={theme.palette.primary.main}
        hoverColor={theme.palette.secondary.main}
      />
    ),
    href: 'https://discord.gg/TbRfsNQGWH',
    label: 'Discord community',
    smallSvg: true,
  },
  {
    icon: (
      <TwitterIcon
        color={theme.palette.primary.main}
        hoverColor={theme.palette.secondary.main}
      />
    ),
    href: 'https://twitter.com/regen_network',
    label: 'Twitter',
  },
];
