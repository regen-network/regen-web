import { CreateCreditClassCard } from './CreateCreditClassCard';

export default {
  title: 'Registry/Molecules/CreateCreditClassCard',
  component: CreateCreditClassCard,
};

const voidFunc = (): void => void null;

export const createCreditClassCard = () => (
  <CreateCreditClassCard onClick={voidFunc} />
);

export const createCreditClassCardFirstProject = () => (
  <CreateCreditClassCard isFirstProject onClick={voidFunc} />
);
