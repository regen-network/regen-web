import React from 'react';
import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import ResourceCardsSlider from '@regen-network/web-components/lib/components/sliders/ResourceCards';
import { DocumentationTable } from '@regen-network/web-components/lib/components/table/DocumentationTable';
import {
  Label,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';

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

  const sxs = {
    btn: {
      color: 'info.dark',
      my: 8,
    } as SxProps,
  };

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
          <Label sx={sxs.btn}>{sub?.title}</Label>
          <ResourceCardsSlider
            items={sanityResourcesToCardProps(sub?.cards as SanityResource[])}
          />
        </React.Fragment>
      ))}
      <Label sx={sxs.btn}>{content?.documentTableTitle}</Label>
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
