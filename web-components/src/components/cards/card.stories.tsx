import * as React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';

import Card from 'web-components/lib/components/cards/Card';
import ProjectTopCard from 'web-components/lib/components/cards/ProjectTopCard';
import ImpactCard from 'web-components/lib/components/cards/ImpactCard';
import MapCard from 'web-components/lib/components/cards/MapCard';
import GlanceCard from 'web-components/lib/components/cards/GlanceCard';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import { User } from 'web-components/lib/components/user/UserInfo';

// import CreditCard, { CreditInfo } from 'web-components/lib/components/cards/CreditCard';
import PurchasedCreditsCard from 'web-components/lib/components/cards/PurchasedCreditsCard';
import CurrentCreditsIcon from 'web-components/lib/components/icons/CurrentCreditsIcon';
import TrustIcon from 'web-components/lib/components/icons/TrustIcon';
import ProjectCard from 'web-components/lib/components/cards/ProjectCard';
import GreenCard from 'web-components/lib/components/cards/GreenCard';
import GreenTopIconCard from 'web-components/lib/components/cards/GreenTopIconCard';
import CreateProjectCard from 'web-components/lib/components/cards/CreateProjectCard';
import ImageActionCard from 'web-components/lib/components/cards/ImageActionCard';
import { StepCard } from 'web-components/lib/components/cards/StepCard';
import FarmerIcon from 'web-components/lib/components/icons/FarmerIcon';
import { QuestionItem } from '../../../lib/components/faq/Question';
import { OverviewCard } from 'web-components/lib/components/cards/OverviewCard';
import ResourcesCard from 'web-components/lib/components/cards/ResourcesCard';

export default {
  title: 'Cards',
  component: Card,
};

const projectDeveloper: User = {
  name: 'Odonata',
  type: 'user',
  location: 'South Melbourne',
  image:
    'http://www.odonata.org.au/wp-content/uploads/2018/01/odinata-logo-only.png',
  description:
    'Odonata is a not-for-profit entity supporting biodiversity impact solutions.',
};

const landSteward: User = {
  name: 'Ngarrindjeri Tribe',
  type: 'user',
  location: 'Southern Australia',
  image: '/tribe.png',
  description:
    'The Ngarrindjeri culture is centered around the lower lakes of the Murray River.',
};

export const projectTopCard = (): JSX.Element => (
  <ProjectTopCard
    projectDeveloper={projectDeveloper}
    landSteward={landSteward}
  />
);

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

// const creditInfo: CreditInfo = {
//   name: 'REDD+ in the Amazon',
//   description: 'Reduce the emissions from deforestation and forest degradation in the Amazon',
//   imgSrc: '/Polyculture.png',
//   place: 'Brazil',
//   outcome: 'carbon sequestration',
//   numberOfHolders: 1021,
//   numberOfProjects: 25,
//   amount: 70000,
//   totalAmount: 93211,
//   // unit: 'USD'
// };
//
//
// export const creditCard = (): JSX.Element => (
//   <CreditCard credit={creditInfo} onClick={onClick} width="20.5rem" />
// );

function onClick(): void {}

export const projectCard = (): JSX.Element => (
  <>
    <ProjectCard
      name="Coorong Project"
      place={'Adelaide, South Australia, Australia'}
      area={200}
      comingSoon={false}
      areaUnit="hectares"
      imgSrc="/coorong.png"
      tag="biodiversity"
      onClick={onClick}
    />

    <ProjectCard
      name="Coorong Project"
      place={'Adelaide, South Australia, Australia'}
      area={200}
      comingSoon={false}
      areaUnit="hectares"
      imgSrc="/coorong.png"
      tag="biodiversity"
      onClick={onClick}
      registry={{ name: 'registry', type: 'type' }}
    />
  </>
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

export const createProjectCard = (): JSX.Element => (
  <CreateProjectCard isFirstProject onClick={() => {}} />
);

export const createProjectCardAddAnother = (): JSX.Element => (
  <CreateProjectCard isFirstProject={false} onClick={() => {}} />
);

export const imageActionCard = (): JSX.Element => (
  <ImageActionCard
    imgSrc="/coorong.png"
    onClick={() => void null}
    btnText="Choose Credit Class"
    title="Carbon<i>Plus</i> Grasslands"
    description="This credit class is a built as a holistic credit that includes multiple ecological benefits: Carbon Sequestration and Net GHG reduction, increased animal welfare, ecosystem health, and soil health."
  />
);

const stubFaqs: QuestionItem[] = [
  { question: 'What is the question', answer: 'This is the answer' },
  { question: 'What is the question', answer: 'This is the answer' },
  { question: 'What is the question', answer: 'This is the answer' },
];

export const stepCard: React.FC = () => {
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

const useStylesOverview = makeStyles((theme: Theme) => ({
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
  },
}));

function OverviewCards(): JSX.Element {
  const styles = useStylesOverview();

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
  />
);
