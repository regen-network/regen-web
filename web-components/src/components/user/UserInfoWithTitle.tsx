import React from 'react';

import UserInfo, { User } from '../user/UserInfo';
import type { TextSize } from '../typography/sizing';
import { Label } from '../typography';

interface Props {
  user: User;
  title: string;
  border?: boolean;
  size?: TextSize;
  icon?: any;
}

export default function UserInfoWithTitle({
  user,
  title,
  border = true,
  size = 'lg',
  icon,
}: Props): JSX.Element {
  return (
    <div>
      <Label size="xs" color="info.main" sx={{ mb: [4, 5.2] }}>
        {title}
      </Label>
      <UserInfo user={user} size={size} border={border} icon={icon} />
    </div>
  );
}
