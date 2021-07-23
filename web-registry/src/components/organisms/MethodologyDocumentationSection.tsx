import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import EyeIcon from 'web-components/lib/components/icons/EyeIcon';
import Section from 'web-components/lib/components/section';

import { DocumentationCard } from '../molecules/DocumentationCard';
import { MethodologyDetailsColumn } from '../molecules/MethodologyDetailsColumn';
import { Methodology } from '../../mocks/mocks';

interface Props {
  methodology: Methodology;
}

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(30),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(20),
    },
  },
  main: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.breakpoints.values.lg,
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  cards: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      '& > div:last-child': {
        marginBottom: 0,
      },
    },
  },
  detailColumn: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(13.25),
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginBottom: theme.spacing(4),
    },
  },
}));

function MethodologyDocumentationSection({ methodology }: Props): JSX.Element {
  const styles = useStyles();

  return (
    <Section className={styles.section}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <DocumentationCard
            mainTitle="Documentation"
            cardTitle={methodology.documentationTitle}
            imageSrc={methodology.documentationImage}
            imageAlt={methodology?.documentationImageAltText}
            buttonText={'view methodology'}
            buttonUrl={methodology.documentationUrl}
            buttonIcon={<EyeIcon />}
            version={methodology.version}
            program={methodology.program}
          />
          <DocumentationCard
            mainTitle="Related Credit Class"
            cardTitle={methodology.creditClassName}
            imageSrc={methodology.creditClassImage}
            imageAlt={methodology?.creditClassImageAltText}
            buttonText={'learn more'}
            buttonUrl={methodology.creditClassUrl} //TODO: update JSON to point to new Credit Ckass page when ready
          />
        </div>
        <MethodologyDetailsColumn className={styles.detailColumn} methodology={methodology} />
      </div>
    </Section>
  );
}

export { MethodologyDocumentationSection };
