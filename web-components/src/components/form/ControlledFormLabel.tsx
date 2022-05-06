import React from 'react';
import { Box } from '@mui/material';
import { Body, Subtitle } from '../typography';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  optional?: boolean;
  labelSubText?: string;
}

/**
 *  manually re-implements MUI's FormLabel component to allow more control over positioning etc
 */
export default function ControlledFormLabel({
  children,
  optional,
  disabled,
  labelSubText,
}: Props): JSX.Element {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline' }}
    >
      <Subtitle
        size="lg"
        as="label"
        sx={{
          color: disabled ? 'info.main' : 'primary.contrastText',
          '&::after': {
            color: 'info.main',
            fontWeight: 'normal',
            fontSize: [14, 16],
            content: optional ? '" (optional)"' : '""',
          },
        }}
      >
        {children}
      </Subtitle>
      {labelSubText && (
        <Body ml={1} color="info.main">
          &nbsp;{labelSubText}
        </Body>
      )}
    </Box>
  );
}
