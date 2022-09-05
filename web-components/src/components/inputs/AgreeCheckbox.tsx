import { Field } from 'formik';

import { Subtitle } from '../typography';
import CheckboxLabel from './CheckboxLabel';

interface AgreeCheckboxProps {
  name: string;
  label: JSX.Element;
}

const AgreeCheckbox: React.FC<AgreeCheckboxProps> = ({
  name,
  label,
}: AgreeCheckboxProps) => {
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
    />
  );
};

export default AgreeCheckbox;
