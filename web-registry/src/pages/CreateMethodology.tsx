import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';

import Section from 'web-components/lib/components/section';
import StepCard, { ProjectPlanStep } from 'web-components/lib/components/cards/StepCard';
import ImpactCard from 'web-components/lib/components/cards/ImpactCard';
import ResponsiveSlider from 'web-components/lib/components/sliders/ResponsiveSlider';
import ResourcesCard from 'web-components/lib/components/cards/ResourcesCard';
import FixedFooter from 'web-components/lib/components/fixed-footer';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';

import { HeroTitle, HeroAction } from '../components/molecules';
import { StepCardsWithDescription } from '../components/organisms';
import { outcomes, resources, linksByCategory } from '../mocks';

import { ReactComponent as Checklist } from '../assets/svgs/green-yellow-checklist.svg';
import { ReactComponent as Charts } from '../assets/svgs/green-charts.svg';
import { ReactComponent as MagnifyingGlass } from '../assets/svgs/green-magnifying-glass-eye.svg';
import { ReactComponent as DocumentWithCheckmark } from '../assets/svgs/yellow-check-document.svg';
import { ReactComponent as Scientist } from '../assets/svgs/scientist-with-vial.svg';
import { ReactComponent as CowCelebrating } from '../assets/svgs/green-cow-celebrating.svg';
import fernImg from '../assets/fern-in-hands.png';
import writingOnPaperImg from '../assets/writing-on-paper.png';
import topographyImg from '../assets/topography-pattern-full-1.png';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: theme.palette.primary.main,
  },
  heroMain: {
    maxWidth: theme.typography.pxToRem(744),
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(22),
    },
    [theme.breakpoints.down('xs')]: {
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
    paddingTop: 0,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(0),
      paddingBottom: theme.spacing(20),
    },
  },
  resourcesSection: {
    background: theme.palette.grey[50],
    borderTop: `1px solid ${theme.palette.grey[100]}`,
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(22.25),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(17.75),
    },
  },
  methodologyTitle: {
    marginBottom: theme.spacing(8.75),
    [theme.breakpoints.down('xs')]: {
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
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
  resourcesRoot: {
    paddingTop: 0,
  },
}));

type StepCard = {
  icon: JSX.Element;
  step: ProjectPlanStep;
};

const openLink = (url: string): void => void window.open(url, '_blank', 'noopener');
const htmlLink = (url: string, text: string): string =>
  `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;

const {
  acceptedPrograms,
  carbonPlusOverview,
  reviewProcess,
  submitMethodology,
} = linksByCategory.methodology;

const stepCards: StepCard[] = [
  {
    icon: <MagnifyingGlass />,
    step: {
      stepNumber: 1,
      isActive: true,
      title: 'Check if there is an approved methodology listed on one of the accepted programs',
      faqs: [
        { question: 'What is the question', answer: 'This is the answer' },
        { question: 'What is the question', answer: 'This is the answer' },
        { question: 'What is the question', answer: 'This is the answer' },
      ],
      description: `Prior to developing a methodology, take a look to see if there is a similar methodology that is already approved on our program or other accepted programs. ${htmlLink(
        acceptedPrograms,
        'View our list of accepted programs',
      )}`,
    },
  },
  {
    icon: <Checklist />,
    step: {
      btnText: 'submit a concept note',
      onBtnClick: () => openLink(submitMethodology),
      stepNumber: 2,
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
      onBtnClick: () => openLink(submitMethodology),
      stepNumber: 3,
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
      stepNumber: 4,
      isActive: true,
      title: 'Methodology accepted in beta form',
      faqs: [
        { question: 'What is the question', answer: 'This is the answer' },
        { question: 'What is the question', answer: 'This is the answer' },
        { question: 'What is the question', answer: 'This is the answer' },
      ],
      description:
        'Methodologies that exist in beta form have not undergone any external review by experts or community members.',
    },
  },
  {
    icon: <Scientist />,
    step: {
      stepNumber: 5,
      isActive: true,
      tagName: '2-3 weeks',
      title: 'Scientific peer review and public comment, updates made to beta methodology',
      description: `After internal review, it may be recommended that some methods undergo external review to ensure the methodology is supported by the scientific community. See our ${htmlLink(
        reviewProcess,
        'Methodology Review Process',
      )} for more information.`,
    },
  },
  {
    icon: <CowCelebrating />,
    step: {
      stepNumber: 6,
      isActive: true,
      title: 'Methodology accepted!',
      description:
        'Once it has been confirmed that the methodology developer has addressed each comment or revision request, the methodology will be accepted and move out of its beta form.',
    },
  },
];

const outcomeCards = outcomes.map(({ imgSrc, title, description }) => (
  <ImpactCard name={title} imgSrc={imgSrc} description={description} largeFontSize />
));

const CreateMethodology: React.FC = () => {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <div className={styles.root}>
      <HeroTitle
        isBanner
        img={fernImg}
        title="Create a methodology on Regen Registry."
        description="We are working hard to promote integrity and innovation in the methods used to monitor ecosystems and invite any and all methodology designers to take part in expanding this body of work."
        classes={{ main: styles.heroMain }}
      />
      <Section
        title="General process for creating a new methodology"
        classes={{ root: styles.topSection, title: styles.methodologyTitle }}
      >
        <StepCardsWithDescription
          className={styles.topSectionCards}
          stepCards={stepCards}
          bottomDescription={{
            title: 'Help develop a range of methodologies for the diversity of nature based solutions',
            body:
              'In addition to developing methodologies focused on carbon reduction and removal, we must also work to incorporate protocols to track water cycles, nutrient cycles, biodiversity, pollution management, changing weather patterns, and more.',
          }}
          description={`A lot can go into writing a new methodology and it might seem like an overwhelming process, but we’re here to help! Check out our ${htmlLink(
            carbonPlusOverview,
            'Carbon<i>Plus</i> Grasslands Methodology',
          )} to get a feel for what a methodology might entail and the various components included, and feel free to email <a href="mailto:science@regen.network">science@regen.network</a> for any additional questions.`}
        />
      </Section>

      <Section withSlider className={styles.outcomeSection}>
        <ResponsiveSlider
          itemWidth="90%"
          padding={theme.spacing(2.5)}
          title="Ecological outcomes"
          arrows={outcomes?.length > 3}
          slidesToShow={3}
          items={outcomeCards}
        />
      </Section>

      <CardMedia image={topographyImg} className={styles.resourcesSection}>
        <Section withSlider titleAlign="left">
          <ResponsiveSlider
            itemWidth="90%"
            classes={{ title: styles.resourcesTitle, root: styles.resourcesRoot }}
            padding={theme.spacing(2.5)}
            title="Resources"
            titleVariant="h2"
            arrows={resources?.length > 3}
            slidesToShow={3}
            items={resources.map(({ btnText, description, href, imgSrc, lastUpdated, title }) => (
              <ResourcesCard
                image={{ publicURL: require(`../assets/${imgSrc}`) }}
                title={title}
                updated={lastUpdated}
                description={description}
                buttonText={btnText}
                link={href.startsWith('http') ? href : require(`../assets/${href}`)}
              />
            ))}
          />
        </Section>
      </CardMedia>

      <HeroAction
        classes={{ main: styles.bottomSection }}
        title="Participate in Methodology Peer Review"
        description={`Methodologies submitted to Regen Network will go through a review process to provide valuable feedback which can be used to improve our understanding of the science and techniques/approaches, while promoting scientific transparency and instilling buyer assurance and confidence in claims. This process is in place to promote best practices in MRV and foster both innovation and trust. If you are interested in reviewing methodologies that have been submitted, please contact us at <a href="mailto:science@regen.network">science@regen.network.</a>`}
        actionTxt="See the Review Process"
        action={() => openLink(reviewProcess)}
      />

      <HeroAction
        classes={{ main: styles.bottomSection }}
        img={writingOnPaperImg}
        title="Create a Credit Class"
        description="If you haven’t yet created a credit class for this methodology, learn more below."
        actionTxt="Create a Credit Class"
        action={() => null} // TODO: once create credit class page is created, link there
      />
      <FixedFooter justify="flex-end">
        <ContainedButton href={submitMethodology} target="_blank" rel="noopener noreferrer">
          Submit a methodology
        </ContainedButton>
      </FixedFooter>
    </div>
  );
};

export { CreateMethodology };
