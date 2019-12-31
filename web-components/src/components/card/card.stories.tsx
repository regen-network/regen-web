import * as React from 'react';
import Card from 'web-components/lib/components/card/Card';
import ProjectDeveloperCard from 'web-components/lib/components/card/ProjectDeveloperCard';
import EcoPracticeCard from 'web-components/lib/components/card/EcoPracticeCard';

export default {
  title: 'Components|Card',
  component: Card,
}

const projectName: string = "Odonata";
const projectSrc: string = "http://www.odonata.org.au/wp-content/uploads/2018/01/odinata-logo-only.png";
const projectPlace: string = "South Melbourne, Victoria, Australia";

const practiceName: string = "Odonata";
const practiceSrc: string = "/no-till-ag.png";
const practiceDescription: string = "South Melbourne, Victoria, Australia";

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
    width="9.375rem"
  />
)
