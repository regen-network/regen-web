import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';

import ConnectSection, { IconLabelProps } from '../../components/ConnectSection';
import TwitterIcon from 'web-components/lib/components/icons/social/TwitterIcon';
import TelegramIcon from 'web-components/lib/components/icons/social/TelegramIcon';
import MediumIcon from 'web-components/lib/components/icons/social/MediumIcon';
import GithubIcon from 'web-components/lib/components/icons/social/GithubIcon';
import WhitepaperIcon from 'web-components/lib/components/icons/WhitepaperIcon';
import { DevConnectSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 'normal',
    fontFamily: theme.typography.overline.fontFamily,
  },
  item: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: '20%',
      flexBasis: '20%',
    },
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
    allSanityDevelopersPage {
      nodes {
        connectSectionHeader
      }
    }
  }
`;

const DevelopersConnectSection: React.FC = () => {
  const data: DevConnectSectionQuery = useStaticQuery(query);
  const styles = useStyles();
  const theme = useTheme();
  const icons: IconLabelProps[] = [
    {
      icon: <TelegramIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://t.me/regennetworkdevannounce',
      label: 'Development Updates',
    },
    {
      icon: <MediumIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://medium.com/regen-network',
      label: 'Medium',
    },
    {
      icon: <TwitterIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://twitter.com/regen_network',
      label: 'Twitter',
    },
    {
      icon: <WhitepaperIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://regen-network.gitlab.io/whitepaper/WhitePaper.pdf',
      label: 'Whitepaper',
      small: true,
    },
    {
      icon: <GithubIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://github.com/regen-network/',
      label: 'Github',
    },
  ];
  return (
    <ConnectSection
      itemClassName={styles.item}
      header={`${data?.allSanityDevelopersPage?.nodes[0]?.connectSectionHeader}`}
      background={data?.background as any}
      icons={icons}
      titleClassName={styles.title}
    />
  );
};

export default DevelopersConnectSection;
