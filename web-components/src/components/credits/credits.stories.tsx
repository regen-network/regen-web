import CreditDetails, { CreditInfoProps } from './CreditDetails';
// import Credits from './';
// import Gauge from './Gauge';
// import GaugeText from './GaugeText';
import CreditsGauge from './CreditsGauge';

// const credit: CreditsProps = {
//   numberOfHolders: 1021,
//   numberOfProjects: 25,
//   amount: 70000,
//   totalAmount: 93211,
// };

export default {
  title: 'Credits',
  component: CreditDetails,
};

const details: CreditInfoProps = {
  title: 'title',
  creditClass: {
    name: 'Australian Biodiversity Units (ABU’s)',
    keyOutcomesActivitiesDesc:
      'description for outcomes lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    tag: 'soil',
    description:
      'ABU’s are an Australian Government endorsed biodiversity credit. An individual ABU represents a 1.5m square area of land of significant environmental value that has been placed under a conservation covenant and agreed management plan. The covenant and management plan secure the long term preservation of the site and ensure the biodiversity value is protected in perpetuity. Vegetation types may include forests, grasslands, mallees, saltmarshes, scrubs, shrublands, wetlands, and woodlands. ABU’s are an innovative and unique way for organisations to preserve a tangible section of Australia’s unique natural habitat.',
  },
  activities: [
    'Site accredited as a Specific Environmental Benefit (SEB) site and credits created by the South Australian Department of Environment and Water.',
    'A land management services agreement will be established with a local indigenous group, employing people from the local community.',
    'The site will be managed in accordance with an agreed management plan to reduce weed pressure, improve the biodiversity value of the location and preserve the value of the land in perpetuity.',
    'After 10 years the land will be vetted to Rigney Namawi Pty Ltd (local indigenous traditional owners). Six monthly project updates in the form of videos, blog posts and photographs will be produced for the first 5 years of the project.',
  ],
};

export const creditDetails = (): JSX.Element => (
  <CreditDetails
    creditClass={details.creditClass}
    activities={details.activities}
    background="./background.jpg"
    title="Key activities and outcomes"
  />
);

export const creditsGauge = (): JSX.Element => (
  <CreditsGauge purchased={1527} issued={2237} />
);

// export const creditsWithGauge = (): JSX.Element => (
//   <Credits
//     numberOfHolders={credit.numberOfHolders}
//     numberOfProjects={credit.numberOfProjects}
//     amount={credit.amount}
//     totalAmount={credit.totalAmount}
//   />
// );

// export const gauge = (): JSX.Element => <Gauge amount={credit.amount} totalAmount={credit.totalAmount} />;

// export const formattedText = (): JSX.Element => (
//   <GaugeText number={credit.totalAmount} label="credits issued" format />
// );
//
// export const smallText = (): JSX.Element => (
//   <GaugeText number={credit.numberOfProjects} label="projects" variant="body2" />
// );
