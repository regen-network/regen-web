import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { makeStyles, Theme, useTheme } from '@material-ui/core';

import TitleDescription from 'web-components/lib/components/title-description';
import Section from 'web-components/lib/components/section';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import ImpactCard from 'web-components/lib/components/cards/ImpactCard';

const useStyles = makeStyles((theme: Theme) => ({
  outcomes: {
    '& .slick-slide': {
      '& div:first-child': {
        height: '100%',
      },
    },
  },
}));

const TitleDescriptionSection = (): JSX.Element => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        query {
          content: scienceYaml {
            titleDescriptionSection {
              header
              description
            }
            practicesOutcomesSection {
              outcomes {
                header
                items {
                  image {
                    extension
                    publicURL
                  }
                  header
                  description
                }
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.content.titleDescriptionSection;
        const outcomes = data.content.practicesOutcomesSection.outcomes;

        const outcomesElement: JSX.Element[] = outcomes?.items?.map(({ image, header, description }) => (
          <ImpactCard name={header} imgSrc={image.publicURL} description={description} largeFontSize />
        ));

        return (
          <Section>
            <TitleDescription title={content.header} description={content.description}></TitleDescription>
            <ResponsiveSlider
              itemWidth="90%"
              padding={theme.spacing(2.5)}
              className={classes.outcomes}
              title={outcomes.header}
              arrows
              slidesToShow={3}
              items={outcomesElement}
            />
          </Section>
        );
      }}
    />
  );
};

export default TitleDescriptionSection;
