import { Link as LinkExt, SxProps, Theme } from '@mui/material';
import { useTheme } from '@mui/styles';

import {
  URL_REGISTRY_MARKETPLACE_LEGAL,
  URL_REGISTRY_TERMS_SERVICE,
} from '../../utils/globals';
import AgreeCheckbox from './AgreeCheckbox';

interface Props {
  sx?: SxProps<Theme>;
}

const AgreeErpaCheckbox: React.FC<Props> = ({ sx }: Props) => {
  const theme = useTheme();
  return (
    <AgreeCheckbox
      name="agreeErpa"
      label={
        <>
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
