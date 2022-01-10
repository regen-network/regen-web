import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Title from 'web-components/lib/components/title';
import ResourceCardsSlider from 'web-components/lib/components/sliders/ResourceCards';
import { DocumentationTable } from 'web-components/lib/components/table/DocumentationTable';
import BackgroundSection from '../../components/BackgroundSection';

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
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
    },
  },
  table: {
    border: `2px solid ${theme.palette.secondary.contrastText}`,
    background: theme.palette.grey[50],
    borderRadius: '5px',
  },
}));

const RegistrySection = (): JSX.Element => {
  const classes = useStyles();
  return (
    <StaticQuery
      query={graphql`
        query {
          background: file(relativePath: { eq: "image-grid-bg.png" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          text: resourcesYaml {
            registrySection {
              header
              documentTableTitle
              documents {
                name
                type
                date
                url
              }
              subsections {
                title
                cards {
                  image {
                    extension
                    publicURL
                  }
                  title
                  updated
                  description
                  buttonText
                  link
                }
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.text.registrySection;
        return (
          <BackgroundSection
            className={classes.section}
            linearGradient="unset"
            imageData={data.background.childImageSharp.fluid}
            topSection={false}
          >
            <Title className={classes.title} variant="h3" align="left">
              {content.header}
            </Title>
            {content?.subsections?.map((sub: any, i: number) => (
              <React.Fragment key={i}>
                <Typography variant="h1" className={classes.subtitle}>
                  {sub.title}
                </Typography>
                <ResourceCardsSlider items={sub.cards} />
              </React.Fragment>
            ))}
            <Typography variant="h1" className={classes.subtitle}>
              {content.documentTableTitle}
            </Typography>
            <Box className={classes.table}>
              <DocumentationTable canClickRow rows={content.documents} />
            </Box>
          </BackgroundSection>
        );
      }}
    />
  );
};

export default RegistrySection;
