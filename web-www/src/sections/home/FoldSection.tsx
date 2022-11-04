import React from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  Body,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import clsx from 'clsx';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import { HomeFoldSectionQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    color: theme.palette.primary.main,
    width: '100%',
    height: '90vh',
    backgroundPosition: 'bottom center',
    backgroundRepeat: 'repeat-y',
    backgroundSize: 'cover',
    [theme.breakpoints.up('sm')]: {
      paddingTop: '29vh',
      paddingBottom: '40vh',
    },
    [theme.breakpoints.down(theme.breakpoints.values.tablet)]: {
      paddingTop: '12vh',
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: '15vh',
      height: '80vh',
    },
  },
  backgroundGradient: {
    height: '100%',
    zIndex: -1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background:
      'linear-gradient(217.94deg, rgba(250, 235, 209, 0.5) 22.17%, rgba(125, 201, 191, 0.5) 46.11%, rgba(81, 93, 137, 0.5) 70.05%);',
    opacity: 0.8,
  },
}));

const query = graphql`
  query homeFoldSection {
    desktop: file(relativePath: { eq: "image43.jpg" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    sanityHomePageWeb {
      homeFoldSection {
        title
        body
      }
    }
  }
`;

const HomeFoldSection: React.FC<{ className?: string }> = ({ className }) => {
  const styles = useStyles();
  const data = useStaticQuery<HomeFoldSectionQuery>(query);
  const content = data.sanityHomePageWeb?.homeFoldSection;

  return (
    <BackgroundImage
      Tag="section"
      className={clsx(styles.root, className)}
      fluid={data?.desktop?.childImageSharp?.fluid as any}
      backgroundColor={`#040e18`}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <div className={styles.backgroundGradient}></div>
        <Title
          align="center"
          color="primary"
          variant="h1"
          sx={{
            mx: 'auto',
            maxWidth: '80%',
            mt: { xs: 13.5, sm: 21.5 },
            mb: 3,
          }}
        >
          {content?.title}
        </Title>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Body
            color="primary"
            size="xl"
            sx={{
              textAlign: 'center',
              fontSize: ['1.125rem', '1.62rem'],
              maxWidth: ['90%', 650],
              textShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            {content?.body}
          </Body>
        </Box>
      </Box>
    </BackgroundImage>
  );
};

export default HomeFoldSection;
