import React from 'react';
import { Box } from '@mui/material';

import ControlledFormLabel from '../form/ControlledFormLabel';
import { Body } from '../typography';

interface Props {
  className?: string;
  description?: string;
  disabled?: boolean;
  optional?: boolean;
  label?: string;
  onExampleClick?: () => void;
  labelSubText?: string;
}

/**
 *  This component provides styled decorations for label, description, and error message with our custom styles
 */
export default function FormLabel({
  label,
  description,
  disabled,
  className,
  optional,
  labelSubText,
  onExampleClick,
}: Props): JSX.Element {
  return (
    <div className={className}>
      {label && (
        <ControlledFormLabel
          optional={optional}
          disabled={disabled}
          labelSubText={labelSubText}
        >
          {label}
        </ControlledFormLabel>
      )}
      {description && (
        <Box sx={{ display: 'flex', mt: 1 }}>
          <Body size="sm">
            {description}
            {onExampleClick && (
              <Box
                component="span"
                role="button"
                onClick={onExampleClick}
                sx={{ color: 'secondary.main', cursor: 'pointer' }}
              >
                &nbsp;See an example»
              </Box>
            )}
          </Body>
        </Box>
      )}
    </div>
  );
}
