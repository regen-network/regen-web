import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import BackgroundSection from '../../components/BackgroundSection';
import ResourcesCard from 'web-components/lib/components/cards/ResourcesCard';
import Grid from '@material-ui/core/Grid';
import { useTheme, makeStyles, Theme } from '@material-ui/core';

const RegistrySection = (): JSX.Element => {
  const theme = useTheme();
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
              resourceCards {
                image {
                  childImageSharp {
                    fixed(quality: 90, width: 500) {
                      ...GatsbyImageSharpFixed_withWebp
                    }
                  }
                }
                title
                updated
                description
                buttonText
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.text.registrySection;
        return (
          <>
            <BackgroundSection
              /* prettier-ignore */
              padding={`
				${theme.spacing(40.75)} 
				${theme.spacing(33.75)} 
				${theme.spacing(21.75)} 
				${theme.spacing(33.75)}
			  `}
              linearGradient="unset"
              imageData={data.background.childImageSharp.fluid}
            >
              <Grid container direction="row" spacing={5}>
                {content.resourceCards.map(card => {
                  return (
                    <Grid item>
                      <ResourcesCard
                        image={card.image.childImageSharp.fixed}
                        title={card.title}
                        updated={card.updated}
                        description={card.description}
                        buttonText={card.buttonText}
                      ></ResourcesCard>
                    </Grid>
                  );
                })}
              </Grid>
            </BackgroundSection>
          </>
        );
      }}
    />
  );
};

export default RegistrySection;
