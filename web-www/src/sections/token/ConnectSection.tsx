import React from 'react';
import { useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { graphql, useStaticQuery } from 'gatsby';

import DiscordIcon from '@regen-network/web-components/lib/components/icons/social/DiscordIcon';
import TelegramIcon from '@regen-network/web-components/lib/components/icons/social/TelegramIcon';
import TwitterIcon from '@regen-network/web-components/lib/components/icons/social/TwitterIcon';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';

import ConnectSection, {
  IconLabelProps,
} from '../../components/ConnectSection';
import { TokenConnectSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  connect: {
    marginTop: theme.spacing(24),
  },
}));

const query = graphql`
  query tokenConnectSection {
    background: file(relativePath: { eq: "birds-background.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityTokenPage {
      connectSectionHeader
    }
  }
`;

const TokenConnectSection = (): JSX.Element => {
  const { background, sanityTokenPage: data } =
    useStaticQuery<TokenConnectSectionQuery>(query);
  const styles = useStyles();
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
      label: 'Telegram',
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
      smallSvg: true,
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
  ];
  return (
    <ConnectSection
      className={styles.connect}
      header={data?.connectSectionHeader || ''}
      background={background as any} // TODO fix this type - should be able to use `FluidObject`
      icons={icons}
    />
  );
};

export default TokenConnectSection;
