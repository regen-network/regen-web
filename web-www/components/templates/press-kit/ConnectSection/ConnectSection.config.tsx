import EmailIcon from 'web-components/lib/components/icons/EmailIcon';
import DiscordIcon from 'web-components/lib/components/icons/social/DiscordIcon';
import FacebookIcon from 'web-components/lib/components/icons/social/FacebookIcon';
import GithubIcon from 'web-components/lib/components/icons/social/GithubIcon';
import LinkedInIcon from 'web-components/lib/components/icons/social/LinkedInIcon';
import MediumIcon from 'web-components/lib/components/icons/social/MediumIcon';
import TelegramIcon from 'web-components/lib/components/icons/social/TelegramIcon';
import TwitterIcon from 'web-components/lib/components/icons/social/TwitterIcon';
import YoutubeIcon from 'web-components/lib/components/icons/social/YoutubeIcon';

import { Theme } from '@/../web-components/lib/theme/muiTheme';
import { IconLabelProps } from '@/components/organisms/ConnectSection/ConnectSection.types';

export const getPressKitConnectIcons = (theme: Theme): IconLabelProps[] => [
  {
    icon: (
      <TelegramIcon
        color={theme.palette.primary.main}
        hoverColor={theme.palette.secondary.main}
      />
    ),
    href: 'https://t.me/regennetwork_public',
    label: 'Telegram for General Updates',
  },
  {
    icon: (
      <TelegramIcon
        color={theme.palette.primary.main}
        hoverColor={theme.palette.secondary.main}
      />
    ),
    href: 'https://t.me/regennetworkdevannounce',
    label: 'Telegram for Developers',
  },
  {
    icon: (
      <MediumIcon
        color={theme.palette.primary.main}
        hoverColor={theme.palette.secondary.main}
      />
    ),
    href: 'https://medium.com/regen-network',
    label: 'Medium',
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
  {
    icon: (
      <DiscordIcon
        color={theme.palette.primary.main}
        hoverColor={theme.palette.secondary.main}
      />
    ),
    href: 'https://discord.gg/BDcBJu3',
    label: 'Discord community',
    smallSvg: true,
  },
  {
    icon: (
      <YoutubeIcon
        color={theme.palette.primary.main}
        hoverColor={theme.palette.secondary.main}
      />
    ),
    href: 'https://www.youtube.com/channel/UCICD2WukTY0MbQdQ9Quew3g',
    label: 'Youtube',
    smallSvg: true,
  },
  {
    icon: (
      <LinkedInIcon
        color={theme.palette.primary.main}
        hoverColor={theme.palette.secondary.main}
      />
    ),
    href: 'https://www.linkedin.com/company/regen-network',
    label: 'LinkedIn',
  },
  {
    icon: (
      <FacebookIcon
        color={theme.palette.primary.main}
        hoverColor={theme.palette.secondary.main}
      />
    ),
    href: 'https://facebook.com/weareregennetwork',
    label: 'Facebook',
  },
  {
    icon: (
      <GithubIcon
        color={theme.palette.primary.main}
        hoverColor={theme.palette.secondary.main}
      />
    ),
    href: 'https://github.com/regen-network/',
    label: 'Github',
  },
  {
    icon: (
      <EmailIcon
        color={theme.palette.primary.main}
        hoverColor={theme.palette.secondary.main}
      />
    ),
    href: 'http://newsletter.regen.network/',
    label: 'Sign up for our newsletter',
    smallSvg: true,
  },
];
