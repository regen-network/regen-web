import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, useTheme } from '@mui/styles';

import ConnectSection, { IconLabelProps } from '../../components/ConnectSection';
import { Theme } from 'web-components/lib/theme/muiTheme';
import TelegramIcon from 'web-components/lib/components/icons/social/TelegramIcon';
import DiscordIcon from 'web-components/lib/components/icons/social/DiscordIcon';
import TwitterIcon from 'web-components/lib/components/icons/social/TwitterIcon';

const useStyles = makeStyles((theme: Theme) => ({
  connect: {
    marginTop: theme.spacing(24),
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
}));

const TokenConnectSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    {
      background: file(relativePath: { eq: "birds-background.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: tokenYaml {
        connectSection {
          header
        }
      }
    }
  `);
  const content = data.text.connectSection;
  const styles = useStyles();
  const theme = useTheme();
  const icons: IconLabelProps[] = [
    {
      icon: <TelegramIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://t.me/regennetworkdevannounce',
      label: 'Telegram',
    },
    {
      icon: <DiscordIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://discord.gg/BDcBJu3',
      label: 'Discord community',
      small: true,
    },
    {
      icon: <TwitterIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://twitter.com/regen_network',
      label: 'Twitter',
    },
  ];
  return (
    <ConnectSection
      className={styles.connect}
      titleClassName={styles.title}
      header={content.header}
      background={data.background}
      icons={icons}
    />
  );
};

export default TokenConnectSection;
