import { forwardRef } from 'react';
import { Trans } from '@lingui/macro';
import { Link as LinkExt, SxProps, Theme } from '@mui/material';
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
            <Trans>I agree to the</Trans>
            <LinkExt
              className="font-bold text-brand-400 mx-5"
              href={URL_REGISTRY_MARKETPLACE_LEGAL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Trans>Ecocredit Sales Agreement</Trans>
            </LinkExt>
            <Trans>and</Trans>
            <LinkExt
              className="font-bold text-brand-400 ml-5"
              href={URL_REGISTRY_TERMS_SERVICE}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Trans>terms of service</Trans>
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
