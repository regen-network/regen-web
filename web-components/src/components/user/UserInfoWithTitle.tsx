import { TooltipProps } from '@mui/material';

import QuestionMarkTooltip from '../tooltip/QuestionMarkTooltip';
import { Label } from '../typography';
import type { TextSize } from '../typography/sizing';
import UserInfo, { User } from '../user/UserInfo';

interface Props {
  user: User;
  title: string;
  border?: boolean;
  size?: TextSize;
  tooltip?: TooltipProps['title'];
}

export default function UserInfoWithTitle({
  user,
  title,
  border = true,
  size = 'lg',
  tooltip,
}: Props): JSX.Element {
  return (
    <div>
      <Label
        component="div"
        display="flex"
        size="xs"
        color="info.main"
        sx={{ mb: [4, 5.2] }}
      >
        {title}
        {tooltip && <QuestionMarkTooltip sx={{ ml: 1.25 }} title={tooltip} />}
      </Label>
      <UserInfo
        user={user}
        size={size}
        border={border}
        titleComponent="subtitle"
      />
    </div>
  );
}
