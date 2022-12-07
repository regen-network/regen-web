import {
  Pagination as MuiPagination,
  PaginationProps,
  SxProps,
} from '@mui/material';

import { Theme } from '../../theme/muiTheme';

export interface Props extends PaginationProps {
  sx?: SxProps<Theme>;
}

const Pagination = ({ sx = [], ...props }: Props): JSX.Element => {
  return <MuiPagination sx={[...(Array.isArray(sx) ? sx : [sx])]} {...props} />;
};

export { Pagination };
