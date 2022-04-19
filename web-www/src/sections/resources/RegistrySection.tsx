import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Theme } from 'web-components/lib/theme/muiTheme';
import { ButtonText, Title } from 'web-components/lib/components/typography';
import ResourceCardsSlider from 'web-components/lib/components/sliders/ResourceCards';
import { DocumentationTable } from 'web-components/lib/components/table/DocumentationTable';
import BackgroundSection from '../../components/BackgroundSection';
import {
  ResourcesRegistrySectionQuery,
  SanityDoc,
  SanityResource,
} from '../../generated/graphql';
import {
  sanityDocsToDocuments,
  sanityResourcesToCardProps,
} from '../../util/sanity-transforms';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  table: {
    border: `2px solid ${theme.palette.secondary.contrastText}`,
    background: theme.palette.grey[50],
    borderRadius: '5px',
  },
}));

const query = graphql`
  query resourcesRegistrySection {
    background: file(relativePath: { eq: "image-grid-bg.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityResourcesPage {
      registrySection {
        header
        documentTableTitle
        documents {
          name
          type
          date
          href
        }
        subsections {
          title
          cards {
            image {
              imageHref
              image {
                asset {
                  extension
                  url
                }
              }
            }
            _rawTitle
            lastUpdated
            _rawDescription
            button {
              buttonText
              buttonLink {
                buttonHref
                buttonDoc {
                  href
                }
              }
            }
          }
        }
      }
    }
  }
`;

const RegistrySection = (): JSX.Element => {
  const styles = useStyles();
  const data = useStaticQuery<ResourcesRegistrySectionQuery>(query);
  const content = data?.sanityResourcesPage?.registrySection;

  return (
    <BackgroundSection
      className={styles.section}
      linearGradient="unset"
      imageData={data?.background?.childImageSharp?.fluid}
      topSection={false}
    >
      <Title variant="h3" align="left" sx={{ mb: [6.75, 8.5] }}>
        {content?.header}
      </Title>
      {content?.subsections?.map((sub, i) => (
        <React.Fragment key={i}>
          <ButtonText
            sx={{
              color: 'info.dark',
              my: 8,
            }}
          >
            {sub?.title}
          </ButtonText>
          <ResourceCardsSlider
            items={sanityResourcesToCardProps(sub?.cards as SanityResource[])}
          />
        </React.Fragment>
      ))}
      <ButtonText
        sx={{
          color: 'info.dark',
          my: 8,
        }}
      >
        {content?.documentTableTitle}
      </ButtonText>
      <Box className={styles.table}>
        <DocumentationTable
          canClickRow
          rows={sanityDocsToDocuments(content?.documents as SanityDoc[])}
        />
      </Box>
    </BackgroundSection>
  );
};

export default RegistrySection;
