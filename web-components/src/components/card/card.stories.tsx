import * as React from 'react';
import Card from 'web-components/lib/components/card/Card';
import ProjectDeveloperCard from 'web-components/lib/components/card/ProjectDeveloperCard';
import EcoPracticeCard from 'web-components/lib/components/card/EcoPracticeCard';
import CreditCard, { CreditInfo } from 'web-components/lib/components/card/CreditCard';
import ProjectCard, { ProjectInfo } from 'web-components/lib/components/card/ProjectCard';

export default {
  title: 'Components|Card',
  component: Card,
};

const projectName: string = 'Odonata';
const projectSrc: string = 'http://www.odonata.org.au/wp-content/uploads/2018/01/odinata-logo-only.png';
const projectPlace: string = 'South Melbourne, Victoria, Australia';

const practiceName: string = 'Odonata';
const practiceSrc: string = '/no-till-ag.png';
const practiceDescription: string = 'South Melbourne, Victoria, Australia';

export const projectDeveloperCard = (): JSX.Element => (
  <ProjectDeveloperCard
    name={projectName}
    place={projectPlace}
    imgSrc={projectSrc}
  />
);

export const ecoPracticeCard = (): JSX.Element => (
  <EcoPracticeCard
    name={practiceName}
    description={practiceDescription}
    imgSrc={practiceSrc}
  />
);

const creditInfo: CreditInfo = {
  name: 'REDD+ in the Amazon',
  description: 'Reduce the emissions from deforestation and \
    forest degradation in the Amazon',
  imgSrc: '/Polyculture.png',
  place: 'Brazil',
  outcome: 'carbon sequestration',
  numberOfHolders: 1021,
  numberOfProjects: 25,
  amount: 70000,
  totalAmount: 93211,
  // unit: 'USD'
};

function onClick(): void {
  console.log('clicked');
}

export const creditCard = (): JSX.Element => (
  <CreditCard credit={creditInfo} onClick={onClick} />
);

const projectInfo: ProjectInfo = {
  name: 'Orana Park',
  place: 'Bendigo, Victoria, Australia',
  area: 4500,
  imgSrc: '/orana.png',
};

export const projectCard = (): JSX.Element => (
  <ProjectCard project={projectInfo} onClick={onClick} />
);
