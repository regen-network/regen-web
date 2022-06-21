import React from 'react';

import { ChooseCreditClass } from '../../components/organisms/ChooseCreditClass/ChooseCreditClass';
import { ChooseCreditClassLegacy } from '../../components/organisms/ChooseCreditClass/ChooseCreditClassLegacy';

const ChooseCreditClassPage: React.FC<{ legacy?: boolean }> = ({ legacy }) => {
  return legacy ? <ChooseCreditClassLegacy /> : <ChooseCreditClass />;
};

export { ChooseCreditClassPage };
