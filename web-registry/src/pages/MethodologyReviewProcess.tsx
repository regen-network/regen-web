import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Modal from 'web-components/lib/components/modal';
import Section from 'web-components/lib/components/section';
import Title from 'web-components/lib/components/title';
import { StepCard, Step } from 'web-components/lib/components/cards/StepCard';

import { HeroTitle, HeroAction, ReviewProcessInfo, BackgroundImgSection } from '../components/molecules';
import { contentByPage } from '../mocks';

import typewriterReview from '../assets/typewriter-review.png';
import topographyImg from '../assets/topography-pattern-cutout-1.png';
import fernImg from '../assets/fern-in-hands.png';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.main,
  },
  section: {
    paddingBottom: theme.spacing(22),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  heroMain: {
    maxWidth: theme.typography.pxToRem(775),
    paddingBottom: theme.spacing(20),
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(12),
    },
  },
  heroSection: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  topoBg: {
    background: theme.palette.grey[50],
    borderTop: `1px solid ${theme.palette.grey[100]}`,
  },
  sectionContent: {
    maxWidth: theme.typography.pxToRem(924),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    margin: '0 auto',
  },
  modal: {
    padding: 0,
    overflow: 'hidden',
  },
}));

type StepCard = {
  icon: JSX.Element;
  step: Step;
};

// TODO: Once the API is connected, replace this type (it shouldn't be necessary to define it here)
type ApiCard = typeof contentByPage.HowToCreateMethodology['stepCardSections']['public']['stepCards'];
const createStepCards = (raw: ApiCard): StepCard[] =>
  raw.map(({ icon, title, btnText, href, description, isActive, stepNumber, faqs, tagName, image }) => ({
    icon: <img src={require(`../assets/${icon}`)} alt={title} />,
    step: {
      stepNumber,
      faqs,
      tagName,
      isActive,
      title,
      description,
      btnText,
      imageAlt: image && title,
      imageSrc: image ? require(`../assets/${image}`) : undefined,
      onBtnClick: href ? () => void window.open(href, '_blank', 'noopener') : undefined,
    },
  }));

const MethodologyReviewProcess: React.FC = () => {
  const styles = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const {
    heroBannerTop,
    internalReviewSection,
    externalReviewSection,
    stepCardSections,
    heroBannerBottom,
    modalContent,
  } = contentByPage.HowToCreateMethodology;

  const publicCommentCards = createStepCards(stepCardSections.public.stepCards);
  const scienceReviewCards = createStepCards(stepCardSections.scientific.stepCards);

  const StepCards: React.FC<{ title: string; stepCards: StepCard[] }> = props => (
    <>
      <Title variant="h3" align="center">
        {props.title}
      </Title>
      <Box maxWidth={theme.typography.pxToRem(753)} mt={8}>
        {props.stepCards.map((card, i) => (
          <StepCard key={i} icon={card.icon} step={card.step} />
        ))}
      </Box>
    </>
  );

  return (
    <div className={styles.root}>
      <HeroTitle
        isBanner
        img={typewriterReview}
        title={heroBannerTop.title}
        description={heroBannerTop.description}
        classes={{ main: styles.heroMain, section: styles.heroSection }}
      />

      <Section className={styles.section}>
        <div className={styles.sectionContent}>
          <ReviewProcessInfo
            title={internalReviewSection.title}
            timespan={internalReviewSection.timespan}
            description={internalReviewSection.description}
            disclaimerBottom={internalReviewSection.disclaimerBottom}
            btnText={internalReviewSection.btnText}
            onBtnClick={() => setOpen(true)}
          />
        </div>
      </Section>

      <BackgroundImgSection img={topographyImg} classes={{ root: styles.topoBg, section: styles.section }}>
        <div className={styles.sectionContent}>
          <ReviewProcessInfo
            title={externalReviewSection.title}
            timespan={externalReviewSection.timespan}
            disclaimerTop={externalReviewSection.disclaimerTop}
            disclaimerBottom={externalReviewSection.disclaimerBottom}
            description={externalReviewSection.description}
          />
          <Box display="flex" flexDirection="column" mt={[10, 20]} maxWidth={theme.typography.pxToRem(924)}>
            <StepCards title={stepCardSections.public.title} stepCards={publicCommentCards} />
            <Box mt={[12, 15]}>
              <StepCards title={stepCardSections.scientific.title} stepCards={scienceReviewCards} />
            </Box>
          </Box>
        </div>
      </BackgroundImgSection>

      <HeroAction
        isBanner
        img={fernImg}
        title={heroBannerBottom.title}
        description={heroBannerBottom.description}
        actionTxt={heroBannerBottom.btnText}
        action={() => history.push(heroBannerBottom.href)}
      />

      <Modal open={open} onClose={() => setOpen(false)} className={styles.modal}>
        <iframe title="airtable-signup-form" src={modalContent} />
      </Modal>
    </div>
  );
};

export { MethodologyReviewProcess };
