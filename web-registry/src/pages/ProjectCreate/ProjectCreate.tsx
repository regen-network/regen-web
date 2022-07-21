import { Outlet } from 'react-router-dom';
import { CreateProjectProvider } from './ProjectCreate.context';

export const ProjectCreate = (): JSX.Element => {
  // note: we could also use react-router's built in oulet context for this.
  // See: https://reactrouter.com/docs/en/v6/hooks/use-outlet-context
  return (
    <CreateProjectProvider>
      <Outlet />
    </CreateProjectProvider>
  );
};
