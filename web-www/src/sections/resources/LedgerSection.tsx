import React from 'react';
import { makeStyles } from '@mui/styles';
import Section from '@regen-network/web-components/lib/components/section';
import ResourceCardsSlider from '@regen-network/web-components/lib/components/sliders/ResourceCards';
import { Title } from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';

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
      <Title variant="h3" align="left" sx={{ mb: [8.5, 6.75] }}>
        {content?.header}
      </Title>
      <ResourceCardsSlider
        items={sanityResourcesToCardProps(content?.cards as SanityResource[])}
      />
    </Section>
  );
};

export default LedgerSection;
