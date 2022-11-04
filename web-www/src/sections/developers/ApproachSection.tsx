import React from 'react';
import { makeStyles } from '@mui/styles';
import Section from '@regen-network/web-components/lib/components/section';
import { TitleBody } from '@regen-network/web-components/lib/components/text-layouts';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';

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
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(5),
      lineHeight: '160%',
      paddingBottom: theme.spacing(3.75),
    },
  },
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(14),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(16),
    },
  },
}));

const query = graphql`
  query devApproachSection {
    sanityDevelopersPage {
      approachSection {
        caption
        header
        _rawBody
      }
    }
  }
`;

const ApproachSection: React.FC = () => {
  const styles = useStyles();
  const { sanityDevelopersPage } =
    useStaticQuery<DevApproachSectionQuery>(query);
  const data = sanityDevelopersPage?.approachSection;

  return (
    <Section className={styles.section}>
      <div className={styles.caption}>{data?.caption}</div>
      <TitleBody title={`${data?.header}`} body={data?._rawBody} />
    </Section>
  );
};

export default ApproachSection;
