import Navigation from 'web-components/src/components/faq/Navigation';

import { useProjectEditStyles } from './ProjectEdit.styles';

type Props = {
  section?: string;
  onNavClick: (sectionName: string) => void;
  isOnChain: boolean;
};

export const ProjectEditNav = ({ section, onNavClick, isOnChain }: Props) => {
  const { classes: styles } = useProjectEditStyles();
  return (
    <Navigation
      classes={{ root: styles.nav, listItem: styles.navItem }}
      categories={
        [
          'basic info',
          'location',
          // 'roles',
          'description',
          'media',
          isOnChain ? 'metadata' : undefined,
          'settings',
        ].filter(category => Boolean(category)) as string[]
      }
      category={section?.replace('-', ' ')}
      onClick={onNavClick}
      showIcon
    />
  );
};
