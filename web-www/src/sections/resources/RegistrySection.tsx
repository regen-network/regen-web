import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Title from 'web-components/lib/components/title';
import Table, { Document } from 'web-components/lib/components/table';
import ResourceCardsSlider from 'web-components/lib/components/sliders/ResourceCards';
import { DocumentationTable } from 'web-components/lib/components/table/DocumentationTable';
import BackgroundSection from '../../components/BackgroundSection';
import { ResourcesRegistrySectionQuery, SanityDoc, SanityResource } from '../../generated/graphql';
import { ResourcesCardProps } from 'web-components/lib/components/cards/ResourcesCard';
import { BlockContent } from 'web-components/src/components/block-content';
import { sanityDocsToDocuments, sanityResourcesToCardProps } from '../../util/sanity-transforms';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginBottom: theme.spacing(8.5),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(6.75),
    },
  },
  section: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  subtitle: {
    color: theme.palette.info.dark,
    textTransform: 'uppercase',
    fontWeight: 800,
    letterSpacing: '1px',
    margin: theme.spacing(8, 0),
    '&:last-of-type': {
      margin: theme.spacing(10, 0, 8),
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.spacing(3.5),
    },
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
      <Title className={styles.title} variant="h3" align="left">
        {content?.header}
      </Title>
      {content?.subsections?.map((sub, i) => (
        <React.Fragment key={i}>
          <Typography variant="h1" className={styles.subtitle}>
            {sub?.title}
          </Typography>
          <ResourceCardsSlider items={sanityResourcesToCardProps(sub?.cards as SanityResource[])} />
        </React.Fragment>
      ))}
      <Typography variant="h1" className={styles.subtitle}>
        {content?.documentTableTitle}
      </Typography>
      <Box className={styles.table}>
        <DocumentationTable canClickRow rows={sanityDocsToDocuments(content?.documents as SanityDoc[])} />
      </Box>
    </BackgroundSection>
  );
};

export default RegistrySection;
