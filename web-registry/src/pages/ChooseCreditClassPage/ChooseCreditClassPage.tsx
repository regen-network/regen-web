import React from 'react';

import { ChooseCreditClass } from './ChooseCreditClass';
import { ChooseCreditClassLegacy } from './ChooseCreditClassLegacy';

const ChooseCreditClassPage: React.FC<
  React.PropsWithChildren<{ legacy?: boolean }>
> = ({ legacy }) => {
  return legacy ? <ChooseCreditClassLegacy /> : <ChooseCreditClass />;
};

export { ChooseCreditClassPage };
