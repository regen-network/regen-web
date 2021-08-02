import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Modal from 'web-components/lib/components/modal';
import Section from 'web-components/lib/components/section';
import Title from 'web-components/lib/components/title';

import { HeroTitle, HeroAction, ReviewProcessInfo, BackgroundImgSection } from '../components/molecules';
import { WrappedStepCard } from '../components/atoms';

import typewriterReview from '../assets/typewriter-review.png';
import topographyImg from '../assets/topography-pattern-cutout-1.png';
import fernImg from '../assets/fern-in-hands.png';

import { useAllMethodologyReviewProcessPageQuery } from '../generated/sanity-graphql';
import { client } from '../sanity';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.main,
  },
  section: {
    paddingBottom: theme.spacing(22),
  },
  heroMain: {
    maxWidth: theme.typography.pxToRem(775),
    paddingBottom: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(12),
    },
  },
  topoBg: {
    background: theme.palette.grey[50],
    borderTop: `1px solid ${theme.palette.grey[100]}`,
  },
  modal: {
    padding: 0,
    overflow: 'hidden',
  },
}));

const MethodologyReviewProcess: React.FC = () => {
  const styles = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [modalLink, setModalLink] = useState<string>();
  const openModal = (href?: string | null): void => {
    setModalLink(href || undefined);
    setOpen(true);
  };

  const { data } = useAllMethodologyReviewProcessPageQuery({ client });
  const content = data?.allMethodologyReviewProcessPage?.[0];

  const MaxW924: React.FC = ({ children }) => (
    <Box display={['block', 'flex']} justifyContent="center">
      <Box maxWidth={theme.typography.pxToRem(924)}>{children}</Box>
    </Box>
  );

  return (
    <div className={styles.root}>
      <HeroTitle
        isBanner
        img={typewriterReview}
        title={content?.heroSection?.title}
        descriptionRaw={content?.heroSection?.descriptionRaw}
        classes={{ main: styles.heroMain }}
      />

      <Section className={styles.section}>
        <MaxW924>
          <ReviewProcessInfo reviewSection={content?.internalReviewSection} />
        </MaxW924>
      </Section>

      <BackgroundImgSection img={topographyImg} classes={{ root: styles.topoBg, section: styles.section }}>
        <MaxW924>
          <ReviewProcessInfo reviewSection={content?.externalReviewSection} />
        </MaxW924>
        <Box display="flex" alignSelf="center" flexDirection="column" mt={[2, 5]} mx={[-1, 'inherit']}>
          {content?.externalReviewSection?.stepCardsSubsections?.map(s => (
            <Box mt={[12, 15]}>
              <Title variant="h3" align="center">
                {s?.title}
              </Title>
              <Box maxWidth={theme.typography.pxToRem(753)} mt={8}>
                {s?.stepCards?.map((stepCard, i) => (
                  <WrappedStepCard key={i} stepNumber={i} stepCard={stepCard} openModal={openModal} />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </BackgroundImgSection>

      <HeroAction
        isBanner
        img={fernImg}
        bottomBanner={content?.bottomBanner}
        openModal={(href: string): void => {
          setModalLink(href);
          setOpen(true);
        }}
      />

      <Modal open={open} onClose={() => setOpen(false)} className={styles.modal}>
        <iframe title="airtable-signup-form" src={modalLink} />
      </Modal>
    </div>
  );
};

export { MethodologyReviewProcess };
