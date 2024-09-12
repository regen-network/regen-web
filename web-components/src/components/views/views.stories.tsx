import { Box } from '@mui/material';

import ErrorView from './ErrorView';
import NotFound from './NotFoundView';

export default {
  title: 'Views',
  component: NotFound,
};

export const notFoundView = (): JSX.Element => (
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
export const errorView = (): JSX.Element => (
  <ErrorView
    title="Oops! Something went wrong."
    bodyText="Please try again later. If the problem persists, please contact support."
    buttonText="Visit Our Homepage"
  />
);
