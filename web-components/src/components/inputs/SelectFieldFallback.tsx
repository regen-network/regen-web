import { Field } from 'formik';

import SelectTextField from './SelectTextField';

interface SelectFallbackProps {
  name: string;
  label: string;
  optional?: boolean;
}

const SelectFieldFallback: React.FC<
  React.PropsWithChildren<SelectFallbackProps>
> = ({ name, label, optional = false }) => (
  <Field
    name={name}
    label={label}
    component={SelectTextField}
    options={[]}
    optional={optional}
  />
);

export default SelectFieldFallback;
