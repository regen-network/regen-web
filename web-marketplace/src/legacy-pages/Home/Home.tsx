import React, { useEffect, useState } from 'react';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react';
import { Trans } from '@lingui/react/macro';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { gradients } from 'styles/gradients';

import { BlockContent } from 'web-components/src/components/block-content';
import { Loading } from 'web-components/src/components/loading';
import Modal from 'web-components/src/components/modal';
import SEO from 'web-components/src/components/seo';
import { Body, Title } from 'web-components/src/components/typography';
import { cn } from 'web-components/src/utils/styles/cn';

import { selectedLanguageAtom } from 'lib/atoms/languageSwitcher.atoms';
import { SKIPPED_CLASS_ID } from 'lib/env';
import { getAllHomePageQuery } from 'lib/queries/react-query/sanity/getAllHomePageQuery/getAllHomePageQuery';
import { useWallet } from 'lib/wallet/wallet';

import { SanityNextImage } from 'components/atoms/SanityNextImage';
import WithLoader from 'components/atoms/WithLoader';
import BlockContentBody from 'components/molecules/BlockContentBody';

import horsesImg from '../../../public/png/horses-grazing.png';
import { SanityButton } from '../../components/atoms';
import {
  BackgroundImgSection,
  GettingStartedResourcesSection,
  HeroAction,
} from '../../components/molecules';
import { CreditClassCards } from '../../components/organisms';
import { client as sanityClient } from '../../lib/clients/apolloSanity';
import { FeaturedProjects } from './Home.FeaturedProjects';
import { useHomeStyles } from './Home.styles';
import { useCreditClasses } from './hooks/useCreditClasses';

const Home: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { _ } = useLingui();
  const [open, setOpen] = useState(false);
  const [modalLink, setModalLink] = useState<string>('');
  const [selectedLanguage] = useAtom(selectedLanguageAtom);
  const { isKeplrMobileWeb } = useWallet();

  const { classes } = useHomeStyles();

  const { data: allHomePageData, isFetching: isFetchingAllHomePage } = useQuery(
    getAllHomePageQuery({
      sanityClient,
      languageCode: selectedLanguage,
    }),
  );

  const {
    creditClasses,
    creditClassesPrograms,
    loading: creditClassesLoading,
  } = useCreditClasses({
    skippedClassId: SKIPPED_CLASS_ID,
  });

  const content = allHomePageData?.allHomePage?.[0];

  const heroSection = content?.heroSection;
  const projectsSection = content?.projectsSection;
  const creditClassesSection = content?.creditClassesSection;
  const seo = content?.seo;
  const gettingStartedResourcesSection =
    content?.gettingStartedResourcesSection;

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
          // eslint-disable-next-line lingui/no-unlocalized-strings
          author: 'Regen Network Development, PBC',
          siteUrl: window.location.href,
        }}
      />
      <BackgroundImgSection
        img={heroSection?.background?.image?.asset?.url || ''}
        linearGradient="linear-gradient(180deg, rgba(0, 0, 0, 0.30) 20.79%, rgba(0, 0, 0, 0.15) 100%)"
        classes={{
          root: 'flex items-center h-[600px] md:h-[760px]',
          section: classes.section,
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
              <Box sx={{ display: 'inline-block', maxWidth: '494px' }}>
                <Trans>
                  Connect{' '}
                  <Box sx={{ display: 'inline-block', ...gradients.blueGreen }}>
                    Capital
                  </Box>{' '}
                  to{' '}
                  <Box sx={{ display: 'inline-block', ...gradients.blueGreen }}>
                    Ecological
                  </Box>{' '}
                  Outcomes
                </Trans>
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
          {heroSection?.icon?.image && (
            <Box
              sx={{
                alignSelf: 'center',
                maxWidth: ['252px', '560px'],
              }}
            >
              <SanityNextImage
                className="w-full"
                image={heroSection?.icon?.image}
                alt={heroSection?.icon?.imageAlt || 'icon'}
              />
            </Box>
          )}
        </Box>
      </BackgroundImgSection>

      <FeaturedProjects
        title={
          projectsSection?.titleCustomBody?.title || _(msg`Featured Projects`)
        }
        body={projectsSection?.titleCustomBody?.bodyRaw}
        sanityFeaturedProjects={projectsSection?.projects}
      />

      {creditClasses && (
        <BackgroundImgSection
          title={creditClassesSection?.title || _(msg`Credit Classes`)}
          classes={{
            root: cn(
              classes.creditClassBackground,
              'flex items-center topo-background',
              isKeplrMobileWeb && 'dark',
            ),
            title: classes.title,
          }}
          id="credit-classes"
        >
          {creditClassesSection?.bodyRaw && (
            <BlockContentBody body={creditClassesSection?.bodyRaw} />
          )}
          <WithLoader
            isLoading={creditClassesLoading}
            sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <CreditClassCards
              btnText={_(msg`Learn More`)}
              justifyContent={['center', 'center', 'flex-start']}
              creditClassesContent={creditClasses} // CMS data
              creditClassesProgram={creditClassesPrograms}
            />
          </WithLoader>
        </BackgroundImgSection>
      )}

      {gettingStartedResourcesSection && (
        <GettingStartedResourcesSection
          section={gettingStartedResourcesSection}
        />
      )}

      <HeroAction
        isBanner
        classes={{
          main: classes.bottomSectionWidth,
          section: classes.bottomSection,
        }}
        img={horsesImg.src}
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
