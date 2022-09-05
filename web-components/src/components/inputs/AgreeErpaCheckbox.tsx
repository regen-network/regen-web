import { Link } from 'react-router-dom';
import { SxProps, Theme } from '@mui/material';

import AgreeCheckbox from './AgreeCheckbox';

interface Props {
  sx?: SxProps<Theme>;
}

const AgreeErpaCheckbox: React.FC<Props> = ({ sx }: Props) => {
  return (
    <AgreeCheckbox
      name="agreeErpa"
      label={
        <>
          I agree to the <Link to={'/'}>ERPA agreement</Link>
        </>
      }
      sx={sx}
    />
  );
};

export default AgreeErpaCheckbox;
