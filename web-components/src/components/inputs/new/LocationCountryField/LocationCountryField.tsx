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
}

const LocationCountryField = forwardRef<HTMLDivElement, FieldProps>(
  ({ exclude = false }, ref) => {
    const [options, setOptions] = useState<Option[]>([]);

    useEffect(() => {
      setOptions(getCountryOptions({ exclude }));
    }, [exclude]);

    return <SelectTextField label="Country" options={options} ref={ref} />;
  },
);

export default LocationCountryField;
