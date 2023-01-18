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
  name?: string;
  optional?: boolean;
  initialSelection?: string;
}

const LocationStateField = forwardRef<HTMLDivElement, FieldProps>(
  ({ country, name = 'stateProvince', initialSelection }, ref) => {
    const [stateOptions, setStateOptions] = useState<Option[]>([]);

    useEffect(() => {
      const options = getCountrySubdivisionOptions(country);
      const isValidSelection: boolean =
        !!initialSelection &&
        options.some((opt: Option) => opt.value === initialSelection);

      // setFieldValue(name, isValidSelection ? initialSelection : '');
      setStateOptions(options);
    }, [country, name, initialSelection]);

    return (
      <SelectTextField
        label="State / Region"
        options={stateOptions}
        ref={ref}
      />
    );
  },
);

export default LocationStateField;
