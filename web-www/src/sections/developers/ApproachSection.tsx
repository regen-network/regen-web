import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core/styles';

import TitleDescription from 'web-components/lib/components/title-description';
import Section from 'web-components/lib/components/section';
import { DevApproachSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  caption: {
    fontWeight: 'normal',
    fontFamily: theme.typography.overline.fontFamily,
    color: theme.palette.secondary.main,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(7),
      lineHeight: '130%',
      paddingBottom: theme.spacing(6),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(5),
      lineHeight: '160%',
      paddingBottom: theme.spacing(3.75),
    },
  },
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(14),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(16),
    },
  },
}));

const query = graphql`
  query devApproachSection {
    allSanityDevelopersPage {
      nodes {
        approachSection {
          caption
          header
          _rawBody
        }
      }
    }
  }
`;

const ApproachSection: React.FC = () => {
  const styles = useStyles();
  const data: DevApproachSectionQuery = useStaticQuery(query);
  const content = data?.allSanityDevelopersPage?.nodes?.[0].approachSection;

  return (
    <Section className={styles.section}>
      <div className={styles.caption}>{content?.caption}</div>
      <TitleDescription title={`${content?.header}`} description={content?._rawBody} />
    </Section>
  );
};

export default ApproachSection;
