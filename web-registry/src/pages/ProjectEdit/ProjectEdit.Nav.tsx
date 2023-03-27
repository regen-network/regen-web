import Navigation from 'web-components/lib/components/faq/Navigation';

import { useProjectEditStyles } from './ProjectEdit.styles';

type Props = {
  section?: string;
  onNavClick: (sectionName: string) => void;
};

export const ProjectEditNav = ({ section, onNavClick }: Props) => {
  const { classes: styles } = useProjectEditStyles();
  return (
    <Navigation
      classes={{ root: styles.nav, listItem: styles.navItem }}
      categories={[
        'basic info',
        'location',
        'roles',
        'description',
        'media',
        'metadata',
      ]}
      category={section?.replace('-', ' ')}
      onClick={onNavClick}
      showIcon
    />
  );
};
