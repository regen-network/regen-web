import { Link as LinkExt, SxProps, Theme } from '@mui/material';
import { useTheme } from '@mui/styles';

import AgreeCheckbox from './AgreeCheckbox';

const URL_TERMS_SERVICE = 'https://www.regen.network/terms-service/';
const URL_MARKETPLACE_LEGAL =
  'https://regennetwork.notion.site/Regen-Marketplace-Contracts-7bc2b0075ee64c1a957463bb5eddcead';

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
            href={URL_MARKETPLACE_LEGAL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: theme.palette.secondary.main }}
          >
            Ecocredit Sales Agreement
          </LinkExt>
          {' and '}
          <LinkExt
            href={URL_TERMS_SERVICE}
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
