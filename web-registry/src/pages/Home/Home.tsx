import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { gradients } from 'styles/gradients';

import { BlockContent } from 'web-components/lib/components/block-content';
import { Loading } from 'web-components/lib/components/loading';
import Modal from 'web-components/lib/components/modal';
import SEO from 'web-components/lib/components/seo';
import { Body, Title } from 'web-components/lib/components/typography';

import { getAllCreditClassesQuery } from 'lib/queries/react-query/sanity/getAllCreditClassesQuery/getAllCreditClassesQuery';
import { getAllHomePageQuery } from 'lib/queries/react-query/sanity/getAllHomePageQuery/getAllHomePageQuery';

import BlockContentBody from 'components/molecules/BlockContentBody';

import horsesImg from '../../assets/horses-grazing.png';
import { SanityButton } from '../../components/atoms';
import { BackgroundImgSection, HeroAction } from '../../components/molecules';
import { CreditClassCards } from '../../components/organisms';
import { client as sanityClient } from '../../sanity';
import { FeaturedProjects } from './Home.FeaturedProjects';
import { useHomeStyles } from './Home.styles';

const Home: React.FC<React.PropsWithChildren<unknown>> = () => {
  const [open, setOpen] = useState(false);
  const [modalLink, setModalLink] = useState<string>('');

  const { classes } = useHomeStyles();

  const { data: allHomePageData, isFetching: isFetchingAllHomePage } = useQuery(
    getAllHomePageQuery({ sanityClient, enabled: !!sanityClient }),
  );
  const { data: creditClassData } = useQuery(
    getAllCreditClassesQuery({ sanityClient, enabled: !!sanityClient }),
  );

  const content = allHomePageData?.allHomePage?.[0];

  const heroSection = content?.heroSection;
  const projectsSection = content?.projectsSection;
  const creditClassesSection = content?.creditClassesSection;
  const seo = content?.seo;

  const creditClassesContent = creditClassData?.allCreditClass;

  useEffect(() => {
    const anchor = window.location.hash.slice(1);
    if (anchor) {
      const anchorEl = document.getElementById(anchor);
      if (anchorEl) {
        anchorEl.scrollIntoView();
      }
    }
  }, []);

  if (isFetchingAllHomePage) return <Loading sx={{ minHeight: '100vh' }} />;

  return (
    <Box sx={{ backgroundColor: 'primary.main' }}>
      <SEO
        title={seo?.title || ''}
        description={seo?.description || ''}
        imageUrl={seo?.image?.asset?.url || ''} // TODO: specify dimensions here. See: https://www.sanity.io/docs/image-urls
        siteMetadata={{
          title: seo?.title || '',
          description: seo?.description || '',
          author: 'Regen Network Development, Inc.',
          siteUrl: window.location.href,
        }}
      />
      <BackgroundImgSection
        img={heroSection?.background?.image?.asset?.url || ''}
        linearGradient="linear-gradient(203.09deg, #000000 45.49%, #5E9078 92.1%);"
        classes={{ section: classes.section }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: [600, 600, 760],
        }}
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
          <Box sx={{ pr: [0, 4], alignSelf: 'center', maxWidth: '715px' }}>
            <Title
              variant="h1"
              sx={{
                color: 'primary.main',
                lineHeight: { xs: '140%', sm: '130%' },
              }}
            >
              <Box sx={{ display: 'inline-block' }}>
                Unlock{' '}
                <Box sx={{ display: 'inline-block', ...gradients.blueGreen }}>
                  Regenerative Finance
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'inline-block' } }}>
                  with{' '}
                  <Box sx={{ display: 'inline-block', ...gradients.blueGreen }}>
                    Regen Marketplace
                  </Box>
                </Box>
              </Box>
            </Title>
            <Body
              as="div"
              size="xl"
              mobileSize="md"
              sx={{ color: 'primary.main', my: 4 }}
            >
              <BlockContent content={heroSection?.bodyRaw} />
            </Body>
            <SanityButton
              size="large"
              btn={heroSection?.button}
              sx={{ mt: { xs: 4, sm: 4 } }}
            />
          </Box>
          <Box
            sx={{
              alignSelf: 'center',
              maxWidth: ['252px', '560px'],
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

      <FeaturedProjects
        title={projectsSection?.title || 'Featured Projects'}
        body={projectsSection?.bodyRaw}
      />

      {creditClassesContent && (
        <BackgroundImgSection
          img={'/svg/topology.svg'}
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
          title={creditClassesSection?.title || 'Credit Classes'}
          classes={{
            root: classes.creditClassBackground,
            title: classes.title,
          }}
          id="credit-classes"
        >
          {creditClassesSection?.bodyRaw && (
            <BlockContentBody body={creditClassesSection?.bodyRaw} />
          )}
          <CreditClassCards
            btnText="Learn More"
            justifyContent={['center', 'center', 'flex-start']}
            creditClassesContent={creditClassesContent} // CMS data
          />
        </BackgroundImgSection>
      )}

      <HeroAction
        isBanner
        classes={{
          main: classes.bottomSectionWidth,
          section: classes.bottomSection,
        }}
        img={horsesImg}
        openModal={(href: string): void => {
          setModalLink(href);
          setOpen(true);
        }}
        bottomBanner={content?.bottomBanner}
      />

      <Modal open={open} onClose={() => setOpen(false)} isIFrame>
        <iframe title="airtable-signup-form" src={modalLink} />
      </Modal>
    </Box>
  );
};

export { Home };
