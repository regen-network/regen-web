import React, { useState } from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import CardMedia from '@mui/material/CardMedia';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Theme } from 'web-components/lib/theme/muiTheme';
import Section from 'web-components/lib/components/section';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import FixedFooter from 'web-components/lib/components/fixed-footer';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';
import Modal from 'web-components/lib/components/modal';

import { HeroTitle, HeroAction } from '../components/molecules';
import { StepCardsWithDescription } from '../components/organisms';
import { WrappedImpactCard } from '../components/atoms';
import { WrappedResourcesCard } from '../components/atoms';

import fernImg from '../assets/fern-in-hands.png';
// import writingOnPaperImg from '../assets/writing-on-paper.png';
import topographyImg from '../assets/topography-pattern-full-1.png';

import { useAllCreateMethodologyPageQuery } from '../generated/sanity-graphql';
import { client } from '../sanity';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.primary.main,
  },
  heroMain: {
    maxWidth: theme.typography.pxToRem(744),
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(22),
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(12),
    },
  },
  topSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  topSectionCards: {
    maxWidth: theme.typography.pxToRem(942),
  },
  outcomeSection: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(25),
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(20),
    },
  },
  resourcesSection: {
    background: theme.palette.grey[50],
    borderTop: `1px solid ${theme.palette.grey[100]}`,
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    paddingBottom: theme.spacing(22.25),
    [theme.breakpoints.down('sm')]: {
      paddingBottom: theme.spacing(17.75),
    },
  },
  methodologyTitle: {
    marginBottom: theme.spacing(8.75),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(8),
      fontSize: theme.typography.pxToRem(32),
      lineHeight: theme.typography.pxToRem(41.6),
    },
  },
  bottomSection: {
    maxWidth: theme.typography.pxToRem(946),
    paddingBottom: theme.typography.pxToRem(100),
  },
  resourcesTitle: {
    textTransform: 'none',
    color: theme.palette.text.primary,
    fontWeight: 900,
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
  resourcesRoot: {
    paddingTop: 0,
  },
  modal: {
    padding: 0,
    overflow: 'hidden',
  },
}));

const CreateMethodology: React.FC = () => {
  const styles = useStyles();
  const theme = useTheme<Theme>();
  const [open, setOpen] = useState(false);
  const [modalLink, setModalLink] = useState<string>();

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const resourceCardsShown = isDesktop ? 3 : 2;

  const { data } = useAllCreateMethodologyPageQuery({ client });
  const content = data?.allCreateMethodologyPage?.[0];

  const openModal = (href?: string | null): void => {
    setModalLink(href || undefined);
    setOpen(true);
  };

  const outcomeCards = content?.outcomes?.map(outcome => (
    <WrappedImpactCard outcome={outcome} />
  ));

  return (
    <div className={styles.root}>
      <HeroTitle
        isBanner
        img={fernImg}
        title={content?.heroSection?.title}
        descriptionRaw={content?.heroSection?.descriptionRaw}
        classes={{ main: styles.heroMain }}
      />

      <Section
        title={content?.stepCardSection?.title || ''}
        classes={{ root: styles.topSection, title: styles.methodologyTitle }}
      >
        <StepCardsWithDescription
          className={styles.topSectionCards}
          openModal={openModal}
          stepCards={content?.stepCardSection?.stepCards}
          descriptionRaw={content?.stepCardSection?.descriptionRaw}
          bottomDescription={{
            title: content?.outcomeSection?.title || '',
            body: content?.outcomeSection?.descriptionRaw,
          }}
        />
      </Section>

      <Section withSlider className={styles.outcomeSection}>
        <ResponsiveSlider
          itemWidth="90%"
          padding={theme.spacing(2.5)}
          title="Ecological outcomes"
          arrows={content?.outcomes ? content.outcomes.length > 3 : false}
          slidesToShow={3}
          items={outcomeCards}
        />
      </Section>

      <CardMedia image={topographyImg} className={styles.resourcesSection}>
        <Section withSlider titleAlign="left">
          <ResponsiveSlider
            infinite={false}
            itemWidth="90%"
            classes={{
              title: styles.resourcesTitle,
              root: styles.resourcesRoot,
            }}
            padding={theme.spacing(2.5)}
            title="Resources"
            titleVariant="h2"
            arrows={
              content?.resources
                ? content.resources.length > resourceCardsShown
                : false
            }
            slidesToShow={resourceCardsShown}
            items={content?.resources?.map(resource => (
              <WrappedResourcesCard resource={resource} />
            ))}
          />
        </Section>
      </CardMedia>

      <HeroAction
        classes={{ main: styles.bottomSection }}
        bottomBanner={content?.peerReviewSection}
        openModal={openModal}
      />

      {/* <HeroAction
        isBanner
        classes={{ main: styles.bottomSection }}
        img={writingOnPaperImg}
        bottomBanner={content?.createCreditClassSection}
        openModal={openModal}
      /> */}
      <FixedFooter justifyContent="flex-end">
        <ContainedButton onClick={e => openModal(content?.footerLink)}>
          Submit a methodology
        </ContainedButton>
      </FixedFooter>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={styles.modal}
      >
        <iframe title="airtable-signup-form" src={modalLink} />
      </Modal>
    </div>
  );
};

export { CreateMethodology };
