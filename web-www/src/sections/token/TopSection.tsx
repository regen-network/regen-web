import React from 'react';
import { makeStyles } from '@mui/styles';
import { graphql, useStaticQuery } from 'gatsby';

import { Title } from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';

import BackgroundSection from '../../components/BackgroundSection';
import { TokenTopSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  section: props => ({
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 'none',
      paddingRight: 'none',
    },
  }),
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  token: {
    width: 70,
    height: 70,
    marginRight: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(2),
    },
  },
}));

const query = graphql`
  query tokenTopSection {
    background: file(relativePath: { eq: "token-aurora.png" }) {
      childImageSharp {
        fluid(quality: 90) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityTokenPage {
      topSection {
        title
        body
      }
    }
  }
`;

const TopSection = (): JSX.Element => {
  const styles = useStyles();
  const { background, sanityTokenPage } =
    useStaticQuery<TokenTopSectionQuery>(query);
  const data = sanityTokenPage?.topSection;

  return (
    <BackgroundSection
      className={styles.section}
      linearGradient="linear-gradient(180deg, #000000 6.73%, rgba(0, 0, 0, 0) 30.65%), linear-gradient(209.83deg, rgba(250, 235, 209, 0.8) 11.05%, rgba(125, 201, 191, 0.8) 43.17%, rgba(81, 93, 137, 0.8) 75.29%)"
      header={
        <div className={styles.header}>
          <img
            src="../media/regen-token.svg"
            className={styles.token}
            alt="Regen token"
            title="Regen Token"
          />
          <Title color="primary" variant="h1">
            {data?.title}
          </Title>
        </div>
      }
      body={data?.body}
      imageData={background?.childImageSharp?.fluid}
    />
  );
};

export default TopSection;
