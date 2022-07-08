import { ProjectPageIcon } from '../../icons/ProjectPageIcon';
import { DashboardCreateCard } from './DashboardCreateCard';

export default {
  title: 'Cards/Dashboard Create Card',
  component: DashboardCreateCard,
};

const onClick = () => null;

export const withTitleAndIcon = (): JSX.Element => (
  <DashboardCreateCard
    title={'Create your first project'}
    onClick={onClick}
    buttonText="+ create project"
    icon={
      <ProjectPageIcon
        sx={theme => ({
          color: 'info.main',
          height: theme.spacing(14.75),
          width: theme.spacing(18.25),
        })}
      />
    }
  />
);

export const noTitleOrIcon = (): JSX.Element => (
  <DashboardCreateCard onClick={onClick} buttonText="+ create" />
);
