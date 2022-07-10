import { CreateProjectCard } from './CreateProjectCard';

export default {
  title: 'Registry/Molecules/CreateProjectCard',
  component: CreateProjectCard,
};

const voidFunc = (): void => void null;

export const createProjectCard = () => <CreateProjectCard onClick={voidFunc} />;

export const createProjectCardFirstProject = () => (
  <CreateProjectCard isFirstProject onClick={voidFunc} />
);
