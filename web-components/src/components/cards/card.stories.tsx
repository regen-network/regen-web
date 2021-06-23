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

export const overviewCard = (): JSX.Element => (
  <>
    <OverviewCard
      icon={
        <svg width="68" height="75" viewBox="0 0 68 75" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M31.5855 2.71341C32.0035 2.33302 32.4976 2.14282 33.0297 2.14282C33.5617 2.14282 34.0558 2.33302 34.5879 2.71341C41.1627 8.76159 49.5617 12.3753 58.7209 12.3753C59.4085 12.3753 60.0617 12.3408 60.746 12.3046L60.8491 12.2992H60.9631C62.0653 12.2992 63.0534 13.1741 63.2434 14.4294C63.7375 17.4725 64.0035 20.6297 64.0035 23.863C64.0035 46.2299 51.462 65.2874 33.8658 72.6669C33.5997 72.781 33.3337 72.8191 33.0677 72.8191C32.8016 72.8191 32.5356 72.781 32.2696 72.6669C14.6734 65.2874 2.13184 46.2299 2.13184 23.863C2.13184 20.6297 2.39787 17.4725 2.89193 14.4294C3.08195 13.2121 4.07008 12.2992 5.17221 12.2992H5.28623C6.00832 12.3372 6.6924 12.3753 7.41449 12.3753C16.5736 12.3753 24.9727 8.76159 31.5855 2.71341Z"
            fill="white"
            stroke="#4FB573"
            strokeWidth="3"
          />
          <path
            d="M57.0184 18.7806L57.0184 18.7807L57.0201 18.7913C57.4202 21.2301 57.6356 23.7606 57.6356 26.3521C57.6356 44.2947 47.4731 59.508 33.326 65.3804L33.3259 65.3804L33.3185 65.3835C33.2522 65.4117 33.1721 65.4286 33.0492 65.4286C32.9264 65.4286 32.8463 65.4117 32.78 65.3835L32.78 65.3835L32.7725 65.3804C18.6253 59.508 8.46289 44.2947 8.46289 26.3521C8.46289 23.7606 8.67832 21.2301 9.07836 18.7913L9.07838 18.7913L9.07934 18.7853C9.17027 18.2087 9.62227 17.8857 9.97752 17.8857H10.0457C10.0678 17.8868 10.0898 17.888 10.1119 17.8891C10.6723 17.9184 11.2364 17.9479 11.8321 17.9479C19.6768 17.9479 26.8572 14.8826 32.4934 9.78085C32.6595 9.63157 32.8309 9.57141 33.0178 9.57141C33.1854 9.57141 33.384 9.62006 33.6825 9.82259C39.2816 14.9003 46.4445 17.9479 54.2664 17.9479C54.8614 17.9479 55.4236 17.9185 55.9822 17.8893L55.9935 17.8887L55.9935 17.8887L56.0528 17.8857H56.121C56.4888 17.8857 56.9282 18.1904 57.0184 18.7806Z"
            fill="#DCF0E3"
            stroke="#4FB573"
            strokeWidth="2"
          />
          <path
            d="M33.0684 48.3601C40.1209 48.3601 45.838 42.6378 45.838 35.579C45.838 28.5203 40.1209 22.798 33.0684 22.798C26.016 22.798 20.2988 28.5203 20.2988 35.579C20.2988 42.6378 26.016 48.3601 33.0684 48.3601Z"
            fill="white"
            stroke="#FFC432"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M26.4932 37.9374L30.1796 41.6272L39.6048 32.1555"
            stroke="#FFC432"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
    />
    <OverviewCard
      icon={
        <svg width="68" height="75" viewBox="0 0 68 75" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M31.5855 2.71341C32.0035 2.33302 32.4976 2.14282 33.0297 2.14282C33.5617 2.14282 34.0558 2.33302 34.5879 2.71341C41.1627 8.76159 49.5617 12.3753 58.7209 12.3753C59.4085 12.3753 60.0617 12.3408 60.746 12.3046L60.8491 12.2992H60.9631C62.0653 12.2992 63.0534 13.1741 63.2434 14.4294C63.7375 17.4725 64.0035 20.6297 64.0035 23.863C64.0035 46.2299 51.462 65.2874 33.8658 72.6669C33.5997 72.781 33.3337 72.8191 33.0677 72.8191C32.8016 72.8191 32.5356 72.781 32.2696 72.6669C14.6734 65.2874 2.13184 46.2299 2.13184 23.863C2.13184 20.6297 2.39787 17.4725 2.89193 14.4294C3.08195 13.2121 4.07008 12.2992 5.17221 12.2992H5.28623C6.00832 12.3372 6.6924 12.3753 7.41449 12.3753C16.5736 12.3753 24.9727 8.76159 31.5855 2.71341Z"
            fill="white"
            stroke="#4FB573"
            strokeWidth="3"
          />
          <path
            d="M57.0184 18.7806L57.0184 18.7807L57.0201 18.7913C57.4202 21.2301 57.6356 23.7606 57.6356 26.3521C57.6356 44.2947 47.4731 59.508 33.326 65.3804L33.3259 65.3804L33.3185 65.3835C33.2522 65.4117 33.1721 65.4286 33.0492 65.4286C32.9264 65.4286 32.8463 65.4117 32.78 65.3835L32.78 65.3835L32.7725 65.3804C18.6253 59.508 8.46289 44.2947 8.46289 26.3521C8.46289 23.7606 8.67832 21.2301 9.07836 18.7913L9.07838 18.7913L9.07934 18.7853C9.17027 18.2087 9.62227 17.8857 9.97752 17.8857H10.0457C10.0678 17.8868 10.0898 17.888 10.1119 17.8891C10.6723 17.9184 11.2364 17.9479 11.8321 17.9479C19.6768 17.9479 26.8572 14.8826 32.4934 9.78085C32.6595 9.63157 32.8309 9.57141 33.0178 9.57141C33.1854 9.57141 33.384 9.62006 33.6825 9.82259C39.2816 14.9003 46.4445 17.9479 54.2664 17.9479C54.8614 17.9479 55.4236 17.9185 55.9822 17.8893L55.9935 17.8887L55.9935 17.8887L56.0528 17.8857H56.121C56.4888 17.8857 56.9282 18.1904 57.0184 18.7806Z"
            fill="#DCF0E3"
            stroke="#4FB573"
            strokeWidth="2"
          />
          <path
            d="M33.0684 48.3601C40.1209 48.3601 45.838 42.6378 45.838 35.579C45.838 28.5203 40.1209 22.798 33.0684 22.798C26.016 22.798 20.2988 28.5203 20.2988 35.579C20.2988 42.6378 26.016 48.3601 33.0684 48.3601Z"
            fill="white"
            stroke="#FFC432"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M26.4932 37.9374L30.1796 41.6272L39.6048 32.1555"
            stroke="#FFC432"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
    />
    <OverviewCard
      icon={
        <svg width="68" height="75" viewBox="0 0 68 75" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M31.5855 2.71341C32.0035 2.33302 32.4976 2.14282 33.0297 2.14282C33.5617 2.14282 34.0558 2.33302 34.5879 2.71341C41.1627 8.76159 49.5617 12.3753 58.7209 12.3753C59.4085 12.3753 60.0617 12.3408 60.746 12.3046L60.8491 12.2992H60.9631C62.0653 12.2992 63.0534 13.1741 63.2434 14.4294C63.7375 17.4725 64.0035 20.6297 64.0035 23.863C64.0035 46.2299 51.462 65.2874 33.8658 72.6669C33.5997 72.781 33.3337 72.8191 33.0677 72.8191C32.8016 72.8191 32.5356 72.781 32.2696 72.6669C14.6734 65.2874 2.13184 46.2299 2.13184 23.863C2.13184 20.6297 2.39787 17.4725 2.89193 14.4294C3.08195 13.2121 4.07008 12.2992 5.17221 12.2992H5.28623C6.00832 12.3372 6.6924 12.3753 7.41449 12.3753C16.5736 12.3753 24.9727 8.76159 31.5855 2.71341Z"
            fill="white"
            stroke="#4FB573"
            strokeWidth="3"
          />
          <path
            d="M57.0184 18.7806L57.0184 18.7807L57.0201 18.7913C57.4202 21.2301 57.6356 23.7606 57.6356 26.3521C57.6356 44.2947 47.4731 59.508 33.326 65.3804L33.3259 65.3804L33.3185 65.3835C33.2522 65.4117 33.1721 65.4286 33.0492 65.4286C32.9264 65.4286 32.8463 65.4117 32.78 65.3835L32.78 65.3835L32.7725 65.3804C18.6253 59.508 8.46289 44.2947 8.46289 26.3521C8.46289 23.7606 8.67832 21.2301 9.07836 18.7913L9.07838 18.7913L9.07934 18.7853C9.17027 18.2087 9.62227 17.8857 9.97752 17.8857H10.0457C10.0678 17.8868 10.0898 17.888 10.1119 17.8891C10.6723 17.9184 11.2364 17.9479 11.8321 17.9479C19.6768 17.9479 26.8572 14.8826 32.4934 9.78085C32.6595 9.63157 32.8309 9.57141 33.0178 9.57141C33.1854 9.57141 33.384 9.62006 33.6825 9.82259C39.2816 14.9003 46.4445 17.9479 54.2664 17.9479C54.8614 17.9479 55.4236 17.9185 55.9822 17.8893L55.9935 17.8887L55.9935 17.8887L56.0528 17.8857H56.121C56.4888 17.8857 56.9282 18.1904 57.0184 18.7806Z"
            fill="#DCF0E3"
            stroke="#4FB573"
            strokeWidth="2"
          />
          <path
            d="M33.0684 48.3601C40.1209 48.3601 45.838 42.6378 45.838 35.579C45.838 28.5203 40.1209 22.798 33.0684 22.798C26.016 22.798 20.2988 28.5203 20.2988 35.579C20.2988 42.6378 26.016 48.3601 33.0684 48.3601Z"
            fill="white"
            stroke="#FFC432"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
          <path
            d="M26.4932 37.9374L30.1796 41.6272L39.6048 32.1555"
            stroke="#FFC432"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
    />
  </>
);

const useStylesOverview = makeStyles((theme: Theme) => ({
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
      title: 'independently verified',
      description: 'All carbon reductions and removals are proven to have genuinely taken place',
    },
  ];

  return (
    <>
      <OverviewzCard icon={<TrustIcon className={styles.trustIcon} isActive />} item={items[0]} />
      <OverviewzCard icon={<CurrentCreditsIcon className={styles.creditsIcon} />} item={items[1]} />
      <OverviewzCard icon={<TrustIcon className={styles.trustIcon} isActive />} item={items[2]} />
    </>
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
    width: 350.5, //
    padding: theme.spacing(5, 8),
    [theme.breakpoints.up('sm')]: {
      marginRight: 21.5, //
      marginBottom: 20, //
    },
    [theme.breakpoints.down('xs')]: {
      marginRight: 13, //
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
    marginTop: -8,
    marginRight: -20,
    cursor: 'pointer',
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
