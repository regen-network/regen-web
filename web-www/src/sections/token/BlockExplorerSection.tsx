import React from 'react';
import { makeStyles } from '@mui/styles';
import { useStaticQuery, graphql } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';
import { Body, Title } from 'web-components/lib/components/typography';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import DecentralizeIcon from 'web-components/lib/components/icons/DecentralizeIcon';
import { TokenBlockExplorerSectionQuery } from '../../generated/graphql';
import { FluidObject } from 'gatsby-image';
import { BlockContent } from 'web-components/src/components/block-content';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(30, 0),
    },
    [theme.breakpoints.down('sm')]: {
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
    width: theme.spacing(90),
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const query = graphql`
  query tokenBlockExplorerSection {
    background: file(relativePath: { eq: "stones-bg.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityTokenPage {
      blockExplorerSection {
        title
        _rawBody
        button {
          buttonText
          buttonLink {
            buttonHref
          }
        }
      }
    }
  }
`;
const BlockExplorerSection = (): JSX.Element => {
  const styles = useStyles();
  const { background, sanityTokenPage } =
    useStaticQuery<TokenBlockExplorerSectionQuery>(query);
  const data = sanityTokenPage?.blockExplorerSection;
  const imageData = background?.childImageSharp?.fluid;

  return (
    <BackgroundImage Tag="div" fluid={imageData as FluidObject}>
      <Section classes={{ root: styles.root }}>
        <div className={styles.content}>
          <DecentralizeIcon />
          <Title
            variant="h2"
            mobileVariant="h3"
            sx={{
              color: 'primary.main',
              maxWidth: theme => theme.spacing(172),
              py: [7.5, 9.5],
            }}
          >
            {data?.title}
          </Title>
          <Body
            size="xl"
            align="center"
            sx={{ color: 'primary.main', px: [5, 0], pb: [7, 9.5] }}
          >
            <BlockContent content={data?._rawBody} />
          </Body>
          <ContainedButton
            size="large"
            className={styles.button}
            href={data?.button?.buttonLink?.buttonHref || ''}
            target="_blank"
          >
            {data?.button?.buttonText || ''}
          </ContainedButton>
        </div>
      </Section>
    </BackgroundImage>
  );
};

export default BlockExplorerSection;
