import { forwardRef } from 'react';
import { Link as LinkExt, SxProps, Theme, useTheme } from '@mui/material';
import {
  URL_REGISTRY_MARKETPLACE_LEGAL,
  URL_REGISTRY_TERMS_SERVICE,
} from 'config/globals';

import CheckboxLabel from 'web-components/src/components/inputs/new/CheckboxLabel/CheckboxLabel';
import { Subtitle } from 'web-components/src/components/typography';

interface Props {
  error?: boolean;
  helperText?: string;
  sx?: SxProps<Theme>;
}

const AgreeErpaCheckbox = forwardRef<HTMLButtonElement, Props>(
  ({ sx, ...props }, ref) => {
    const theme = useTheme();
    return (
      <CheckboxLabel
        {...props}
        ref={ref}
        label={
          <Subtitle size="lg" color="primary.contrastText" as="span">
            {'I agree to the '}
            <LinkExt
              href={URL_REGISTRY_MARKETPLACE_LEGAL}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: theme.palette.secondary.main }}
            >
              Ecocredit Sales Agreement
            </LinkExt>
            {' and '}
            <LinkExt
              href={URL_REGISTRY_TERMS_SERVICE}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: theme.palette.secondary.main }}
            >
              terms of service
            </LinkExt>
          </Subtitle>
        }
        sx={{
          alignItems: 'start',
          '& .MuiCheckbox-root': { mt: 0.75 },
          ...sx,
        }}
      />
    );
  },
);

export default AgreeErpaCheckbox;
