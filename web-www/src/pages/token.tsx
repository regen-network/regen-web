import React from 'react';
import { useStaticQuery, graphql, PageProps } from 'gatsby';
import { makeStyles, DefaultTheme as Theme } from '@mui/styles';

import SEO from '../components/seo';
import TopSection from '../sections/token/TopSection';
import TokenEconomics from '../sections/token/TokenEconomics';
import InfoSection from '../sections/token/InfoSection';
import Staking from '../sections/token/Staking';
import BlockExplorerSection from '../sections/token/BlockExplorerSection';
import ConnectSection from '../sections/token/ConnectSection';
import MediaSection from '../sections/token/MediaSection';
import TokenDetails from '../sections/token/TokenDetails';
import EmailSubmitSection from '../sections/shared/EmailSubmitSection';

const useStyles = makeStyles((theme: Theme) => ({
  newsletterTitle: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
}));

const TokenPage = ({ location }: PageProps): JSX.Element => {
  const styles = useStyles();
  const data = useStaticQuery(graphql`
    query {
      seoImage: file(relativePath: { eq: "token-aurora.png" }) {
        publicURL
      }
      emailImage: file(relativePath: { eq: "deer-newsletter-bg.png" }) {
        childImageSharp {
          fluid(quality: 90) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      text: tokenYaml {
        seo {
          title
          description
        }
        newsletterSection {
          header
          buttonText
          inputText
        }
      }
    }
  `);
  const newsletterContent = data?.text?.newsletterSection;

  return (
    <>
      <SEO
        description={data?.text?.seo?.description}
        title={data?.text?.seo?.title}
        location={location}
        imageUrl={data?.seoImage?.publicURL}
      />
      <TopSection />
      <TokenEconomics />
      <InfoSection />
      <TokenDetails />
      <BlockExplorerSection />
      <Staking />
      <ConnectSection />
      <MediaSection />
      <EmailSubmitSection
        classes={{ title: styles.newsletterTitle }}
        image={data?.emailImage?.childImageSharp?.fluid}
        altContent={{
          header: newsletterContent?.header,
          buttonText: newsletterContent?.buttonText,
          inputText: newsletterContent?.inputText,
        }}
      />
    </>
  );
};

export default TokenPage;
