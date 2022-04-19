import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { graphql, useStaticQuery } from 'gatsby';
import clsx from 'clsx';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';
import { TokenPoolQuery } from '../../generated/graphql';
import SanityImage from 'gatsby-plugin-sanity-image';
import { BodyText, Title } from 'web-components/lib/components/typography';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  center: {
    alignItems: 'center',
    textAlign: 'center',
  },
  content: {
    width: '80%',
    maxWidth: theme.spacing(236.5),
    margin: theme.spacing(4, 0, 8),
  },
  image: {
    width: '100%',
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
}));

const query = graphql`
  query TokenPool {
    sanityTokenPage {
      poolSection {
        title
        subtitle
        image {
          ...Image
        }
        mobileImage {
          ...Image
        }
      }
    }
  }
`;

const TokenEconomics = (): JSX.Element => {
  const styles = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { sanityTokenPage } = useStaticQuery<TokenPoolQuery>(query);
  const data = sanityTokenPage?.poolSection;

  return isMobile ? (
    <div className={styles.root}>
      <SanityImage className={styles.image} {...(data?.mobileImage as any)} />
    </div>
  ) : (
    <Section
      title={
        <Title variant="h2" mobileVariant="h3">
          {data?.title}
        </Title>
      }
      classes={{ root: clsx(styles.root, styles.center), title: styles.title }}
    >
      <BodyText
        sx={{
          width: ['100%', '80%'],
          maxWidth: 946,
          mt: 4,
          mb: 8,
          textAlign: 'center',
        }}
      >
        {data?.subtitle}
      </BodyText>
      <SanityImage className={styles.image} {...(data?.image as any)} />
    </Section>
  );
};
export default TokenEconomics;
