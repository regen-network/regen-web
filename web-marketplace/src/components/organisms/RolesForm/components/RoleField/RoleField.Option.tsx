import { HTMLAttributes } from 'react';
import { truncate } from 'lodash';

import { Body } from 'web-components/src/components/typography';

import { DEFAULT_NAME } from '../../../../../legacy-pages/Dashboard/Dashboard.constants';
import { OptionType } from './RoleField.types';
import { isProfile } from './RoleField.utils';

interface RoleFieldOptionProps extends HTMLAttributes<HTMLLIElement> {
  option: OptionType;
}

export const RoleFieldOption: React.FC<RoleFieldOptionProps> = ({
  option,
  ...props
}) => {
  if (isProfile(option) && option.id === '') {
    return (
      <li key="all-profiles-placeholder">
        <Body
          size="sm"
          sx={{ pl: 4, pt: 1.5, pb: 0.5 }}
          fontStyle="italic"
          fontWeight={300}
          color="primary.dark"
        >
          {option.name}
        </Body>
      </li>
    );
  }
  return (
    <li {...props}>
      {isProfile(option)
        ? `${option.name || DEFAULT_NAME}${
            option.address ? ` (${truncate(option.address)})` : ''
          }`
        : option}
    </li>
  );
};
