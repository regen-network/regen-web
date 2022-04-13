import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@mui/styles';

import { Theme } from 'web-components/lib/theme/muiTheme';
import { Title } from 'web-components/lib/components/typography';
import ResourceCardsSlider from 'web-components/lib/components/sliders/ResourceCards';
import Section from 'web-components/lib/components/section';
import {
  ResourcesLedgerSectionQuery,
  SanityResource,
} from '../../generated/graphql';
import { sanityResourcesToCardProps } from '../../util/sanity-transforms';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(21.5),
      paddingBottom: theme.spacing(23.25),
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingTop: theme.spacing(17),
      paddingBottom: theme.spacing(25),
    },
  },
  title: {
    marginBottom: theme.spacing(8.5),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(6.75),
    },
  },
}));

const query = graphql`
  query resourcesLedgerSection {
    sanityResourcesPage {
      ledgerSection {
        header
        cards {
          _rawTitle
          _rawDescription
          lastUpdated
          button {
            buttonText
            buttonLink {
              buttonHref
              buttonDoc {
                href
              }
            }
          }
          image {
            imageHref
            image {
              asset {
                extension
                url
              }
            }
          }
        }
      }
    }
  }
`;

const LedgerSection = (): JSX.Element => {
  const { sanityResourcesPage } =
    useStaticQuery<ResourcesLedgerSectionQuery>(query);
  const content = sanityResourcesPage?.ledgerSection;
  const styles = useStyles();
  return (
    <Section className={styles.section}>
      <Title className={styles.title} variant="h3" align="left">
        {content?.header}
      </Title>
      <ResourceCardsSlider
        items={sanityResourcesToCardProps(content?.cards as SanityResource[])}
      />
    </Section>
  );
};

export default LedgerSection;
