import React, { ComponentType, useState } from 'react';
import { useTheme } from '@mui/material';

export interface Props {
  color: string;
  className?: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function withHoverColor(BaseComponent: ComponentType<Props>) {
  return (props: {
    hoverColor?: string;
    color?: string;
    className?: string;
  }) => {
    const theme = useTheme();
    const initialColor = props.color || theme.palette.grey[50];
    const hoverColor =
      props.hoverColor || props.color || theme.palette.secondary.contrastText;
    const [color, setColor] = useState(initialColor);

    const handleMouseEnter = (): void => {
      setColor(hoverColor);
    };

    const handleMouseLeave = (): void => {
      setColor(initialColor);
    };

    return (
      <BaseComponent
        {...props}
        color={color}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    );
  };
}

export default withHoverColor;
