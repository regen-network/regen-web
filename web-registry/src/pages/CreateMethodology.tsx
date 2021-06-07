import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import Section from 'web-components/lib/components/section';
import { HeroTitle, HeroAction } from '../components/molecules';

import fernImg from '../assets/fern-in-hands.png';
import writingOnPaperImg from '../assets/writing-on-paper.png';
import Description from 'web-components/lib/components/description';
import StepCard, { ProjectPlanStep } from 'web-components/lib/components/cards/StepCard';

import { ReactComponent as Checklist } from '../assets/svgs/green-yellow-checklist.svg';
import { ReactComponent as Charts } from '../assets/svgs/green-charts.svg';
import { ReactComponent as DocumentWithCheckmark } from '../assets/svgs/yellow-check-document.svg';
import { ReactComponent as Scientist } from '../assets/svgs/scientist-with-vial.svg';
import { ReactComponent as CowCelebrating } from '../assets/svgs/green-cow-celebrating.svg';

const useStyles = makeStyles((theme: Theme) => ({
  heroMain: {
    paddingBottom: theme.spacing(22),
  },
  heroDescription: {
    // maxWidth: theme.spacing(165),
    maxWidth: theme.typography.pxToRem(744),
    lineHeight: theme.typography.pxToRem(35.2),
    // paddingBottom: theme.spacing(4),
  },
  section: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(22.25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(17.75),
    },
  },
  title: {
    marginBottom: theme.spacing(8.75),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(8),
    },
  },
  bottomSection: {
    maxWidth: theme.typography.pxToRem(946),
  },
  topSectionMain: {
    maxWidth: theme.typography.pxToRem(942),
  },
  topSectionCards: {
    maxWidth: theme.typography.pxToRem(754),
  },
  topSectionDescription: {
    lineHeight: theme.typography.pxToRem(33),
    fontSize: theme.typography.pxToRem(22),
    textAlign: 'center',
    maxWidth: theme.typography.pxToRem(942),
  },
}));

type StepCard = {
  icon: JSX.Element;
  step: ProjectPlanStep;
};

const stepCards: StepCard[] = [
  {
    icon: <Checklist />,
    step: {
      btnText: 'submit a concept note',
      onBtnClick: () => null,
      stepNumber: 1,
      isActive: true,
      tagName: '2-3 weeks',
      title: 'Generate an idea for a methodology and submit a concept note for internal review',
      faqs: [
        { question: 'What is the question', answer: 'This is the answer' },
        { question: 'What is the question', answer: 'This is the answer' },
        { question: 'What is the question', answer: 'This is the answer' },
      ],
      description:
        'A concept note is a short proposal of an idea for a project or methodology which could be used to address environmental and societal challenges and provide human well-being and ecological benefits.',
    },
  },
  {
    icon: <Charts />,
    step: {
      btnText: 'submit a methodology',
      onBtnClick: () => null,
      stepNumber: 2,
      isActive: true,
      tagName: '2-3 weeks',
      title: 'Create a methodology draft and submit it for internal review',
      faqs: [
        { question: 'What is the question', answer: 'This is the answer' },
        { question: 'What is the question', answer: 'This is the answer' },
        { question: 'What is the question', answer: 'This is the answer' },
      ],
      description:
        'Your methodology should aim to outline standards and tools to monitor the ecological, environmental, and social indicators covered by your nature based solution. Your approach can be region specific or cover a wide range of locations.',
    },
  },
  {
    icon: <DocumentWithCheckmark />,
    step: {
      stepNumber: 3,
      isActive: true,
      title: 'Create a methodology draft and submit it for internal review',
      faqs: [
        { question: 'What is the question', answer: 'This is the answer' },
        { question: 'What is the question', answer: 'This is the answer' },
        { question: 'What is the question', answer: 'This is the answer' },
      ],
      description:
        'Your methodology should aim to outline standards and tools to monitor the ecological, environmental, and social indicators covered by your nature based solution. Your approach can be region specific or cover a wide range of locations.',
    },
  },
  {
    icon: <Scientist />,
    step: {
      stepNumber: 4,
      isActive: true,
      tagName: '2-3 weeks',
      title: 'Create a methodology draft and submit it for internal review',
      description:
        'After internal review, it may be recommended that some methods undergo external review to ensure the methodology is supported by the scientific community. See our <a href="TODO: methodology review link" target="_blank" rel="noopener noreferrer">Methodology Review Process</a> for more information.',
    },
  },
  {
    icon: <CowCelebrating />,
    step: {
      stepNumber: 5,
      isActive: true,
      title: 'Methodology accepted!',
      description:
        'Once it has been confirmed that the methodology developer has addressed each comment or revision request, the methodology will be accepted and move out of its beta form.',
    },
  },
];

const CreateMethodology: React.FC = () => {
  const styles = useStyles();

  return (
    <>
      <HeroTitle
        img={fernImg}
        title="Create a methodology on Regen Registry."
        description="We are working hard to promote integrity and innovation in the methods used to monitor ecosystems and invite any and all methodology designers to take part in expanding this body of work."
        classes={{ description: styles.heroDescription, main: styles.heroMain }}
      />
      <Section
        title="General process for creating a new methodology"
        classes={{ root: styles.section, title: styles.title }}
      >
        <Grid container justify="center" className={styles.topSectionMain}>
          <Description className={styles.topSectionDescription}>
            A lot can go into writing a new methodology and it might seem like an overwhelming process, but
            we’re here to help! Check out our{' '}
            <Link href="/TODO: methodology link">
              Carbon<i>Plus</i> Grasslands Methodology
            </Link>{' '}
            to get a feel for what a methodology might entail and the various components included, and feel
            free to email <Link href="mailto:science@regen.network">science@regen.network</Link> for any
            additional questions.
          </Description>
          <Grid container justify="center" className={styles.topSectionCards}>
            {stepCards.map((card, i) => (
              <StepCard icon={card.icon} step={card.step} key={i} />
            ))}
          </Grid>
        </Grid>
      </Section>

      <HeroAction
        classes={{ main: styles.bottomSection }}
        img={writingOnPaperImg}
        title="Create a Credit Class"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        actionTxt="Create a Credit Class"
        action={() => null} // TODO:
      />
    </>
  );
};

export { CreateMethodology };
