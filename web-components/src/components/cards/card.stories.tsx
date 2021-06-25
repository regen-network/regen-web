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
    { title: 'unique', tooltip: 'test 2', description: 'Avoiding double issuance' },
    {
      title: 'no tooltip',
      description: 'All carbon reductions and removals are proven to have genuinely taken place',
    },
    {
      title: 'with a link',
      description: 'A new practice adopted from &nbsp;<a href="#">pre-approved list</a>',
      tooltip: 'test',
    },
  ];

  return (
    <div className={styles.root}>
      <OverviewzCard icon={<TrustIcon className={styles.trustIcon} isActive />} item={items[0]} />
      <OverviewzCard icon={<CurrentCreditsIcon className={styles.creditsIcon} />} item={items[1]} />
      <OverviewzCard icon={<CurrentCreditsIcon className={styles.creditsIcon} />} item={items[3]} />
      <OverviewzCard icon={<TrustIcon className={styles.trustIcon} isActive />} item={items[2]} />
    </div>
  );
}

export const overviewCards = (): JSX.Element => <OverviewCards />;

interface OverviewCardProps {
  className?: string;
  classes?: {
    root?: string;
    icon?: string;
  };
  icon: JSX.Element;
  item: OverviewItem;
}
interface OverviewItem {
  title: string;
  description: string;
  tooltip?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 197, //
    borderColor: theme.palette.grey[100],
    [theme.breakpoints.up('sm')]: {
      width: 350.5, //
      padding: theme.spacing(5, 8),
      marginRight: 21.5, //
      marginBottom: 20, //
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 278, //
      height: 183, //
      padding: theme.spacing(4),
      marginRight: 13, //
    },
    '& a': {
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
      textDecoration: 'none',
      '&:link, &:visited, &:hover, &:active': {
        textDecoration: 'none',
      },
    },
  },
  top: {
    display: 'flex',
    width: '100%',
  },
  cardTopThird: {
    display: 'flex',
    flex: 1,
  },
  cardTopRight: {
    alignItems: 'flex-start',
  },
  iconWrap: {
    justifyContent: 'center',
  },
  info: {
    marginLeft: 'auto',
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      marginTop: -8,
      marginRight: -20,
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: -6,
      marginRight: -8,
    },
  },
  bottom: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    fontWeight: 800,
    fontSize: theme.typography.pxToRem(14),
    fontFamily: theme.typography.h1.fontFamily,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingTop: theme.spacing(2),
  },
  description: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    flexWrap: 'wrap',
    color: theme.palette.info.dark,
    fontSize: theme.typography.pxToRem(14),
    paddingTop: theme.spacing(3),
  },
  check: {
    height: 17,
    width: 17,
    marginRight: theme.spacing(1.715),
  },
}));

function OverviewzCard({ className, classes, icon, item }: OverviewCardProps): JSX.Element {
  const styles = useStyles();

  return (
    <Card className={clsx(className, styles.root, classes && classes.root)}>
      <div className={styles.top}>
        <div className={clsx(styles.cardTopThird)}></div>
        <div className={clsx(styles.cardTopThird, styles.iconWrap)}>{icon}</div>
        <div className={clsx(styles.cardTopThird, styles.cardTopRight)}>
          {item.tooltip && (
            <InfoTooltip title={item.tooltip || ''} arrow placement="top">
              <div className={styles.info}>
                <InfoIconOutlined />
              </div>
            </InfoTooltip>
          )}
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.title}>
          <CheckIcon className={styles.check} />
          {item.title}
        </div>
        <div className={styles.description}>{ReactHtmlParser(item.description)}</div>
      </div>
    </Card>
  );
}
