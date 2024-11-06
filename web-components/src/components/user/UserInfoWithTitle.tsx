import { Box, Link, SxProps, TooltipProps } from '@mui/material';

import { headerFontFamily, Theme } from '../../theme/muiTheme';
import { LinkComponentProp } from '../modal/ConfirmModal';
import QuestionMarkTooltip from '../tooltip/QuestionMarkTooltip';
import { Label } from '../typography';
import type { TextSize } from '../typography/sizing';
import UserInfo, { User } from '../user/UserInfo';

interface Props {
  user?: User;
  title: string;
  border?: boolean;
  size?: TextSize;
  tooltip?: TooltipProps['title'];
  fontFamily?: string;
  sx?: SxProps<Theme>;
  linkComponent?: LinkComponentProp;
}

export default function UserInfoWithTitle({
  user,
  title,
  border = true,
  fontFamily = headerFontFamily,
  size = 'lg',
  tooltip,
  sx = [],
  linkComponent = Link,
}: Props): JSX.Element {
  return (
    <Box sx={sx}>
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
      {user && (
        <UserInfo
          user={user}
          size={size}
          fontFamily={fontFamily}
          border={border}
          titleComponent="subtitle"
          linkComponent={linkComponent}
        />
      )}
    </Box>
  );
}
