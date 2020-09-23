import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';

import ConnectSection, { IconLabelProps } from '../../components/ConnectSection';
import TwitterIcon from 'web-components/lib/components/icons/social/TwitterIcon';
import TelegramIcon from 'web-components/lib/components/icons/social/TelegramIcon';
import MediumIcon from 'web-components/lib/components/icons/social/MediumIcon';
import GithubIcon from 'web-components/lib/components/icons/social/GithubIcon';
import BlockIcon from 'web-components/lib/components/icons/BlockIcon';
import WhitepaperIcon from 'web-components/lib/components/icons/WhitepaperIcon';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 'normal',
    fontFamily: theme.typography.overline.fontFamily,
  },
}));

const DevelopersConnectSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "developers-connect-bg.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: developersYaml {
        connectSection {
          header
        }
      }
    }
  `);
  const content = data.text.connectSection;
  const classes = useStyles();
  const theme = useTheme();
  const icons: IconLabelProps[] = [
    {
      icon: <TelegramIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://t.me/regennetwork_public',
      label: 'Regen Network: Public',
    },
    {
      icon: <TelegramIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://t.me/joinchat/FJGNSxOpjJcgrUGwAAOKUg',
      label: 'Regen Network: DVD',
    },
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
    {
      icon: <BlockIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://regen-network.gitlab.io/lunie/',
      label: 'Block Explorer',
      small: true,
    },
  ];
  return (
    <ConnectSection
      header={content.header}
      background={data.background}
      icons={icons}
      titleClassName={classes.title}
    />
  );
};

export default DevelopersConnectSection;
