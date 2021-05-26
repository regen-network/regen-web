import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { useStaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import ReactHtmlParser from 'react-html-parser';

import Section from 'web-components/src/components/section';
import Title from 'web-components/src/components/title';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import DecentralizeIcon from 'web-components/src/components/icons/DecentralizeIcon';
import { TokenDescription as Description } from './Description';

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
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(8),
      padding: theme.spacing(7.5, 0),
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(9.5, 0),
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
  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "stones-bg.png" }) {
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
          <Title className={styles.title} variant="h2">
            {content.header}
          </Title>
          <Description className={styles.description}>{ReactHtmlParser(content.description)}</Description>
          <ContainedButton className={styles.button} href={content.buttonUrl} target="_blank">
            {content.buttonText}
          </ContainedButton>
        </div>
      </Section>
    </BackgroundImage>
  );
};

export default BlockExplorerSection;
