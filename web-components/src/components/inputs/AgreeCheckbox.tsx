import { SxProps, Theme } from '@mui/material';
import { Field } from 'formik';

import { Subtitle } from '../typography';
import CheckboxLabel from './CheckboxLabel';

interface Props {
  name: string;
  label: JSX.Element;
  sx?: SxProps<Theme>;
}

const AgreeCheckbox: React.FC<React.PropsWithChildren<Props>> = ({
  name,
  label,
  sx,
}: Props) => {
  return (
    <Field
      component={CheckboxLabel}
      type="checkbox"
      name={name}
      label={
        <Subtitle size="lg" color="primary.contrastText">
          {label}
        </Subtitle>
      }
      sx={sx}
    />
  );
};

export default AgreeCheckbox;
