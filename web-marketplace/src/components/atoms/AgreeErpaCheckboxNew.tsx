import { forwardRef } from 'react';
import { Link as LinkExt, SxProps, Theme, useTheme } from '@mui/material';
import {
  URL_REGISTRY_MARKETPLACE_LEGAL,
  URL_REGISTRY_TERMS_SERVICE,
} from 'config/globals';

import CheckboxLabel from 'web-components/src/components/inputs/new/CheckboxLabel/CheckboxLabel';
import { Subtitle } from 'web-components/src/components/typography';
import { TextSize } from 'web-components/src/components/typography/sizing';

interface Props {
  error?: boolean;
  helperText?: string;
  sx?: SxProps<Theme>;
  labelClassName?: string;
  labelSize?: TextSize;
}

const AgreeErpaCheckbox = forwardRef<HTMLButtonElement, Props>(
  ({ sx, labelClassName, labelSize, ...props }, ref) => {
    const theme = useTheme();
    return (
      <CheckboxLabel
        {...props}
        ref={ref}
        label={
          <Subtitle
            className={labelClassName}
            size={labelSize || 'lg'}
            color="primary.contrastText"
            as="span"
          >
            {'I agree to the '}
            <LinkExt
              className="font-bold text-brand-400"
              href={URL_REGISTRY_MARKETPLACE_LEGAL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ecocredit Sales Agreement
            </LinkExt>
            {' and '}
            <LinkExt
              className="font-bold text-brand-400"
              href={URL_REGISTRY_TERMS_SERVICE}
              target="_blank"
              rel="noopener noreferrer"
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
