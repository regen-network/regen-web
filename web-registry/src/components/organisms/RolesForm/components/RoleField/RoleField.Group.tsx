import { AutocompleteRenderGroupParams } from '@mui/material';

import { NoGroup } from './RoleField.NoGroup';
import { ProfileGroup } from './RoleField.ProfileGroup';

type RoleFieldGroupProps = {
  params: AutocompleteRenderGroupParams;
};

export const RoleFieldGroup: React.FC<RoleFieldGroupProps> = ({ params }) => {
  return params.group ? (
    <ProfileGroup key={params.key} params={params} />
  ) : (
    <NoGroup key={params.key} params={params} />
  );
};
