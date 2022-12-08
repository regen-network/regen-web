import {
  Pagination as MuiPagination,
  PaginationProps,
  SxProps,
  useTheme,
} from '@mui/material';

import { Theme } from '../../theme/muiTheme';
import ArrowLeftIcon from '../icons/ArrowLeft';
import ArrowRightIcon from '../icons/ArrowRight';
import ArrowSkipLeftIcon from '../icons/ArrowSkipLeft';
import ArrowSkipRightIcon from '../icons/ArrowSkipRight';
import { getArrowSkipStyle, StyledPaginationItem } from './Pagination.styles';

export interface Props extends PaginationProps {
  sx?: SxProps<Theme>;
}

const Pagination = ({ sx = [], ...props }: Props): JSX.Element => {
  const theme = useTheme();
  return (
    <MuiPagination
      {...props}
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
      renderItem={item => (
        // Types does not have disableRipple props while it does exist
        // @ts-ignore
        <StyledPaginationItem
          slots={{
            first: () => (
              <ArrowSkipLeftIcon
                sx={getArrowSkipStyle({ disabled: item.disabled, theme })}
                disabled={item.disabled}
              />
            ),
            last: () => (
              <ArrowSkipRightIcon
                sx={getArrowSkipStyle({ disabled: item.disabled, theme })}
                disabled={item.disabled}
              />
            ),
            previous: ArrowLeftIcon,
            next: ArrowRightIcon,
          }}
          disableRipple
          {...item}
        />
      )}
      size="large"
      showFirstButton
      showLastButton
    />
  );
};

export { Pagination };
