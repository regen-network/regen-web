import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, useTheme } from '@mui/styles';

import { Theme } from 'web-components/lib/theme/muiTheme';
import ConnectSection, { IconLabelProps } from '../../components/ConnectSection';
import TwitterIcon from 'web-components/lib/components/icons/social/TwitterIcon';
import TelegramIcon from 'web-components/lib/components/icons/social/TelegramIcon';
import DiscordIcon from 'web-components/lib/components/icons/social/DiscordIcon';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(38),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(24),
    },
  },
  item: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: '20%',
      flexBasis: '20%',
    },
  },
}));

const CommunityConnectSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    {
      background: file(relativePath: { eq: "developers-connect-bg.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: communityYaml {
        connectSection {
          header
          telegramSubLabel
          telegramUrl
          twitterSubLabel
          twitterUrl
          discordSubLabel
          discordUrl
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
      href: content.telegramUrl,
      label: 'Telegram',
      subLabel: content.telegramSubLabel,
    },

    {
      icon: <TwitterIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: content.twitterUrl,
      label: 'Twitter',
      subLabel: content.twitterSubLabel,
    },

    {
      icon: <DiscordIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: content.discordUrl,
      label: 'Discord',
      subLabel: content.discordSubLabel,
      small: true,
    },
  ];
  return (
    <ConnectSection
      itemClassName={styles.item}
      header={content.header}
      background={data.background}
      icons={icons}
      titleClassName={styles.title}
    />
  );
};

export default CommunityConnectSection;
