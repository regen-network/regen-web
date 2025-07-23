'use client';
import type { CSSProperties } from 'react';
import { styled } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';

interface FlexProps extends BoxProps {
  col?: boolean;
  hFull?: boolean;
  wFull?: boolean;
  wrap?: boolean;
  align?: CSSProperties['alignItems'];
  basis?: CSSProperties['flexBasis'];
  grow?: CSSProperties['flexGrow'];
  justify?: CSSProperties['justifyContent'];
  shrink?: CSSProperties['flexShrink'];
}

const propFilter = (prop: PropertyKey): boolean =>
  prop !== 'align' &&
  prop !== 'basis' &&
  prop !== 'col' &&
  prop !== 'grow' &&
  prop !== 'hFull' &&
  prop !== 'justify' &&
  prop !== 'shrink' &&
  prop !== 'wFull' &&
  prop !== 'wrap';

const baseProps = ({
  align,
  basis,
  col,
  grow,
  hFull,
  justify,
  shrink,
  wFull,
  wrap,
}: FlexProps): CSSProperties => ({
  display: 'flex',
  ...(align && { alignItems: align }),
  ...(basis && { flexBasis: basis }),
  ...(col && { flexDirection: 'column' }),
  ...(grow && { flexGrow: grow }),
  ...(hFull && { height: '100%' }),
  ...(justify && { justifyContent: justify }),
  ...(shrink && { flexShrink: shrink }),
  ...(wFull && { width: '100%' }),
  ...(wrap && { flexWrap: 'wrap' }),
});

/** Wrapper for MUI `Box` with `display: flex` and some shorthand properties:
 *
 * Boolean:
 * - `col`: `flexDirection: 'column'`
 * - `hFull`: `height: '100%'`
 * - `wFull`: `width: '100%'`
 * - `wrap`: `flexWrap: 'wrap'`
 *
 * Shorthand:
 * - `align`: `alignItems`
 * - `basis`: `flexBasis`
 * - `grow`: `flexGrow`
 * - `justify`: `justifyContent`
 * - `shrink`: `flexShrink`
 *
 * @example
 * <Flex col>
 */
export const Flex = styled(Box, {
  shouldForwardProp: propFilter,
})<FlexProps>(props => ({
  ...baseProps(props),
}));

export const Center = styled(Box, {
  shouldForwardProp: propFilter,
})<FlexProps>(props => ({
  ...baseProps(props),
  justifyContent: 'center',
  alignItems: 'center',
}));

export { Box };
