import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ContainedButton from '@regen-network/web-components/lib/components/buttons/ContainedButton';
import Modal from '@regen-network/web-components/lib/components/modal';
import Section from '@regen-network/web-components/lib/components/section';
import {
  Body,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { BlockContent } from '@regen-network/web-components/lib/components/block-content';
import clsx from 'clsx';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import { FluidObject } from 'gatsby-image';

import { CommunityCollectiveSectionQuery } from '../../generated/graphql';

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
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& p': {
      textAlign: 'center',
    },
  },
}));

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

  const { bg, sanityCommunityPage } =
    useStaticQuery<CommunityCollectiveSectionQuery>(query);
  const data = sanityCommunityPage?.collectiveSection;

  return (
    <BackgroundImage fluid={bg?.childImageSharp?.fluid as FluidObject}>
      <Section
        title={<Title variant="h2">{data?.title}</Title>}
        classes={{
          root: clsx(styles.section, styles.center),
          title: styles.title,
        }}
      >
        <Body
          as="div"
          size="xl"
          mobileSize="md"
          sx={{
            width: ['100%', '80%'],
            pb: 7,
            pt: 4,
            maxWidth: 946,
          }}
        >
          <BlockContent content={data?._rawBody} sx={{ color: 'info.dark' }} />
        </Body>
        <ContainedButton size="large" onClick={() => setOpen(true)}>
          {data?.buttonText}
        </ContainedButton>
      </Section>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeIconColor={theme.palette.info.light}
        isIFrame
      >
        <iframe
          title="collective-signup-form"
          src={data?.signupFormUrl || ''}
        />
      </Modal>
    </BackgroundImage>
  );
};

export default CollectiveSection;
