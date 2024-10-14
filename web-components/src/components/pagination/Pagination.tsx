import {
  Pagination as MuiPagination,
  PaginationProps,
  SxProps,
  useTheme,
} from '@mui/material';

import { ColorScheme } from 'src/theme/theme.types';
import { cn } from 'src/utils/styles/cn';

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
  colorScheme: ColorScheme;
}

const Pagination = ({
  size,
  sx = [],
  colorScheme,
  ...props
}: Props): JSX.Element => {
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
                sx={getArrowSkipStyle({
                  disabled: item.disabled,
                  theme,
                  colorScheme,
                })}
                disabled={item.disabled}
                useGradient={colorScheme === 'regen'}
              />
            ),
            last: () => (
              <ArrowSkipRightIcon
                sx={getArrowSkipStyle({
                  disabled: item.disabled,
                  theme,
                  colorScheme,
                })}
                disabled={item.disabled}
                useGradient={colorScheme === 'regen'}
              />
            ),
            previous: props => (
              <ArrowLeftIcon
                {...props}
                className={cn(
                  props.className,
                  'text-sc-text-header',
                  item.disabled &&
                    'text-sc-button-surface-standard-primary-disabled',
                )}
              />
            ),
            next: props => (
              <ArrowRightIcon
                {...props}
                className={cn(
                  props.className,
                  'text-sc-text-header',
                  item.disabled &&
                    'text-sc-button-surface-standard-primary-disabled',
                )}
              />
            ),
          }}
          disableRipple
          colorScheme={colorScheme}
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
