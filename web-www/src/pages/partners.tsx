import React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import GreenCard from '@regen-network/web-components/lib/components/cards/GreenCard';
import GreenMediaCard from '@regen-network/web-components/lib/components/cards/GreenMediaCard';
import Section from '@regen-network/web-components/lib/components/section';
import {
  Body,
  Title,
} from '@regen-network/web-components/lib/components/typography';
import { Theme } from '@regen-network/web-components/lib/theme/muiTheme';
import { BlockContent } from '@regen-network/web-components/lib/components/block-content';
import clsx from 'clsx';
import { graphql, PageProps, useStaticQuery } from 'gatsby';

import SEO from '../components/seo';
import { PartnersPageQuery } from '../generated/graphql';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(42.25),
      paddingBottom: theme.spacing(40.5),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(22.5),
      paddingTop: theme.spacing(7.5),
    },
    backgroundColor: theme.palette.grey[50],
    overflow: 'hidden',
  },
  sectionWrapper: {
    width: '100%',
    backgroundColor: theme.palette.grey[50],
  },
  item: {
    width: theme.spacing(90.25),
    height: theme.spacing(62.5),
    textAlign: 'center',
  },
  card: {
    '& img': {
      padding: theme.spacing(7.5),
    },
  },
  contactCard: {
    '& h4.MuiTypography-root, p.MuiTypography-root': {
      color: theme.palette.info.dark,
    },
    backgroundColor: theme.palette.info.light,
    padding: theme.spacing(4.5),
    borderTop: `10px ${theme.palette.secondary.contrastText} solid`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderLeft: `0.5px ${theme.palette.grey[100]} solid`,
    borderRight: `0.5px ${theme.palette.grey[100]} solid`,
    borderBottom: `0.5px ${theme.palette.grey[100]} solid`,
    '& a': {
      color: theme.palette.secondary.main,
      textDecoration: 'none',
    },
  },
  contactText: {
    fontSize: theme.spacing(4.5),
    paddingTop: theme.spacing(3.25),
  },
}));

const query = graphql`
  query partnersPage {
    sanityPartnersPage {
      header
      contactHeader
      _rawContactBody
      partners {
        link
        image {
          asset {
            url
          }
        }
      }
    }
  }
`;

const PartnersPage: React.FC<PageProps> = ({ location }) => {
  const { sanityPartnersPage: data } = useStaticQuery<PartnersPageQuery>(query);
  const styles = useStyles();
  return (
    <>
      <SEO title="Partners" location={location} />
      <div className={styles.sectionWrapper}>
        <Section className={styles.section}>
          <Title
            align="center"
            variant="h1"
            sx={{ pb: { xs: 7.5, sm: 21.75 } }}
          >
            {data?.header}
          </Title>
          <Grid
            spacing={7}
            justifyContent="center"
            direction="row"
            alignItems="center"
            container
          >
            {data?.partners?.map((partner, i) => (
              <Grid className={styles.item} xs={12} sm={4} item key={i}>
                <GreenMediaCard
                  className={styles.card}
                  imageUrl={partner?.image?.asset?.url || ''}
                  link={partner?.link || ''}
                />
              </Grid>
            ))}
            <Grid
              className={styles.item}
              xs={12}
              sm={6}
              md={4}
              item
              key="contact"
            >
              <GreenCard className={clsx(styles.card, styles.contactCard)}>
                <Title align="center" variant="h4">
                  {data?.contactHeader}
                </Title>
                <Body as="div" size="lg" pt={3.25}>
                  <BlockContent content={data?._rawContactBody} />
                </Body>
              </GreenCard>
            </Grid>
          </Grid>
        </Section>
      </div>
    </>
  );
};

export default PartnersPage;
