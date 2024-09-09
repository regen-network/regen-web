import { SxProps } from '@mui/system';

import { Theme } from '../../../../theme/muiTheme';
import { Body } from '../../../typography';

type Props = {
  value?: string;
  remainingCharactersText: string;
  charsLeft: number;
  sx?: SxProps<Theme>;
};

export const TextAreaFieldChartCounter = ({
  value,
  remainingCharactersText,
  charsLeft,
  sx = {},
}: Props) => {
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
      {remainingCharactersText}
    </Body>
  );
};
