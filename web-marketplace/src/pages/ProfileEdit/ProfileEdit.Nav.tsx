import Navigation from 'web-components/src/components/faq/Navigation';

import { useProfileEditStyles } from './ProfileEdit.styles';

type Props = {
  section?: string;
  onNavClick: (sectionName: string) => void;
  className?: string;
};

export const ProfileEditNav = ({ section, onNavClick, className }: Props) => {
  const { classes: styles } = useProfileEditStyles();
  return (
    <Navigation
      classes={{ root: styles.nav, listItem: styles.navItem }}
      categories={['profile', 'settings']}
      category={section?.replace('-', ' ')}
      onClick={onNavClick}
      className={className}
      showIcon
    />
  );
};
