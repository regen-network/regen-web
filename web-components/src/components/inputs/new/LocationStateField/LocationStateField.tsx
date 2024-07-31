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
  optional?: boolean;
  value?: string;
  className?: string;
}

const LocationStateField = forwardRef<HTMLDivElement, FieldProps>(
  ({ country, ...props }, ref) => {
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
        label="State / Region"
        options={options}
        native={false}
        ref={ref}
      />
    );
  },
);

export default LocationStateField;
