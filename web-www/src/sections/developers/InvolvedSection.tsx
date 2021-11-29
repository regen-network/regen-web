import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { DefaultTheme as Theme, makeStyles, useTheme } from '@mui/styles';

import ConnectSection, { IconLabelProps } from '../../components/ConnectSection';
import RegenLogoIcon from 'web-components/lib/components/icons/RegenLogoIcon';
import DiscordIcon from 'web-components/lib/components/icons/social/DiscordIcon';
import GithubIcon from 'web-components/lib/components/icons/social/GithubIcon';
import WhitepaperIcon from 'web-components/lib/components/icons/WhitepaperIcon';

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

const InvolvedSection = (): JSX.Element => {
  const data = useStaticQuery(graphql`{
  background: file(relativePath: {eq: "developers-involved-bg.png"}) {
    childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
    }
  }
  text: developersYaml {
    involvedSection {
      header
    }
  }
}
`);
  const content = data.text.involvedSection;
  const classes = useStyles();
  const theme = useTheme();
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
  ];
  return (
    <ConnectSection
      header={content.header}
      background={data.background}
      icons={icons}
      titleClassName={classes.title}
      className={classes.section}
    />
  );
};

export default InvolvedSection;
