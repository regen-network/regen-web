import React, {
  forwardRef,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';

import { getCountryOptions } from '../../../../utils/locationStandard';
import SelectTextField, { Option } from '../SelectTextField/SelectTextField';

interface FieldProps extends PropsWithChildren {
  exclude?: boolean;
  error?: boolean;
  helperText?: string;
  value?: string;
  optional?: boolean;
}

const LocationCountryField = forwardRef<HTMLDivElement, FieldProps>(
  ({ exclude = false, ...props }, ref) => {
    const [options, setOptions] = useState<Option[]>([]);
    const value = options.length > 0 ? props.value ?? '' : '';

    useEffect(() => {
      setOptions(getCountryOptions({ exclude }));
    }, [exclude]);

    return (
      <SelectTextField
        {...props}
        value={value}
        label="Country"
        options={options}
        native={false}
        ref={ref}
      />
    );
  },
);

export default LocationCountryField;
