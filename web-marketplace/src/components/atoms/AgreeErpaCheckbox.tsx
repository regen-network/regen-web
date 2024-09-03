import { Trans } from '@lingui/macro';
import { Link as LinkExt, SxProps, Theme, useTheme } from '@mui/material';
import {
  URL_REGISTRY_MARKETPLACE_LEGAL,
  URL_REGISTRY_TERMS_SERVICE,
} from 'config/globals';

import AgreeCheckbox from 'web-components/src/components/inputs/AgreeCheckbox';

interface Props {
  sx?: SxProps<Theme>;
}

const AgreeErpaCheckbox: React.FC<React.PropsWithChildren<Props>> = ({
  sx,
}: Props) => {
  const theme = useTheme();
  return (
    <AgreeCheckbox
      name="agreeErpa"
      label={
        <>
          <Trans>I agree to the </Trans>
          <LinkExt
            href={URL_REGISTRY_MARKETPLACE_LEGAL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: theme.palette.secondary.main }}
          >
            <Trans>Ecocredit Sales Agreement</Trans>
          </LinkExt>
          {' and '}
          <LinkExt
            href={URL_REGISTRY_TERMS_SERVICE}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: theme.palette.secondary.main }}
          >
            <Trans>terms of service</Trans>
          </LinkExt>
        </>
      }
      sx={{
        alignItems: 'start',
        '& .MuiCheckbox-root': { mt: 0.75 },
        ...sx,
      }}
    />
  );
};

export default AgreeErpaCheckbox;
