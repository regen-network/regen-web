import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { makeStyles, useTheme } from '@mui/styles';
import clsx from 'clsx';
import BackgroundImage from 'gatsby-background-image';
import { FluidObject } from 'gatsby-image';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';
import Modal from 'web-components/lib/components/modal';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import { MarketingDescription } from '../../components/Description';
import { CommunityCollectiveSectionQuery } from '../../generated/graphql';
import { BlockContent } from 'web-components/src/components/block-content';

const useStyles = makeStyles<Theme>(theme => ({
  section: {
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    [theme.breakpoints.up('xs')]: {
      paddingBottom: theme.spacing(22.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(17.75),
    },
  },
  content: {
    width: '80%',
    maxWidth: theme.spacing(236.5),
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
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
      fluid: FluidObject;
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

const query = graphql`
  query communityCollectiveSection {
    bg: file(relativePath: { eq: "topo-bg-portrait.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityCommunityPage {
      collectiveSection {
        title
        _rawBody
        buttonText
        signupFormUrl
      }
    }
  }
`;

const CollectiveSection = (): JSX.Element => {
  const styles = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const { bg, sanityCommunityPage } = useStaticQuery<CommunityCollectiveSectionQuery>(query);
  const data = sanityCommunityPage?.collectiveSection;

  return (
    <BackgroundImage fluid={bg?.childImageSharp?.fluid as FluidObject}>
      <Section
        title={data?.title || ''}
        classes={{ root: clsx(styles.section, styles.center), title: styles.title }}
      >
        <MarketingDescription className={clsx(styles.content, styles.center)}>
          <BlockContent content={data?._rawBody} />
        </MarketingDescription>
        <ContainedButton onClick={() => setOpen(true)}>{data?.buttonText}</ContainedButton>
      </Section>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={styles.modal}
        closeIconColor={theme.palette.info.light}
      >
        <iframe title="collective-signup-form" src={data?.signupFormUrl || ''} />
      </Modal>
    </BackgroundImage>
  );
};

export default CollectiveSection;
