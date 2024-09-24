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
  emptyOptionText: string;
  value?: string;
  optional?: boolean;
  label: string;
  countryLabelPlaceholder: string;
}

const LocationCountryField = forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      exclude = false,
      label,
      emptyOptionText,
      countryLabelPlaceholder,
      ...props
    },
    ref,
  ) => {
    const [options, setOptions] = useState<Option[]>([]);
    const value = options.length > 0 ? props.value ?? '' : '';

    useEffect(() => {
      setOptions(getCountryOptions({ exclude, countryLabelPlaceholder }));
    }, [exclude, countryLabelPlaceholder]);

    return (
      <SelectTextField
        {...props}
        value={value}
        emptyOptionText={emptyOptionText}
        label={label}
        options={options}
        native={false}
        ref={ref}
      />
    );
  },
);

export default LocationCountryField;
