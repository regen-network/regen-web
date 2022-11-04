import React from 'react';
import { makeStyles } from '@mui/styles';
import ContainedButton from '@regen-network/web-components/lib/components/buttons/ContainedButton';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import { FluidObject } from 'gatsby-image';

import { TeamSection } from '../../components/TeamSection';
import {
  PresskitTeamSectionQuery,
  SanityRegenTeamMember,
} from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    [theme.breakpoints.down('sm')]: {
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
          ...teamMemberFields
        }
      }
    }
  }
`;
const PressKitTeamSection = (): JSX.Element => {
  const styles = useStyles();
  const {
    background,
    teamBackground,
    sanityPresskitPage: data,
  } = useStaticQuery<PresskitTeamSectionQuery>(query);
  const content = data?.teamSection;
  const members = !!content?.members ? content.members : [];
  return (
    <BackgroundImage fluid={background?.childImageSharp?.fluid as FluidObject}>
      <TeamSection
        gridMd={3}
        titleClassName={styles.title}
        bgUrl={teamBackground?.publicURL || ''}
        members={members as SanityRegenTeamMember[]}
        title={content?.header || ''}
      >
        <ContainedButton href="/team" size="large">
          {content?.buttonText}
        </ContainedButton>
      </TeamSection>
    </BackgroundImage>
  );
};

export default PressKitTeamSection;
