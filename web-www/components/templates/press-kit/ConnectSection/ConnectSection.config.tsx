import EmailIcon from 'web-components/src/components/icons/EmailIcon';
import DiscordIcon from 'web-components/src/components/icons/social/DiscordIcon';
import GithubIcon from 'web-components/src/components/icons/social/GithubIcon';
import HyloIcon from 'web-components/src/components/icons/social/HyloIcon';
import LinkedInIcon from 'web-components/src/components/icons/social/LinkedInIcon';
import MediumIcon from 'web-components/src/components/icons/social/MediumIcon';
import TwitterIcon from 'web-components/src/components/icons/social/TwitterIcon';
import YoutubeIcon from 'web-components/src/components/icons/social/YoutubeIcon';
import { Theme } from 'web-components/src/theme/muiTheme';

import { IconLabelProps } from '@/components/organisms/ConnectSection/ConnectSection.types';

export const getPressKitConnectIcons = (theme: Theme): IconLabelProps[] => [
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
        className="!p-15 sm:!p-20"
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
    href: 'https://discord.gg/6ghMcMBjbz',
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
      <HyloIcon
        color={theme.palette.primary.main}
        hoverColor={theme.palette.secondary.main}
        className="!w-40 !h-40 sm:!w-50 sm:!h-50"
      />
    ),
    href: 'https://www.hylo.com/groups/regen-methodology-development',
    label: 'Hylo',
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
