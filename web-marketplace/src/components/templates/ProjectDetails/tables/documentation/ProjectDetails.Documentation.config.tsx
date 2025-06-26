import { Box } from '@mui/material';

import { DOCUMENTATION_MAPPING } from './ProjectDetails.Documentation.constants';
import { DOCUMENTATION_HEADERS } from './ProjectDetails.Documentation.types';

export const DOCUMENTATION_ROW = [
  <Box key="name" sx={{ whiteSpace: 'normal' }}>
    {DOCUMENTATION_MAPPING[DOCUMENTATION_HEADERS.NAME].name}
  </Box>,
  <Box key="type" sx={{ whiteSpace: 'normal' }}>
    {DOCUMENTATION_MAPPING[DOCUMENTATION_HEADERS.TYPE].name}
  </Box>,
  <Box key="upload-date" sx={{ whiteSpace: 'normal' }}>
    {DOCUMENTATION_MAPPING[DOCUMENTATION_HEADERS.UPLOAD_DATE].name}
  </Box>,
];
