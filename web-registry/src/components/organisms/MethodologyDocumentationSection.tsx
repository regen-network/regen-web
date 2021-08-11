import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import EyeIcon from 'web-components/lib/components/icons/EyeIcon';
import Section from 'web-components/lib/components/section';

import { DocumentationCard } from '../molecules/DocumentationCard';
import { MethodologyDetailsColumn } from '../molecules/MethodologyDetailsColumn';
import { Methodology } from '../../mocks/mocks';
import { Documentation, Maybe, Scalars } from '../../generated/sanity-graphql';
import { getBtnHref, isInternalLink } from '../../lib/button';
import { getSanityImgSrc } from '../../lib/imgSrc';

interface Props {
  nameRaw?: Maybe<Scalars['JSON']>;
  methodology: Methodology;
  documentation?: Maybe<Documentation>;
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

function MethodologyDocumentationSection({ methodology, documentation, nameRaw }: Props): JSX.Element {
  const styles = useStyles();

  return (
    <Section className={styles.section}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {documentation && (
            <DocumentationCard
              mainTitle="Documentation"
              cardTitle={documentation.title || ''}
              imageSrc={getSanityImgSrc(documentation.image)}
              imageAlt={documentation.image?.imageAlt || documentation.title || ''}
              buttonText={documentation.button?.buttonText || 'view document'}
              buttonUrl={getBtnHref(documentation.button)}
              buttonIcon={<EyeIcon />}
              version={methodology.version}
              program={methodology.program}
              buttonBlankTarget={documentation.button?.buttonBlankTarget ? true : false}
            />
          )}
          <DocumentationCard
            mainTitle="Related Credit Class"
            cardTitle={methodology.creditClassName}
            imageSrc={methodology.creditClassImage}
            imageAlt={methodology?.creditClassImageAltText}
            buttonText={'learn more'}
            buttonUrl={methodology.creditClassUrl}
            buttonBlankTarget={!isInternalLink(methodology.creditClassUrl)}
          />
        </div>
        <MethodologyDetailsColumn
          className={styles.detailColumn}
          nameRaw={nameRaw}
          methodology={methodology}
        />
      </div>
    </Section>
  );
}

export { MethodologyDocumentationSection };
