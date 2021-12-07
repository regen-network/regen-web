import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, useTheme } from '@mui/styles';

import ConnectSection, { IconLabelProps } from '../../components/ConnectSection';
import { Theme } from 'web-components/lib/theme/muiTheme';
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
    {
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
      icon: <WhitepaperIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://github.com/regen-network/testnets#regen-ledger-testnets',
      label: 'Past testnets',
      small: true,
    },
    {
      icon: <RegenLogoIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://forms.gle/U2qCRizswUvLG4M19',
      label: 'Sign up for future testnets, US only',
      small: true,
    },
    {
      icon: <RegenLogoIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://forms.gle/CZRfbXjdp6gctF5m9',
      label: 'Sign up for future testnets, non-US',
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
