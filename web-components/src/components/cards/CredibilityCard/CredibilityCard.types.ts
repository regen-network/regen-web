import { SanityBlockContent } from 'src/components/block-content';

export type CredibilityCardProps = {
  index?: number;
  title: string;
  descriptionRaw: SanityBlockContent;
  icon?: string | null;
  claims: Array<{ description: string }>;
};
