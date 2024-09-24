import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import Navigation from 'web-components/src/components/faq/Navigation';

import { useProfileEditStyles } from './ProfileEdit.styles';

type Props = {
  section?: string;
  onNavClick: (sectionName: string) => void;
  className?: string;
};

export const ProfileEditNav = ({ section, onNavClick, className }: Props) => {
  const { _ } = useLingui();

  const { classes: styles } = useProfileEditStyles();
  return (
    <Navigation
      classes={{ root: styles.nav, listItem: styles.navItem }}
      categories={[
        { label: _(msg`profile`), value: 'profile' },
        { label: _(msg`settings`), value: 'settings' },
      ]}
      category={section?.replace('-', ' ')}
      onClick={onNavClick}
      className={className}
      showIcon
    />
  );
};
