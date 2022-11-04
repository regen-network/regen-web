import React from 'react';
import { useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import GithubIcon from '@regen-network/web-components/lib/components/icons/social/GithubIcon';
import MediumIcon from '@regen-network/web-components/lib/components/icons/social/MediumIcon';
import TelegramIcon from '@regen-network/web-components/lib/components/icons/social/TelegramIcon';
import TwitterIcon from '@regen-network/web-components/lib/components/icons/social/TwitterIcon';
import WhitepaperIcon from '@regen-network/web-components/lib/components/icons/WhitepaperIcon';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';

import ConnectSection, {
  IconLabelProps,
} from '../../components/ConnectSection';
import { DevConnectSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 'normal',
    fontFamily: theme.typography.overline.fontFamily,
  },
}));

const query = graphql`
  query devConnectSection {
    background: file(relativePath: { eq: "developers-connect-bg.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityDevelopersPage {
      connectSectionHeader
    }
  }
`;

const DevelopersConnectSection: React.FC = () => {
  const styles = useStyles();
  const { background, sanityDevelopersPage: data } =
    useStaticQuery<DevConnectSectionQuery>(query);
  const theme = useTheme();
  const icons: IconLabelProps[] = [
    {
      icon: (
        <TelegramIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://t.me/regennetworkdevannounce',
      label: 'Development Updates',
    },
    {
      icon: (
        <MediumIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://medium.com/regen-network',
      label: 'Medium',
    },
    {
      icon: (
        <TwitterIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://twitter.com/regen_network',
      label: 'Twitter',
    },
    {
      icon: (
        <WhitepaperIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://regen-network.gitlab.io/whitepaper/WhitePaper.pdf',
      label: 'Whitepaper',
      smallSvg: true,
    },
    {
      icon: (
        <GithubIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://github.com/regen-network/',
      label: 'Github',
    },
  ];
  return (
    <ConnectSection
      header={`${data?.connectSectionHeader}`}
      background={background as any}
      icons={icons}
      titleClassName={styles.title}
    />
  );
};

export default DevelopersConnectSection;
