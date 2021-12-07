import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import { makeStyles } from '@mui/styles';

import { Theme } from 'web-components/lib/theme/muiTheme';
import TeamSection from 'web-components/lib/components/team-section';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(8),
    },
  },
}));

const PressKitTeamSection = (): JSX.Element => {
  const classes = useStyles();

  return (
    <StaticQuery
      query={graphql`
        {
          teamBackground: file(relativePath: { eq: "press-kit-team-bg.png" }) {
            publicURL
          }
          background: file(relativePath: { eq: "waterfall-bg.png" }) {
            childImageSharp {
              fluid(quality: 90) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          text: pressKitYaml {
            teamSection {
              header
              buttonText
              members {
                name
                title
                image {
                  publicURL
                }
              }
            }
          }
        }
      `}
      render={data => {
        const content = data.text.teamSection;
        return (
          <BackgroundImage fluid={data.background.childImageSharp.fluid}>
            <TeamSection
              gridMd={3}
              titleClassName={classes.title}
              bgUrl={data.teamBackground.publicURL}
              members={content.members.map(m => ({ imgUrl: m.image.publicURL, ...m }))}
              title={content.header}
            >
              <ContainedButton href="/team">{content.buttonText}</ContainedButton>
            </TeamSection>
          </BackgroundImage>
        );
      }}
    />
  );
};

export default PressKitTeamSection;
