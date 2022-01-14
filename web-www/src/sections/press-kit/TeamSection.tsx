import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import BackgroundImage from 'gatsby-background-image';
import { Theme, makeStyles } from '@material-ui/core/styles';

import TeamSection from 'web-components/lib/components/team-section';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import { TeamItemProps } from 'web-components/lib/components/team-item';

import { PresskitTeamSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(8),
    },
  },
}));

const query = graphql`
  query presskitTeamSection {
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
    sanityPresskitPage {
      teamSection {
        header
        buttonText
        members {
          name
          title
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
const PressKitTeamSection = (): JSX.Element => {
  const styles = useStyles();
  const { background, teamBackground, sanityPresskitPage: data } = useStaticQuery<PresskitTeamSectionQuery>(
    query,
  );
  const content = data?.teamSection;
  const members = content?.members?.map(m => ({
    ...m,
    imgUrl: m?.image?.asset?.url,
  })) as TeamItemProps[];
  return (
    <BackgroundImage fluid={background?.childImageSharp?.fluid as FluidObject}>
      <TeamSection
        gridMd={3}
        titleClassName={styles.title}
        bgUrl={teamBackground?.publicURL || ''}
        members={members}
        title={content?.header || ''}
      >
        <ContainedButton href="/team">{content?.buttonText}</ContainedButton>
      </TeamSection>
    </BackgroundImage>
  );
};

export default PressKitTeamSection;
