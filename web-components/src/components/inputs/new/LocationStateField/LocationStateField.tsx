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
  initialSelection?: string;
}

const LocationStateField = forwardRef<HTMLDivElement, FieldProps>(
  ({ country, initialSelection, ...props }, ref) => {
    const [options, setOptions] = useState<Option[]>([]);

    useEffect(() => {
      const options = getCountrySubdivisionOptions(country);
      const isValidSelection: boolean =
        !!initialSelection &&
        options.some((opt: Option) => opt.value === initialSelection);

      // setFieldValue(name, isValidSelection ? initialSelection : '');
      setOptions(options);
    }, [country, initialSelection]);

    return (
      <SelectTextField
        {...props}
        label="State / Region"
        options={options}
        native={false}
        ref={ref}
      />
    );
  },
);

export default LocationStateField;
