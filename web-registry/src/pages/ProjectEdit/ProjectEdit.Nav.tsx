import { useNavigate } from 'react-router-dom';

import Navigation from 'web-components/lib/components/faq/Navigation';

import { useProjectEditStyles } from './ProjectEdit.styles';

type Props = {
  section?: string;
  projectId?: string;
};

export const ProjectEditNav = ({ section, projectId }: Props) => {
  const { classes: styles } = useProjectEditStyles();
  const navigate = useNavigate();
  const navigateSection = (sectionName: string): void => {
    const hyphenated = sectionName.replace(' ', '-');
    navigate(`/project-pages/${projectId}/edit/${hyphenated}`);
  };
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
      onClick={(sectionName: string) => navigateSection(sectionName)}
      showIcon
    />
  );
};
