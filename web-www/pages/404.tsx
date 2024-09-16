import { Box } from '@mui/material';

import NotFound from 'web-components/src/components/views/NotFoundView';

export default function Custom404() {
  return (
    <NotFound
      title="Oops! Page not found."
      bodyText="The page you are looking for might have been temporarily removed or had its name changed."
      buttonChildren={
        <>
          Visit Our Homepage{' '}
          <Box display={{ xs: 'none', sm: 'inline' }}>{'\u00A0'}Instead</Box>
        </>
      }
    />
  );
}
