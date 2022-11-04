import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { graphql, useStaticQuery } from 'gatsby';

import BackgroundSection from '../../components/BackgroundSection';
import { WalletAddrRegTopSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  section: props => ({
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(20),
      paddingLeft: 'none',
      paddingRight: 'none',
    },
  }),
}));

const query = graphql`
  query walletAddrRegTopSection {
    background: file(relativePath: { eq: "wallet-address-registration.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityWalletAddressRegistrationPage {
      topSection {
        title
        body
      }
    }
  }
`;

const TopSection = (): JSX.Element => {
  const styles = useStyles();
  const { background, sanityWalletAddressRegistrationPage } =
    useStaticQuery<WalletAddrRegTopSectionQuery>(query);
  const data = sanityWalletAddressRegistrationPage?.topSection;
  return (
    <BackgroundSection
      className={styles.section}
      linearGradient="linear-gradient(180deg, #FFF9EE 2.02%, rgba(255, 249, 238, 0) 37.98%), linear-gradient(209.83deg, rgba(250, 235, 209, 0.9) 11.05%, rgba(125, 201, 191, 0.9) 43.17%, rgba(81, 93, 137, 0.9) 75.29%)"
      header={data?.title || ''}
      body={data?.body || ''}
      imageData={background?.childImageSharp?.fluid}
    />
  );
};

export default TopSection;
