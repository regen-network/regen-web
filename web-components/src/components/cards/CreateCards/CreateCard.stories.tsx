import { ProjectPageIcon } from '../../icons/ProjectPageIcon';
import { CreateCard } from './CreateCard';
import { CreateCreditClassCard } from './CreateCreditClassCard';
import { CreateProjectCard } from './CreateProjectCard';

export default {
  title: 'Cards/Create Card',
  component: CreateCard,
};

const onClick = () => null;

export const withTitleAndIcon = (): JSX.Element => (
  <CreateCard
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
  <CreateCard onClick={onClick} buttonText="+ create" />
);

export const firstProjectCard = () => (
  <CreateProjectCard isFirstProject onClick={onClick} />
);

export const createProjectCard = () => <CreateProjectCard onClick={onClick} />;

export const firstCreditClassCard = () => (
  <CreateCreditClassCard isFirstCreditClass onClick={onClick} />
);

export const createCreditClassCard = () => (
  <CreateCreditClassCard onClick={onClick} />
);
