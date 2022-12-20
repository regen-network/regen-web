import ErrorView from './ErrorView';
import NotFound from './NotFoundView';

export default {
  title: 'Views',
  component: NotFound,
};

export const notFoundView = (): JSX.Element => <NotFound />;
export const errorView = (): JSX.Element => <ErrorView />;
