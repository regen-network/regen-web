import * as React from 'react';
import { Box, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Track } from 'web-marketplace/src/lib/tracker/types';

import { QuestionItem } from '../faq/Question';
import CurrentCreditsIcon from '../icons/CurrentCreditsIcon';
import FarmerIcon from '../icons/FarmerIcon';
import TrustIcon from '../icons/TrustIcon';
import Card from './Card';
import GlanceCard from './GlanceCard';
import GreenCard from './GreenCard';
import GreenTopIconCard from './GreenTopIconCard';
import { ImageActionCard } from './ImageActionCard';
import ImpactCard from './ImpactCard';
import MapCard from './MapCard';
import OnBoardingCard from './OnBoardingCard';
import { OverviewCard } from './OverviewCard';
import ProjectCard from './ProjectCard';
import ProjectImpactCard from './ProjectImpactCard/ProjectImpactCard';
import PurchasedCreditsCard from './PurchasedCreditsCard';
import ResourcesCard from './ResourcesCard';
import { ReviewCard } from './ReviewCard';
import { ItemDisplay } from './ReviewCard/ReviewCard.ItemDisplay';
import { Photo } from './ReviewCard/ReviewCard.Photo';
import { StepCard } from './StepCard';

export default {
  title: 'Cards',
  component: Card,
};

export const impactCard = (): JSX.Element => (
  <ImpactCard
    name="name"
    description="Increasing all living biomass which is located above the ground"
    imgSrc="/biomass.png"
  />
);

export const monitoredImpactCard = (): JSX.Element => (
  <ImpactCard
    name="name"
    description="Healthy ecosystems and rich biodiversity are fundamental to life on our planet."
    imgSrc="/biodiversity.png"
    monitored
  />
);

export const projectImpactCard = (): JSX.Element => (
  <ProjectImpactCard
    name="Reforestation"
    imgSrc="/illustrations/reforestation.png"
    sdgs={[
      { src: '/sdgs/sdg3.svg', alt: 'sdg3' },
      { src: '/sdgs/sdg4.svg', alt: 'sdg4' },
      { src: '/sdgs/sdg8.svg', alt: 'sdg8' },
    ]}
    standard="https://regen-registry.s3.amazonaws.com/projects/kasigau/VCS.png"
    label="primary impact"
  />
);

function onClick(): void {}
const trackMock: Track = () => Promise.resolve();

export const projectCard = (): JSX.Element => (
  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
    <ProjectCard
      track={trackMock}
      name="Coorong Project"
      place={'Adelaide, South Australia, Australia'}
      area={200}
      comingSoon={false}
      areaUnit="hectares"
      imgSrc="/coorong.png"
      onClick={onClick}
      purchaseInfo={{
        sellInfo: {
          creditsAvailable: 0,
          creditsAvailableForUser: 1190,
          avgPricePerTonLabel: '$17.20',
        },
      }}
      creditsTooltip="These credits are sold out and will not be available in the future."
      draftText="Draft"
      isSoldOut
      sx={{ maxWidth: 338, mr: 10, mb: 10 }}
    />

    <ProjectCard
      track={trackMock}
      name="Coorong Project"
      place={'Adelaide, South Australia, Australia'}
      area={200}
      comingSoon={false}
      areaUnit="hectares"
      imgSrc="/coorong.png"
      onClick={onClick}
      purchaseInfo={{
        sellInfo: {
          creditsAvailable: 1200,
          creditsAvailableForUser: 1190,
          avgPricePerTonLabel: '$17.20',
        },
      }}
      sx={{ maxWidth: 338, mr: 10, mb: 10 }}
      draftText="Draft"
    />

    <ProjectCard
      track={trackMock}
      name="Coorong Project"
      place={'Adelaide, South Australia, Australia'}
      area={200}
      comingSoon={false}
      areaUnit="hectares"
      imgSrc="/coorong.png"
      tag="biodiversity"
      onClick={onClick}
      sx={{ maxWidth: 338 }}
      draft
      draftText="Draft"
    />
  </Box>
);

export const purchasedCreditsCard = (): JSX.Element => (
  <PurchasedCreditsCard
    number={3000}
    description="Credits you purchased"
    date="Feb 15, 2020"
    icon={<CurrentCreditsIcon />}
  />
);

export const mapCard = (): JSX.Element => (
  <MapCard
    isPopup
    imgSrc="diversifola.png"
    color="#FFE7AD"
    name="Euc diversifola mallee"
    description="This species from the Hawkesbury region of New South Wales may grow into a multi-trunked mallee, or as a single trunked small tree."
  />
);

export const glanceCard = (): JSX.Element => (
  <GlanceCard
    imgSrc="./impactag-smallmap-top-v2.jpg"
    text={[
      'Shifting to Managed Grazing can potentially sequester 16.4- 26 CO2e (Gt) by 2050.',
      'Wilmot Cattle Co has increased Soil Organic Carbon to 4.5% and removed 22,500 tons of CO2e in two years.',
    ]}
  />
);

export const greenCard = (): JSX.Element => (
  <GreenCard>
    <p>Green card content</p>
  </GreenCard>
);

export const greenTopIconCard = (): JSX.Element => (
  <>
    <GreenTopIconCard
      title="Green card 1"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      linkText="Link text"
      linkUrl="https://github.com/regen-network"
      imgSrc="./mainnet-validators.svg"
    />
  </>
);

export const onBoardingCard = (): JSX.Element => (
  <OnBoardingCard>some content</OnBoardingCard>
);

export const imageActionCard = (): JSX.Element => (
  <ImageActionCard
    imgSrc="/coorong.png"
    onClick={() => void null}
    btnText="Choose Credit Class"
    title="Carbon<i>Plus</i> Grasslands"
    description="This credit class is a built as a holistic credit that includes multiple ecological benefits: Carbon Sequestration and Net GHG reduction, increased animal welfare, ecosystem health, and soil health."
    draftText="Draft"
  />
);

const stubFaqs: QuestionItem[] = [
  { question: 'What is the question', answer: 'This is the answer' },
  { question: 'What is the question', answer: 'This is the answer' },
  { question: 'What is the question', answer: 'This is the answer' },
];

export const stepCard: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <StepCard
      icon={<FarmerIcon />}
      step={{
        stepNumber: 1,
        btnText: 'submit a concept note',
        onBtnClick: () => null,
        title: 'Step Card',
        tagName: 'tagname',
        isActive: true,
        faqs: stubFaqs,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      }}
    />
  );
};

const useStylesOverview = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'wrap',
    },
  },
  trustIcon: {
    width: 61.87,
    height: 70.68,
  },
  creditsIcon: {
    width: 63,
    height: 72,
    color: theme.palette.secondary.main,
  },
}));

function OverviewCards(): JSX.Element {
  const { classes: styles } = useStylesOverview();

  const items = [
    {
      title: 'independently verified',
      tooltip: 'Blockchain data: data stored on the Regen Ledger.',
      description: 'Verified by 3rd party',
    },
    {
      title: 'no tooltip',
      description:
        'Two lines: Blockchain data: data stored on the Regen Ledger.',
    },
    {
      title: 'with a link',
      description:
        'A new practice adopted from &nbsp;<a href="#">pre-approved list</a>',
      tooltip: 'test',
    },
    {
      title: 'unique',
      tooltip: 'test 2',
      description: 'Avoiding double issuance',
    },
    {
      title: 'short',
      tooltip: 'test 2',
      description: 'single line description',
    },
    {
      title: 'short',
      tooltip: 'test 2',
      description: 'single line description',
    },
  ];

  return (
    <div className={styles.root}>
      <OverviewCard
        icon={<TrustIcon className={styles.trustIcon} isActive />}
        item={items[0]}
      />
      <OverviewCard
        icon={<CurrentCreditsIcon className={styles.creditsIcon} />}
        item={items[1]}
      />
      <OverviewCard
        icon={<CurrentCreditsIcon className={styles.creditsIcon} />}
        item={items[3]}
      />
      <OverviewCard
        icon={<TrustIcon className={styles.trustIcon} isActive />}
        item={items[2]}
      />
      <OverviewCard
        icon={<TrustIcon className={styles.trustIcon} isActive />}
        item={items[4]}
      />
      <OverviewCard
        icon={<TrustIcon className={styles.trustIcon} isActive />}
        item={items[5]}
      />
    </div>
  );
}

export const overviewCard = (): JSX.Element => (
  <OverviewCard
    icon={<CurrentCreditsIcon />}
    item={{
      title: 'sample',
      tooltip: 'Example tooltip',
      description:
        'Icon must be styled in each use. It is shown here unstyled.',
    }}
  />
);

export const overviewCardsGroup = (): JSX.Element => <OverviewCards />;

export const resourcesCard = (): JSX.Element => (
  <ResourcesCard
    title="Resources"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    link="#"
    image={{ publicURL: '/coorong.png' }}
    updated="July 4, 1776"
    draftText="Draft"
  />
);

export const reviewCard = (): JSX.Element => (
  <ReviewCard title="Review Card" onEditClick={() => {}} editText="Edit">
    <ItemDisplay name="Name A">Description A</ItemDisplay>
    <ItemDisplay name="Name B">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
      amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </ItemDisplay>
    <ItemDisplay name="URL">
      <a href="http://www.url.com/">www.url.com</a>
    </ItemDisplay>
    <Photo src="/coorong.png" />
  </ReviewCard>
);
