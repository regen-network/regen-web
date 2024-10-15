/* eslint-disable lingui/no-unlocalized-strings */
import InstagramIcon from 'web-components/src/components/icons/social/InstagramIcon';
import LinkedInIcon from 'web-components/src/components/icons/social/LinkedInIcon';
import TwitterIcon from 'web-components/src/components/icons/social/TwitterIcon';
import YoutubeIcon from 'web-components/src/components/icons/social/YoutubeIcon';

import { TerrasosSocialItem } from './Terrasos.types';

export const TerrasosFooterSocialItems: TerrasosSocialItem[] = [
  {
    name: 'Twitter',
    href: 'https://x.com/TerrasosCo',
    Icon: TwitterIcon,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/terrasos/',
    Icon: LinkedInIcon,
    className: 'p-[3px]',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/terrasos_co/',
    Icon: InstagramIcon,
    className: 'p-[3px]',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/channel/UCXMGrR3xfTDL2Z1CyMPURJg',
    Icon: YoutubeIcon,
  },
];
