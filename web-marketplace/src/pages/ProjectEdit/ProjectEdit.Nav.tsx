import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';

import Navigation from 'web-components/src/components/faq/Navigation';

import { useProjectEditStyles } from './ProjectEdit.styles';

type Props = {
  section?: string;
  onNavClick: (sectionName: string) => void;
  isOnChain: boolean;
};

export const ProjectEditNav = ({ section, onNavClick, isOnChain }: Props) => {
  const { _ } = useLingui();
  const { classes: styles } = useProjectEditStyles();

  return (
    <Navigation
      classes={{ root: styles.nav, listItem: styles.navItem }}
      categories={[
        // eslint-disable-next-line lingui/no-unlocalized-strings
        { label: _(msg`basic info`), value: 'basic info' },
        { label: _(msg`location`), value: 'location' },
        // 'roles',
        { label: _(msg`description`), value: 'description' },
        { label: _(msg`media`), value: 'media' },
        isOnChain ? { label: _(msg`metadata`), value: 'metadata' } : undefined,
        { label: _(msg`settings`), value: 'settings' },
      ].filter(
        (category): category is { label: string; value: string } =>
          category !== undefined,
      )}
      category={section?.replace('-', ' ')}
      onClick={onNavClick}
      showIcon
    />
  );
};
