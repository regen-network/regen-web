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
  optional?: boolean;
}

const LocationCountryField = forwardRef<HTMLDivElement, FieldProps>(
  ({ exclude = false, ...props }, ref) => {
    const [options, setOptions] = useState<Option[]>([]);

    useEffect(() => {
      setOptions(getCountryOptions({ exclude }));
    }, [exclude]);

    return (
      <SelectTextField
        {...props}
        label="Country"
        options={options}
        native={false}
        ref={ref}
      />
    );
  },
);

export default LocationCountryField;
