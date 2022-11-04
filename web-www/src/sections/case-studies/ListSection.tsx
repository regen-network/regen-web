import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import ResourcesCard from '@regen-network/web-components/lib/components/cards/ResourcesCard';
import Section from '@regen-network/web-components/lib/components/section';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';

import { CaseStudiesListSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(8.25),
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(11.5),
    },
  },
  section: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(27.5),
    },
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(25),
    },
  },
}));

const query = graphql`
  query caseStudiesListSection {
    sanityCaseStudiesPage {
      listSection {
        header
        view
      }
      topSection {
        title
        body
      }
      caseStudies {
        name
        description
        slug {
          current
        }
        cardImage {
          image {
            asset {
              url
            }
          }
        }
      }
    }
  }
`;

const ListSection: React.FC = () => {
  const styles = useStyles();
  const { sanityCaseStudiesPage: data } =
    useStaticQuery<CaseStudiesListSectionQuery>(query);
  return (
    <Section
      classes={{ root: styles.section, title: styles.title }}
      title={data?.listSection?.header || ''}
      titleAlign="left"
      titleVariant="h3"
    >
      <Grid container spacing={5}>
        {data?.caseStudies?.map((item, i) => (
          <Grid item xs={12} sm={6} md={4}>
            <ResourcesCard
              target="_self"
              title={item?.name || ''}
              description={item?.description || ''}
              image={{ publicURL: item?.cardImage?.image?.asset?.url || '' }}
              buttonText={data?.listSection?.view || ''}
              link={`/case-studies/${item?.slug?.current}`}
              backgroundGradient={false}
              titleOverwrite={false}
            />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};

export default ListSection;
