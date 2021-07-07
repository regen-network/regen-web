import React from 'react';
import cx from 'clsx';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Section from 'web-components/lib/components/section';
import Title from 'web-components/lib/components/title';
import { StepCard, Step } from 'web-components/lib/components/cards/StepCard';

import { HeroTitle, HeroAction, ReviewProcessInfo, BackgroundImgSection } from '../components/molecules';
import { contentByPage } from '../mocks';

import typewriterReview from '../assets/typewriter-review.png';
import topographyImg from '../assets/topography-pattern-full-1.png';
import fernImg from '../assets/fern-in-hands.png';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.primary.main,
  },
  topoBg: {
    background: theme.palette.grey[50],
    borderTop: `1px solid ${theme.palette.grey[100]}`,
  },
}));

type StepCard = {
  icon: JSX.Element;
  step: Step;
};

const openLink = (url: string): void => void window.open(url, '_blank', 'noopener');

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
      onBtnClick: href ? () => openLink(href) : undefined,
    },
  }));

const MethodologyReviewProcess: React.FC = () => {
  const styles = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const {
    heroBannerTop,
    internalReviewSection,
    externalReviewSection,
    stepCardSections,
    heroBannerBottom,
  } = contentByPage.HowToCreateMethodology;

  const publicCommentCards = createStepCards(stepCardSections.public.stepCards);
  const scienceReviewCards = createStepCards(stepCardSections.scientific.stepCards);

  /** Centered div with a `maxWidth` of `753px` */
  const CardLayout: React.FC = ({ children }) => (
    // <Box maxWidth={753} display="flex" flexDirection="column" alignItems="center" alignSelf="center">
    <Box maxWidth={753} margin="0 auto" display="flex" flexDirection="column" alignItems="center">
      {children}
    </Box>
  );

  const SectionContent: React.FC = ({ children }) => (
    <Box
      display="flex'"
      maxWidth={theme.typography.pxToRem(924)}
      paddingBottom={24}
      flexDirection="column"
      alignItems="center"
      alignSelf="center"
    >
      {children}
    </Box>
  );

  return (
    <div className={styles.root}>
      <HeroTitle
        isBanner
        img={typewriterReview}
        title={heroBannerTop.title}
        description={heroBannerTop.description}
        // classes={{ main: styles.heroMain }}
      />

      <Section>
        <SectionContent>
          <ReviewProcessInfo
            title={internalReviewSection.title}
            timespan={internalReviewSection.timespan}
            description={internalReviewSection.description}
            disclaimerBottom={internalReviewSection.disclaimerBottom}
            btnText={internalReviewSection.btnText}
            href={internalReviewSection.href}
          />
        </SectionContent>
      </Section>

      <BackgroundImgSection img={topographyImg} classes={{ root: styles.topoBg }}>
        <SectionContent>
          <ReviewProcessInfo
            title={externalReviewSection.title}
            timespan={externalReviewSection.timespan}
            disclaimerTop={externalReviewSection.disclaimerTop}
            disclaimerBottom={externalReviewSection.disclaimerBottom}
            description={externalReviewSection.description}
          />
          <CardLayout>
            <Title variant="h3">{stepCardSections.public.title}</Title>
            {publicCommentCards.map((card, i) => (
              <StepCard key={i} icon={card.icon} step={card.step} />
            ))}
          </CardLayout>

          <CardLayout>
            <Title variant="h3">{stepCardSections.scientific.title}</Title>
            {scienceReviewCards.map((card, i) => (
              <StepCard key={i} icon={card.icon} step={card.step} />
            ))}
          </CardLayout>
        </SectionContent>
      </BackgroundImgSection>

      <HeroAction
        // classes={{ main: styles.bottomSection }}
        img={fernImg}
        title={heroBannerBottom.title}
        description={heroBannerBottom.description}
        actionTxt={heroBannerBottom.btnText}
        action={() => history.push(heroBannerBottom.href)}
      />
    </div>
  );
};

export { MethodologyReviewProcess };
