import React, { ComponentType, useState } from 'react';
import { useTheme } from '@material-ui/core';

export interface Props {
  color: string;
  className?: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function withHoverColor(BaseComponent: ComponentType<Props>) {
  return (props: { className?: string }) => {
    const theme = useTheme();
    const initialColor = theme.palette.grey[50];
    const hoverColor = theme.palette.secondary.contrastText;
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
