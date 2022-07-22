import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { graphql, useStaticQuery } from 'gatsby';

import RegenLogoIcon from 'web-components/lib/components/icons/RegenLogoIcon';
import DiscordIcon from 'web-components/lib/components/icons/social/DiscordIcon';
import TelegramIcon from 'web-components/lib/components/icons/social/TelegramIcon';
import WhitepaperIcon from 'web-components/lib/components/icons/WhitepaperIcon';
import { Theme } from 'web-components/lib/theme/muiTheme';

import ConnectSection, {
  IconLabelProps,
} from '../../components/ConnectSection';
import { ValidatorsConnectSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: '20%',
      flexBasis: '20%',
    },
  },
}));

const query = graphql`
  query validatorsConnectSection {
    background: file(relativePath: { eq: "validators-connect-bg.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityValidatorsPage {
      connectSectionHeader
    }
  }
`;

const ValidatorsConnectSection = (): JSX.Element => {
  const { background, sanityValidatorsPage: data } =
    useStaticQuery<ValidatorsConnectSectionQuery>(query);
  const classes = useStyles();
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
      label: 'Developer / validator Telegram',
    },
    {
      icon: (
        <DiscordIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://discord.gg/BDcBJu3',
      label: 'Discord community',
      small: true,
    },
    {
      icon: (
        <WhitepaperIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://github.com/regen-network/testnets#regen-ledger-testnets',
      label: 'Past testnets',
      small: true,
    },
    {
      icon: (
        <RegenLogoIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://forms.gle/U2qCRizswUvLG4M19',
      label: 'Sign up for future testnets, US only',
      small: true,
    },
    {
      icon: (
        <RegenLogoIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://forms.gle/CZRfbXjdp6gctF5m9',
      label: 'Sign up for future testnets, non-US',
      small: true,
    },
  ];
  return (
    <ConnectSection
      itemClassName={classes.item}
      header={data?.connectSectionHeader || ''}
      background={background as any} // TODO fix this type
      icons={icons}
    />
  );
};

export default ValidatorsConnectSection;
