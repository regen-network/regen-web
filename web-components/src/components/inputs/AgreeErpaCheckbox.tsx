import { Link, SxProps, Theme } from '@mui/material';
import { useTheme } from '@mui/styles';

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
          <Link
            href={'https://regen.network'}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: theme.palette.secondary.main }}
          >
            ERPA agreement
          </Link>
        </>
      }
      sx={sx}
    />
  );
};

export default AgreeErpaCheckbox;
