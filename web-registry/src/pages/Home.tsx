import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { Box, CardMedia, useMediaQuery } from '@mui/material';

import Section from 'web-components/lib/components/section';
import Modal from 'web-components/lib/components/modal';
import { Loading } from 'web-components/lib/components/loading';
import Title from 'web-components/lib/components/title';
import { BlockContent } from 'web-components/lib/components/block-content';

import { SanityButton } from '../components/atoms';
import { BackgroundImgSection, HeroAction } from '../components/molecules';
import {
  ProjectCards,
  CreditClassCards,
  CreditBatches,
} from '../components/organisms';
import { creditClasses } from '../mocks';

import topographyImg from '../assets/background-contour-1.jpg';
import horsesImg from '../assets/horses-grazing.png';

import { client } from '../sanity';
import {
  useAllHomePageQuery,
  useAllCreditClassQuery,
} from '../generated/sanity-graphql';
import { useMoreProjectsQuery } from '../generated/graphql';

const useStyles = makeStyles(theme => ({
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(22.25),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(17.75),
    },
  },
  title: {
    marginBottom: theme.spacing(8.75),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(8),
    },
  },
  projectCards: {
    [theme.breakpoints.down('md')]: {
      width: '100vw',
      marginLeft: theme.spacing(-8),
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(-4),
    },
  },
  bottomSectionWidth: {
    maxWidth: theme.spacing(175),
  },
  bottomSection: {
    display: 'flex',
    justifyContent: 'center',
  },
  modal: {
    padding: 0,
    overflow: 'hidden',
  },
}));

const Home: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [modalLink, setModalLink] = useState<string>('');

  const styles = useStyles();
  const theme = useTheme();

  const { data, loading: loadingSanity } = useAllHomePageQuery({ client });
  const { data: creditClassData } = useAllCreditClassQuery({ client });
  const content = data?.allHomePage?.[0];
  const heroSection = content?.heroSection;

  const creditClassesContent = creditClassData?.allCreditClass;
  const { data: projectsData } = useMoreProjectsQuery();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const anchor = window.location.hash.slice(1);
    if (anchor) {
      const anchorEl = document.getElementById(anchor);
      if (anchorEl) {
        anchorEl.scrollIntoView();
      }
    }
  }, []);

  if (loadingSanity) return <Loading sx={{ minHeight: '100vh' }} />;

  return (
    <Box sx={{ backgroundColor: 'primary.main' }}>
      <BackgroundImgSection
        img={heroSection?.background?.image?.asset?.url || ''}
        classes={{ section: styles.section }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            pt: { xs: 8, sm: 15 },
          }}
        >
          <Box sx={{ pr: 4, maxWidth: '585px' }}>
            <Title
              variant="h1"
              sx={{
                color: 'primary.main',
                lineHeight: { xs: '140%', sm: '130%' },
              }}
            >
              {heroSection?.title}
            </Title>
            <BlockContent
              content={heroSection?.bodyRaw}
              sxWrap={{
                color: 'primary.main',
                fontSize: { xs: 16, sm: 22 },
                lineHeight: '150%',
              }}
            />
            <SanityButton
              size="large"
              btn={heroSection?.button}
              sx={{ mt: { xs: 4, sm: 4 } }}
            />
          </Box>
          <Box
            sx={{
              alignSelf: 'center',
              maxWidth: { xs: '187px', sm: '100%' },
            }}
          >
            <img
              loading="lazy"
              style={{ width: '100%' }}
              src={heroSection?.icon?.image?.asset?.url || ''}
              alt={heroSection?.icon?.imageAlt || 'icon'}
            />
          </Box>
        </Box>
      </BackgroundImgSection>

      {projectsData?.allProjects?.nodes && (
        <div id="projects">
          <Section
            title="Featured Projects"
            titleAlign="center"
            classes={{ root: styles.section, title: styles.title }}
          >
            <ProjectCards
              projects={projectsData?.allProjects?.nodes}
              classes={{ root: styles.projectCards }}
            />
          </Section>
        </div>
      )}

      <CardMedia image={topographyImg}>
        <CreditBatches />
      </CardMedia>

      <Section
        title="Credit Classes"
        classes={{ root: styles.section, title: styles.title }}
      >
        <CreditClassCards
          btnText="Learn More"
          justifyContent={isMobile ? 'center' : 'flex-start'}
          creditClasses={creditClasses} // mock/db data
          creditClassesContent={creditClassesContent} // CMS data
        />
      </Section>

      <HeroAction
        isBanner
        classes={{
          main: styles.bottomSectionWidth,
          section: styles.bottomSection,
        }}
        img={horsesImg}
        openModal={(href: string): void => {
          setModalLink(href);
          setOpen(true);
        }}
        bottomBanner={content?.bottomBanner}
      />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={styles.modal}
      >
        <iframe title="airtable-signup-form" src={modalLink} />
      </Modal>
    </Box>
  );
};

export { Home };
