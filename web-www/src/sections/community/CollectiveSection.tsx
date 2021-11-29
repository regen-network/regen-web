import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles, useTheme } from '@mui/styles';
import clsx from 'clsx';
import BackgroundImage from 'gatsby-background-image';
import { GatsbyImageData } from 'gatsby-plugin-image';
import ReactHtmlParser from 'react-html-parser';

import Section from 'web-components/src/components/section';
import Modal from 'web-components/lib/components/modal';
import ContainedButton from 'web-components/src/components/buttons/ContainedButton';
import { MarketingDescription } from '../../components/Description';

const useStyles = makeStyles<Theme>(theme => ({
  section: {
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    [theme.breakpoints.up('xs')]: {
      paddingBottom: theme.spacing(22.5),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(17.75),
    },
  },
  content: {
    width: '80%',
    maxWidth: theme.spacing(236.5),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(38),
    },
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& p': {
      textAlign: 'center',
    },
  },
  modal: {
    padding: 0,
    overflow: 'hidden',
  },
}));

type QueryData = {
  bg: {
    childImageSharp: {
      gatsbyImageData: GatsbyImageData;
    };
  };
  text: {
    collectiveSection: {
      title: string;
      body: string;
      buttonText: string;
      signupFormUrl: string;
    };
  };
};

const CollectiveSection = (): JSX.Element => {
  const styles = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const {
    bg: {
      childImageSharp: { fluid },
    },
    text: {
      collectiveSection: { title, body, buttonText, signupFormUrl },
    },
  } = useStaticQuery<QueryData>(graphql`{
  bg: file(relativePath: {eq: "topo-bg-portrait.jpg"}) {
    childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
    }
  }
  text: communityYaml {
    collectiveSection {
      title
      body
      buttonText
      signupFormUrl
    }
  }
}
`);
  const topo = fluid;

  return (
    <BackgroundImage fluid={topo}>
      <Section title={title} classes={{ root: clsx(styles.section, styles.center), title: styles.title }}>
        <MarketingDescription className={clsx(styles.content, styles.center)}>
          {ReactHtmlParser(body)}
        </MarketingDescription>
        <ContainedButton onClick={() => setOpen(true)}>{buttonText}</ContainedButton>
      </Section>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={styles.modal}
        closeIconColor={theme.palette.info.light}
      >
        <iframe title="collective-signup-form" src={signupFormUrl} />
      </Modal>
    </BackgroundImage>
  );
};

export default CollectiveSection;
