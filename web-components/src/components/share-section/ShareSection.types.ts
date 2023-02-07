import { SvgIconProps } from '@mui/material';

export type SocialItem = {
  name: string;
  href: string;
  Icon: React.FC<SvgIconProps>;
};

export type SocialItems = SocialItem[];
