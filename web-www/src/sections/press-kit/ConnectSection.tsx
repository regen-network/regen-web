import React from 'react';
import { useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import EmailIcon from '@regen-network/web-components/lib/components/icons/EmailIcon';
import DiscordIcon from '@regen-network/web-components/lib/components/icons/social/DiscordIcon';
import FacebookIcon from '@regen-network/web-components/lib/components/icons/social/FacebookIcon';
import GithubIcon from '@regen-network/web-components/lib/components/icons/social/GithubIcon';
import LinkedInIcon from '@regen-network/web-components/lib/components/icons/social/LinkedInIcon';
import MediumIcon from '@regen-network/web-components/lib/components/icons/social/MediumIcon';
import TelegramIcon from '@regen-network/web-components/lib/components/icons/social/TelegramIcon';
import TwitterIcon from '@regen-network/web-components/lib/components/icons/social/TwitterIcon';
import YoutubeIcon from '@regen-network/web-components/lib/components/icons/social/YoutubeIcon';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';

import ConnectSection, {
  IconLabelProps,
} from '../../components/ConnectSection';
import { PresskitConnectSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: '20%',
      flexGrow: '20%',
    },
  },
}));

const query = graphql`
  query presskitConnectSection {
    background: file(relativePath: { eq: "press-kit-connect-bg.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityPresskitPage {
      connectSectionHeader
    }
  }
`;

const PressKitConnectSection = (): JSX.Element => {
  const { sanityPresskitPage: data, background } =
    useStaticQuery<PresskitConnectSectionQuery>(query);
  const theme = useTheme();
  const styles = useStyles();
  const icons: IconLabelProps[] = [
    {
      icon: (
        <TelegramIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://t.me/regennetwork_public',
      label: 'Telegram for General Updates',
    },
    {
      icon: (
        <TelegramIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://t.me/regennetworkdevannounce',
      label: 'Telegram for Developers',
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
        <YoutubeIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://www.youtube.com/channel/UCICD2WukTY0MbQdQ9Quew3g',
      label: 'Youtube',
      smallSvg: true,
    },
    {
      icon: (
        <LinkedInIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://www.linkedin.com/company/regen-network',
      label: 'LinkedIn',
    },
    {
      icon: (
        <FacebookIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://facebook.com/weareregennetwork',
      label: 'Facebook',
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
    {
      icon: (
        <EmailIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'http://newsletter.regen.network/',
      label: 'Sign up for our newsletter',
      smallSvg: true,
    },
  ];
  return (
    <ConnectSection
      isCompact
      itemClassName={styles.item}
      header={data?.connectSectionHeader || ''}
      background={background as any}
      icons={icons}
    />
  );
};

export default PressKitConnectSection;
