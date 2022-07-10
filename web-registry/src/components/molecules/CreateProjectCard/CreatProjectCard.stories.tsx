import { CreateProjectCard } from './CreateProjectCard';

export default {
  title: 'Registry/Molecules/CreateProjectCard',
  component: CreateProjectCard,
};

const voidFunc = (): void => void null;

export const createProjectCard = (): JSX.Element => (
  <CreateProjectCard onClick={voidFunc} />
);

export const createProjectCardFirstProject = (): JSX.Element => (
  <CreateProjectCard isFirstProject onClick={voidFunc} />
);
