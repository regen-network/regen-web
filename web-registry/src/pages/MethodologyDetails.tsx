import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';


import {
  MethodologyTopSection,
  MethodologySteps,
  MethodologyDocumentationSection,
  ImpactSection,
  ResourcesSection,
  MethodologyTestSection,
} from '../components/organisms';
import { methodologies } from '../mocks/cms-duplicates';
import topoBackground from '../assets/background.jpg';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
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
  const styles = useStyles();
  let { methodologyId } = useParams<{ methodologyId: string }>();
  const methodology = methodologies.find(p => p.id === methodologyId);

  if (methodology) {
    return (
      <div className={styles.root}>
        <MethodologyTopSection methodology={methodology} />
        <MethodologySteps methodology={methodology} />
        <MethodologyDocumentationSection methodology={methodology} />
        <div className={styles.topoBackground}>
          <ImpactSection title="Ecological Impact" impacts={methodology.impact} />
        </div>
        <ResourcesSection resources={methodology.resources} />
        <MethodologyTestSection methodology={methodology} />
      </div>
    );
  } else {
    return <div>Methodology not found</div>;
  }
}

export { MethodologyDetails };
