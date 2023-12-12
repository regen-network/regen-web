import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

import { Flex } from '../../../../components/box';
import ControlledFormLabel from '../../../form/ControlledFormLabel';
import { Body } from '../../../typography';

interface Props {
  className?: string;
  description?: ReactNode;
  disabled?: boolean;
  optional?: boolean | string;
  label?: string;
  onExampleClick?: () => void;
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
  onExampleClick,
}: Props): JSX.Element {
  return (
    <div className={className}>
      {label && (
        <ControlledFormLabel optional={optional} disabled={disabled}>
          {label}
        </ControlledFormLabel>
      )}
      {description && (
        <Flex sx={{ mt: 1 }}>
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
        </Flex>
      )}
    </div>
  );
}
