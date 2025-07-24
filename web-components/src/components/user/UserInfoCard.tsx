import { Box, SxProps } from '@mui/material';

import { Theme } from '../../theme/muiTheme';
import { sxToArray } from '../../utils/mui/sxToArray';
import { BlockContent } from '../block-content';
import { Subtitle } from '../typography';
import { TextSize } from '../typography/sizing';
import UserAvatar from './UserAvatar';
import { User } from './UserInfo';

export interface Account
  extends Pick<
    User,
    'name' | 'nameRaw' | 'type' | 'location' | 'image' | 'description' | 'link'
  > {
  address: string;
}

interface UserInfoCardProps {
  user: User;
  size?: TextSize;
  border?: boolean;
  sx?: SxProps<Theme>;
}
export default function UserInfoCard({
  user,
  size = 'lg',
  border = true,
  sx = [],
}: UserInfoCardProps): JSX.Element {
  const { name: userName, nameRaw } = user;
  const name = nameRaw ? <BlockContent content={nameRaw} /> : userName;

  return (
    <Box sx={[{ display: 'flex', alignItems: 'center' }, ...sxToArray(sx)]}>
      <UserAvatar
        alt={userName}
        src={user.image}
        href={user.link}
        size={size}
        border={border}
        sx={{ mr: 2 }}
      />
      <Subtitle size="xs" sx={{ color: 'primary.main' }}>
        {name}
      </Subtitle>
    </Box>
  );
}
