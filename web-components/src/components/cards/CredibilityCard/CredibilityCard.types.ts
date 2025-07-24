import { SanityBlockContent } from '../../../components/block-content';

export type CredibilityCardProps = {
  index?: number;
  title: string;
  descriptionRaw: SanityBlockContent;
  icon?: JSX.Element;
  claims: Array<{ description: string }>;
};
