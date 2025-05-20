import { useParams } from 'react-router-dom';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { makeStyles } from 'tss-react/mui';

import { Theme } from 'web-components/src/theme/muiTheme';

import topoBackground from '../../assets/background.jpg';
import {
  ImpactSection,
  MethodologyDocumentationSection,
  MethodologySteps,
  MethodologyTestSection,
  MethodologyTopSection,
  ResourcesSection,
} from '../../components/organisms';
import { useAllMethodologyQuery } from '../../generated/sanity-graphql';
import { client } from '../../lib/clients/sanity';
import mock from '../../mocks/mock.json';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.primary.main,
  },
  topoBackground: {
    backgroundImage: `url(${topoBackground})`,
  },
}));

function MethodologyDetails(): JSX.Element {
  const { _ } = useLingui();
  const { classes: styles } = useStyles();
  const { methodologyId } = useParams();
  const { data } = useAllMethodologyQuery({ client });
  const content = data?.allMethodology?.find(
    methodology => methodology.path === methodologyId,
  );
  // TODO replace with methodology data from db
  const methodology = mock.methodologies.find(p => p.id === methodologyId);

  if (methodology) {
    return (
      <div className={styles.root}>
        <MethodologyTopSection
          methodology={methodology}
          nameRaw={content?.nameRaw}
          descriptionRaw={content?.descriptionRaw}
        />
        <MethodologySteps steps={content?.steps} />
        <MethodologyDocumentationSection
          methodology={methodology}
          nameRaw={content?.nameRaw}
          documentation={content?.documentation}
        />
        <div className={styles.topoBackground}>
          <ImpactSection
            title={_(msg`Ecological Impact`)}
            impacts={content?.ecologicalImpact}
          />
        </div>
        <ResourcesSection resources={content?.resources} />
        <MethodologyTestSection
          title={content?.bottomSection?.title}
          descriptionRaw={content?.bottomSection?.descriptionRaw}
        />
      </div>
    );
  } else {
    return (
      <div>
        <Trans>Methodology not found</Trans>
      </div>
    );
  }
}

export { MethodologyDetails };
