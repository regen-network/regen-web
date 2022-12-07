import {
  Pagination as MuiPagination,
  PaginationItem,
  PaginationProps,
  SxProps,
} from '@mui/material';

import { Theme } from '../../theme/muiTheme';

export interface Props extends PaginationProps {
  sx?: SxProps<Theme>;
}

const Pagination = ({ sx = [], ...props }: Props): JSX.Element => {
  return (
    <MuiPagination
      {...props}
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
      renderItem={item => <PaginationItem {...item} />}
      size="large"
      showFirstButton
      showLastButton
    />
  );
};

export { Pagination };
