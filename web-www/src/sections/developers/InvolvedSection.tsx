import React from 'react';
import { useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import RegenLogoIcon from '@regen-network/web-components/lib/components/icons/RegenLogoIcon';
import DiscordIcon from '@regen-network/web-components/lib/components/icons/social/DiscordIcon';
import GithubIcon from '@regen-network/web-components/lib/components/icons/social/GithubIcon';
import WhitepaperIcon from '@regen-network/web-components/lib/components/icons/WhitepaperIcon';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';

import ConnectSection, {
  IconLabelProps,
} from '../../components/ConnectSection';
import { DevInvolvedSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 'normal',
    fontFamily: theme.typography.overline.fontFamily,
  },
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(24),
    },
  },
}));

const query = graphql`
  query devInvolvedSection {
    background: file(relativePath: { eq: "developers-involved-bg.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityDevelopersPage {
      involvedSectionHeader
    }
  }
`;

const InvolvedSection = (): JSX.Element => {
  const styles = useStyles();
  const theme = useTheme();

  const { sanityDevelopersPage: data, background } =
    useStaticQuery<DevInvolvedSectionQuery>(query);
  const icons: IconLabelProps[] = [
    {
      icon: (
        <GithubIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://github.com/regen-network/',
      label: 'Checkout the Code',
    },
    {
      icon: (
        <WhitepaperIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://docs.google.com/document/d/1-CRfpZgPxiaZB4nhMwKKkeWbLDI5dYc0hmGwnGkCHP4/edit',
      label: 'Our RFC process',
      smallSvg: true,
    },
    {
      icon: (
        <RegenLogoIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://www.notion.so/Regen-Network-Roadmap-b804e0d0af7b485ea89c9a723328fd65',
      label: 'View our Roadmap',
      smallSvg: true,
    },
    {
      icon: (
        <DiscordIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://discord.gg/BDcBJu3',
      label: 'Chat with us on Discord',
      smallSvg: true,
    },
    {
      icon: (
        <WhitepaperIcon
          color={theme.palette.primary.main}
          hoverColor={theme.palette.secondary.main}
        />
      ),
      href: 'https://docs.regen.network',
      label: 'Developer Docs',
      smallSvg: true,
    },
  ];
  return (
    <ConnectSection
      header={`${data?.involvedSectionHeader}`}
      background={background as any}
      icons={icons}
      titleClassName={styles.title}
      className={styles.section}
    />
  );
};

export default InvolvedSection;
