import { SxProps } from '@mui/system';

import { Theme } from '../../../../theme/muiTheme';
import { Body } from '../../../typography';

type Props = {
  value?: string;
  charLimit?: number;
  sx?: SxProps<Theme>;
};

const DEFAULT_CHAR_LIMIT = 160;

export const TextAreaFieldChartCounter = ({
  value,
  charLimit = DEFAULT_CHAR_LIMIT,
  sx = {},
}: Props) => {
  const charsLeft = (charLimit || Infinity) - ((value && value.length) || 0);

  return (
    <Body
      size="sm"
      sx={{
        color: charsLeft < 0 ? 'error.main' : 'info.main',
        mt: 1,
        mb: { xs: 3, sm: 4 },
        ...sx,
      }}
    >
      {`${charsLeft} character${charsLeft === 1 ? '' : 's'} remaining`}
    </Body>
  );
};
