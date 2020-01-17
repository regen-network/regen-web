import * as React from 'react';
import Card from 'web-components/lib/components/cards/Card';
import ProjectDeveloperCard from 'web-components/lib/components/cards/ProjectDeveloperCard';
import ImpactCard from 'web-components/lib/components/cards/ImpactCard';
import { User } from 'web-components/lib/components/user/UserInfo';
// import CreditCard, { CreditInfo } from 'web-components/lib/components/cards/CreditCard';
// import ProjectCard, { ProjectInfo } from 'web-components/lib/components/cards/ProjectCard';

export default {
  title: 'Components|Cards',
  component: Card,
};

const projectDeveloper: User = {
  name: 'Odonata',
  place: 'South Melbourne, Victoria, Australia',
  imgSrc: 'http://www.odonata.org.au/wp-content/uploads/2018/01/odinata-logo-only.png',
  description: 'Odonata is a not-for-profit entity supporting biodiversity impact solutions.',
};

const landSteward: User = {
  name: 'Ngarrindjeri Tribe',
  place: 'Southern Australia',
  imgSrc: '/tribe.png',
  description: 'The Ngarrindjeri culture is centered around the lower lakes of the Murray River.',
};

export const projectDeveloperCard = (): JSX.Element => (
  <ProjectDeveloperCard projectDeveloper={projectDeveloper} landSteward={landSteward} />
);

export const impactCard = (): JSX.Element => (
  <ImpactCard
    title="Above ground biomass"
    description="Increasing all living biomass which is located above the ground."
    imgSrc="/biomass.png"
  />
);

export const monitoredImpactCard = (): JSX.Element => (
  <ImpactCard
    title="Biodiversity"
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
// function onClick(): void {}
//
// export const creditCard = (): JSX.Element => (
//   <CreditCard credit={creditInfo} onClick={onClick} width="20.5rem" />
// );

// const projectInfo: ProjectInfo = {
//   name: 'Orana Park',
//   place: 'Bendigo, Victoria, Australia',
//   area: 4500,
//   imgSrc: '/orana.png',
// };
//
// export const projectCard = (): JSX.Element => (
//   <ProjectCard project={projectInfo} onClick={onClick} />
// );
