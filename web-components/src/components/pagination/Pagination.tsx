import {
  Pagination as MuiPagination,
  PaginationProps,
  SxProps,
} from '@mui/material';

import { Theme } from '../../theme/muiTheme';
import ArrowLeftIcon from '../icons/ArrowLeft';
import ArrowRightIcon from '../icons/ArrowRight';
import ArrowSkipLeftIcon from '../icons/ArrowSkipLeft';
import ArrowSkipRightIcon from '../icons/ArrowSkipRight';
import { StyledPaginationItem } from './Pagination.styles';

export interface Props extends PaginationProps {
  sx?: SxProps<Theme>;
}

const Pagination = ({ sx = [], ...props }: Props): JSX.Element => {
  return (
    <MuiPagination
      {...props}
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
      renderItem={item => (
        <StyledPaginationItem
          slots={{
            first: ArrowSkipLeftIcon,
            last: ArrowSkipRightIcon,
            previous: ArrowLeftIcon,
            next: ArrowRightIcon,
          }}
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
