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
import {
  getArrowSkipStyle,
  StyledPaginationItem,
  usePaginationStyles,
} from './Pagination.styles';

export interface Props extends PaginationProps {
  sx?: SxProps<Theme>;
}

const Pagination = ({ size, sx = [], ...props }: Props): JSX.Element => {
  const theme = useTheme();
  const isSmall = size === 'small';
  const { classes } = usePaginationStyles();
  return (
    <MuiPagination
      {...props}
      className={classes.root}
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
      renderItem={item => (
        // Types do not have disableRipple props while it does exist
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
                sx={getArrowSkipStyle({
                  disabled: item.disabled,
                  theme,
                })}
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
      size={size}
      showFirstButton={!isSmall}
      showLastButton={!isSmall}
    />
  );
};

export { Pagination };
