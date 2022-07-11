import { FC } from 'react';
import { CreateCreditClassCard } from './CreateCreditClassCard';

export default {
  title: 'Registry/Molecules/CreateCreditClassCard',
  component: CreateCreditClassCard,
};

const voidFunc = (): void => void null;

export const createCreditClassCard: FC = () => (
  <CreateCreditClassCard onClick={voidFunc} />
);

export const createCreditClassCardFirstProject: FC = () => (
  <CreateCreditClassCard isFirstCreditClass onClick={voidFunc} />
);
