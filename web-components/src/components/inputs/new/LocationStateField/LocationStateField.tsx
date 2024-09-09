import React, {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

import { getCountrySubdivisionOptions } from '../../../../utils/locationStandard';
import SelectTextField, { Option } from '../SelectTextField/SelectTextField';

interface FieldProps extends PropsWithChildren {
  country: string;
  error?: boolean;
  helperText?: string;
  emptyOptionText: string;
  label: string;
  optional?: boolean;
  value?: string;
  className?: string;
}

const LocationStateField = forwardRef<HTMLDivElement, FieldProps>(
  ({ country, label, emptyOptionText, ...props }, ref) => {
    const [options, setOptions] = useState<Option[]>([]);
    const value = options.length > 0 ? props.value ?? '' : '';

    useEffect(() => {
      const options = getCountrySubdivisionOptions(country);
      setOptions(options);
    }, [country]);

    return (
      <SelectTextField
        {...props}
        value={value}
        label={label}
        emptyOptionText={emptyOptionText}
        options={options}
        native={false}
        ref={ref}
      />
    );
  },
);

export default LocationStateField;
