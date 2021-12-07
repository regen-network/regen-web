import React from 'react';
import { makeStyles } from '@mui/styles';
import { useStaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';
import Title from 'web-components/lib/components/title';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import DecentralizeIcon from 'web-components/lib/components/icons/DecentralizeIcon';
import { MarketingDescription as Description } from '../../components/Description';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(30, 0),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(22, 0),
    },
    '& a': {
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
  button: {
    textAlign: 'center',
    width: theme.spacing(90),
  },
  title: {
    maxWidth: theme.spacing(172),
    color: theme.palette.primary.main,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(38),
      padding: theme.spacing(9.5, 0),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(32),
      padding: theme.spacing(7.5, 0),
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  description: {
    color: theme.palette.primary.main,
    fontSize: theme.spacing(5.75),
    textAlign: 'center',
    '& a': {
      color: theme.palette.secondary.light,
      '&:link': {
        textDecoration: 'underline',
      },
    },
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(9.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(5),
      padding: theme.spacing(0, 4, 7),
    },
  },
}));

const BlockExplorerSection = (): JSX.Element => {
  const styles = useStyles();
  const data = useStaticQuery(graphql`{
  background: file(relativePath: {eq: "stones-bg.png"}) {
    childImageSharp {
      fluid(quality: 90) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
  text: tokenYaml {
    blockExplorerSection {
      header
      description
      buttonText
      buttonUrl
    }
  }
}
`);
  const content = data.text.blockExplorerSection;
  const imageData = data.background.childImageSharp.fluid;

  return (
    <BackgroundImage Tag="div" fluid={imageData}>
      <Section classes={{ root: styles.root }}>
        <div className={styles.content}>
          <DecentralizeIcon />
          <Title className={styles.title}>{content.header}</Title>
          <Description className={styles.description}>{content.description}</Description>
          <ContainedButton className={styles.button} href={content.buttonUrl} target="_blank">
            {content.buttonText}
          </ContainedButton>
        </div>
      </Section>
    </BackgroundImage>
  );
};

export default BlockExplorerSection;
