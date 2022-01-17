import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles, useTheme } from '@material-ui/core/styles';

import ConnectSection, { IconLabelProps } from '../../components/ConnectSection';
import RegenLogoIcon from 'web-components/lib/components/icons/RegenLogoIcon';
import DiscordIcon from 'web-components/lib/components/icons/social/DiscordIcon';
import GithubIcon from 'web-components/lib/components/icons/social/GithubIcon';
import WhitepaperIcon from 'web-components/lib/components/icons/WhitepaperIcon';
import DocumentIcon from 'web-components/lib/components/icons/DocumentIcon';
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

  const { sanityDevelopersPage: data, background } = useStaticQuery<DevInvolvedSectionQuery>(query);
  const icons: IconLabelProps[] = [
    {
      icon: <GithubIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://github.com/regen-network/',
      label: 'Checkout the Code',
    },
    {
      icon: <WhitepaperIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://docs.google.com/document/d/1-CRfpZgPxiaZB4nhMwKKkeWbLDI5dYc0hmGwnGkCHP4/edit',
      label: 'Our RFC process',
      small: true,
    },
    {
      icon: <RegenLogoIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://www.notion.so/Regen-Network-Roadmap-b804e0d0af7b485ea89c9a723328fd65',
      label: 'View our Roadmap',
      small: true,
    },
    {
      icon: <DiscordIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://discord.gg/BDcBJu3',
      label: 'Chat with us on Discord',
      small: true,
    },
    {
      icon: <WhitepaperIcon color={theme.palette.primary.main} hoverColor={theme.palette.secondary.main} />,
      href: 'https://docs.regen.network',
      label: 'Developer Docs',
      small: true,
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
