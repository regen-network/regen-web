import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';

import ConnectSection, { IconLabelProps } from '../../components/ConnectSection';
import TelegramIcon from 'web-components/lib/components/icons/social/TelegramIcon';
import DiscordIcon from 'web-components/lib/components/icons/social/DiscordIcon';
import RegenLogoIcon from 'web-components/lib/components/icons/RegenLogoIcon';
import WhitepaperIcon from 'web-components/lib/components/icons/WhitepaperIcon';

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: '20%',
      flexBasis: '20%',
    },
  },
}));

const ValidatorsConnectSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "validators-connect-bg.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      text: validatorsYaml {
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
      href: 'https://t.me/regennetworkdevannounce', // TODO: update
      label: '100% validator Telegram',
    },
    {
      icon: <TelegramIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://t.me/regennetworkdevannounce',
      label: 'Developer / validator Telegram',
    },
    {
      icon: <DiscordIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://discord.gg/BDcBJu3',
      label: 'Discord community',
      small: true,
    },
    {
      icon: <RegenLogoIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: '/', // TODO: update
      label: 'Past testnets',
      small: true,
    },
    {
      icon: <WhitepaperIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: '/', // TODO: update
      label: 'Sign up for future testnets',
      small: true,
    },
  ];
  return (
    <ConnectSection
      itemClassName={classes.item}
      header={content.header}
      background={data.background}
      icons={icons}
    />
  );
};

export default ValidatorsConnectSection;
