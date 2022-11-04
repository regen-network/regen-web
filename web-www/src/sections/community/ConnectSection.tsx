import React from 'react';
import { useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import DiscordIcon from '@regen-network/web-components/lib/components/icons/social/DiscordIcon';
import TelegramIcon from '@regen-network/web-components/lib/components/icons/social/TelegramIcon';
import TwitterIcon from '@regen-network/web-components/lib/components/icons/social/TwitterIcon';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';

import ConnectSection, {
  IconLabelProps,
} from '../../components/ConnectSection';
import { CommunityConnectSectionQuery } from '../../generated/graphql';

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
      maxWidth: '25%',
      flexBasis: '25%',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '27%',
    },
  },
}));

const query = graphql`
  query communityConnectSection {
    background: file(relativePath: { eq: "developers-connect-bg.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityCommunityPage {
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
`;
const CommunityConnectSection: React.FC = () => {
  const { background, sanityCommunityPage: data } =
    useStaticQuery<CommunityConnectSectionQuery>(query);
  const content = data?.connectSection;
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
      href: content?.telegramUrl || '',
      label: 'Telegram',
      subLabel: content?.telegramSubLabel || '',
    },

    {
      icon: (
        <TwitterIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: content?.twitterUrl || '',
      label: 'Twitter',
      subLabel: content?.twitterSubLabel || '',
    },

    {
      icon: (
        <DiscordIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: content?.discordUrl || '',
      label: 'Discord',
      subLabel: content?.discordSubLabel || '',
      smallSvg: true,
    },
  ];
  return (
    <ConnectSection
      itemClassName={styles.item}
      header={content?.header || ''}
      background={background as any}
      icons={icons}
      titleClassName={styles.title}
    />
  );
};

export default CommunityConnectSection;
