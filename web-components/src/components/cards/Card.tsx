import { Card as MuiCard, CardProps as MuiCardProps } from '@mui/material';

type CardProps = MuiCardProps & {
  width?: string;
  height?: string;
  borderColor?: string;
  borderRadius?: string;
};
export function Card({
  children,
  width,
  height,
  onClick,
  elevation = 0,
  borderColor,
  borderRadius,
  sx = [],
  ...props
}: CardProps): JSX.Element {
  return (
    <MuiCard
      onClick={onClick}
      sx={[
        {
          border: 1,
          borderColor: borderColor || 'info.light',
          borderRadius: borderRadius || '5px',
          maxWidth: width || '100%',
          height: height || 'inherit',
          cursor: onClick ? 'pointer' : 'inherit',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {children}
    </MuiCard>
  );
}

export default Card;
