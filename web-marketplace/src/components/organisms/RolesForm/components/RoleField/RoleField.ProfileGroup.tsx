import { AutocompleteRenderGroupParams, Box } from '@mui/material';

import { Label } from 'web-components/src/components/typography';

type ProfileGroupProps = {
  params: AutocompleteRenderGroupParams;
};

export const ProfileGroup: React.FC<ProfileGroupProps> = ({ params }) => (
  <li key={params.key}>
    <Label color="primary.dark" sx={{ fontSize: [11], pl: 4.5, pt: 3.5 }}>
      {params.group}
    </Label>
    <Box component="ul" sx={{ p: 0, color: 'primary.dark', fontSize: 14 }}>
      {params.children}
    </Box>
  </li>
);
