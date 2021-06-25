import * as React from 'react';

import Card from 'web-components/lib/components/cards/Card';
import ProjectTopCard from 'web-components/lib/components/cards/ProjectTopCard';
import ImpactCard from 'web-components/lib/components/cards/ImpactCard';
import MapCard from 'web-components/lib/components/cards/MapCard';
import GlanceCard from 'web-components/lib/components/cards/GlanceCard';
import OnBoardingCard from 'web-components/lib/components/cards/OnBoardingCard';
import { User } from 'web-components/lib/components/user/UserInfo';
import { withKnobs, boolean, text, object, number, array } from '@storybook/addon-knobs';

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

import { makeStyles, Theme, SvgIcon } from '@material-ui/core';
import clsx from 'clsx';
import ReactHtmlParser from 'react-html-parser';

import CheckIcon from '../icons/CheckIcon';
import InfoIconOutlined from '../icons/InfoIconOutlined';
import InfoTooltip from '../tooltip/InfoTooltip';
import Item from '../sliders/Item';

export default {
  title: 'Components|Cards',
  component: Card,
  decorators: [withKnobs],
};

const projectDeveloper: User = {
  name: 'Odonata',
  type: 'user',
  place: {
    city: 'South Melbourne',
    state: 'Victoria',
    country: 'Australia',
  },
  imgSrc: 'http://www.odonata.org.au/wp-content/uploads/2018/01/odinata-logo-only.png',
  description: 'Odonata is a not-for-profit entity supporting biodiversity impact solutions.',
};

const landSteward: User = {
  name: 'Ngarrindjeri Tribe',
  type: 'user',
  place: {
    state: 'Southern Australia',
    country: 'Australia',
  },
  imgSrc: '/tribe.png',
  description: 'The Ngarrindjeri culture is centered around the lower lakes of the Murray River.',
};

export const projectTopCard = (): JSX.Element => (
  <ProjectTopCard
    projectDeveloper={object('project developer', projectDeveloper)}
    landSteward={object('land steward', landSteward)}
  />
);

export const impactCard = (): JSX.Element => (
  <ImpactCard
    name={text('name', 'name')}
    description={text('description', 'Increasing all living biomass which is located above the ground.')}
    imgSrc="/biomass.png"
  />
);

export const monitoredImpactCard = (): JSX.Element => (
  <ImpactCard
    name={text('name', 'name')}
    description={text(
      'description',
      'Healthy ecosystems and rich biodiversity are fundamental to life on our planet.',
    )}
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
  <ProjectCard
    name={text('name', 'Coorong Project')}
    place={object('place', {
      city: 'Adelaide',
      state: 'South Australia',
      country: 'Australia',
    })}
    area={number('area', 200)}
    comingSoon={boolean('coming soon', false)}
    areaUnit={text('areaUnit', 'hectares')}
    imgSrc={text('imgSrc', '/coorong.png')}
    developer={object('developer', {
      name: 'Odonata',
      type: 'user',
      imgSrc: 'http://www.odonata.org.au/wp-content/uploads/2018/01/odinata-logo-only.png',
    })}
    tag="biodiversity"
    onClick={onClick}
  />
);

export const purchasedCreditsCard = (): JSX.Element => (
  <PurchasedCreditsCard
    number={number('number', 3000)}
    description={text('description', 'Credits you purchased')}
    date={text('date', 'Feb 15, 2020')}
    icon={<CurrentCreditsIcon />}
  />
);

export const mapCard = (): JSX.Element => (
  <MapCard
    isPopup
    imgSrc="diversifola.png"
    color={text('color', '#FFE7AD')}
    name={text('name', 'Euc diversifola mallee')}
    description={text(
      'description',
      'This species from the Hawkesbury region of New South Wales may grow into a multi-trunked mallee, or as a single trunked small tree.',
    )}
  />
);

export const glanceCard = (): JSX.Element => (
  <GlanceCard
    imgSrc="./impactag-smallmap-top-v2.jpg"
    text={array('text', [
      'Shifting to Managed Grazing can potentially sequester 16.4- 26 CO2e (Gt) by 2050.',
      'Wilmot Cattle Co has increased Soil Organic Carbon to 4.5% and removed 22,500 tons of CO2e in two years.',
    ])}
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
      description={text(
        'description',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      )}
      linkURL={text('Link url', 'https://github.com/regen-network')}
      imgSrc={text('Img src', './mainnet-validators.svg')}
    />
  </>
);

export const onBoardingCard = (): JSX.Element => <OnBoardingCard>some content</OnBoardingCard>;

export const createProjectCard = (): JSX.Element => <CreateProjectCard isFirstProject onClick={() => {}} />;

export const createProjectCardAddAnother = (): JSX.Element => (
  <CreateProjectCard isFirstProject={false} onClick={() => {}} />
);

export const imageActionCard = (): JSX.Element => (
  <ImageActionCard
    imgSrc={text('Image source', '/coorong.png')}
    onClick={() => void null}
    btnText={text('Button Text', 'Choose Credit Class')}
    title="Carbon<i>Plus</i> Grasslands" // Knobbs don't render correctly here
    description={text(
      'description',
      'This credit class is a built as a holistic credit that includes multiple ecological benefits: Carbon Sequestration and Net GHG reduction, increased animal welfare, ecosystem health, and soil health.',
    )}
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
        stepNumber: number('step number', 1),
        btnText: text('button text', 'submit a concept note'),
        onBtnClick: () => null,
        title: text('title', 'Step Card'),
        tagName: text('tag name', 'tagname'),
        isActive: boolean('is active', true),
        faqs: stubFaqs,
        description: text(
          'description',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        ),
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
      description: 'Two lines: Blockchain data: data stored on the Regen Ledger.',
    },
    {
      title: 'with a link',
      description: 'A new practice adopted from &nbsp;<a href="#">pre-approved list</a>',
      tooltip: 'test',
    },
    { title: 'unique', tooltip: 'test 2', description: 'Avoiding double issuance' },
    { title: 'short', tooltip: 'test 2', description: 'single line description' },
    { title: 'short', tooltip: 'test 2', description: 'single line description' },
  ];

  return (
    <div className={styles.root}>
      <OverviewCard icon={<TrustIcon className={styles.trustIcon} isActive />} item={items[0]} />
      <OverviewCard icon={<CurrentCreditsIcon className={styles.creditsIcon} />} item={items[1]} />
      <OverviewCard icon={<CurrentCreditsIcon className={styles.creditsIcon} />} item={items[3]} />
      <OverviewCard icon={<TrustIcon className={styles.trustIcon} isActive />} item={items[2]} />
      <OverviewCard icon={<TrustIcon className={styles.trustIcon} isActive />} item={items[4]} />
      <OverviewCard icon={<TrustIcon className={styles.trustIcon} isActive />} item={items[5]} />
    </div>
  );
}

export const overviewCard = (): JSX.Element => (
  <OverviewCard
    icon={<CurrentCreditsIcon />}
    item={{
      title: 'sample',
      tooltip: 'Example tooltip',
      description: 'Icon must be styled in each use. It is shown here unstyled.',
    }}
  />
);

export const overviewCardsGroup = (): JSX.Element => <OverviewCards />;
