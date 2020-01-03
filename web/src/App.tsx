import React from 'react';
import coorong from './assets/coorong.png';
import biodiversity from './assets/biodiversity.png';
import map from './assets/map.png';
import abu from './assets/abu.png';
import logo from './assets/logo.png';
import './App.css';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ThemeProvider from 'web-components/lib/theme/RegenThemeProvider';
import Title from 'web-components/lib/components/title';
import Description from 'web-components/lib/components/description';
import ProjectPlaceInfo from 'web-components/lib/components/place/ProjectPlaceInfo';
import ProjectDeveloperCard from 'web-components/lib/components/card/ProjectDeveloperCard';
import EcoPracticeCard from 'web-components/lib/components/card/EcoPracticeCard';
import CreditCard from 'web-components/lib/components/card/CreditCard';
import OutlinedButton from 'web-components/lib/components/buttons/OutlinedButton';
import Header from 'web-components/lib/components/header';

interface User {
  name: string;
  place: string;
  img: string;
}

interface Practice {
  name: string;
  description: string;
}

interface Metholody {
  practices: Practice[]
}

interface CreditClass {
  name: string;
  description: string;
  place: string;
  outcome: string;
  numberOfHolders: number,
  numberOfProjects: number,
  amount: number,
  totalAmount: number,
  methodology: Metholody;
  imgSrc: string;
}

interface Project {
  name: string;
  place: string;
  area: number;
  developer: User;
  summaryDescription: string;
  detailedDescription: string;
  creditClass: CreditClass;
}

const project: Project = {
  name: 'South Australia Coorong',
  place: 'Meningie, South Australia, Australia',
  area: 200,
  developer: {
    name: 'Odonota',
    place: 'South Melbourne, Victoria, Australia',
    img: 'http://www.odonata.org.au/wp-content/uploads/2018/01/odinata-logo-only.png',
  },
  summaryDescription: 'A unique biodiversity offsetting opportunity \
    in the RAMSAR recognised Coorong region of South Australia, \
    delivered in partnership with local indigenous landowners.',
  detailedDescription: 'This is a proposal for a 200 hectare fully \
    accredited biodiversity offset site called Mt Sandy, \
    located near Menindie in South Australia. The project will see up \
    to 1.3M Biodiversity Offset Units become available via formal \
    accreditation with the South Australian Department of Environment \
    and Water. The unique site comprises a pristine example of shrub \
    and woodlands associated with the RAMSAR recognised Coorong Region, \
    of particular cultural and environmental significance. \
    A comprehensive site management plan will be undertaken in \
    partnership with local indigenous land owners with the ownership \
    of this and eventually passed on to these groups. \
    This project represents a truly unique offsetting opportunity, \
    in proximity to Adelaide and in a vitally important bioregion.',
  creditClass: {
    name: 'Australian Biodiversity Units (ABU\'s)',
    description: 'An individual ABU represents a 1.5m square area of land of significant \
      environmental value that has been placed under a conservation covenant \
      and agreed management plan. The covenant and management plan secure \
      the long term preservation of the site and ensure the biodiversity value is \
      protected in perpetuity. Vegetation types may include forests, grasslands, \
      mallees, saltmarshes, scrubs, shrublands, wetlands, and woodlands.',
    place: 'Australia',
    outcome: 'biodiversity',
    numberOfHolders: 0,
    numberOfProjects: 1,
    amount: 0,
    totalAmount: 1000000,
    imgSrc: abu,
    methodology: {
      practices: [{
        name: 'Biodiversity',
        description: 'Fostering an increased number of species',
      }],
    },
  },
};

function onClick() {
  console.log('clicked');
}

// TODO: create component for project page
const App: React.FC = (): JSX.Element => {
  return (
    <ThemeProvider injectFonts>
      <Header logo={logo} />
      <div className="project-page">
        <img alt={project.name} src={coorong} />
        <div className="project-content">
          <Title variant="h1">{project.name}</Title>
          <ProjectPlaceInfo
            place={project.place}
            area={project.area}
          />
          <div className="project-description">
            <Description>{project.summaryDescription}</Description>
          </div>
          <ProjectDeveloperCard
            name={project.developer.name}
            place={project.developer.place}
            imgSrc={project.developer.img}
          />
          <Title variant="h2">Ecological Practices</Title>
          <div>
            {project.creditClass.methodology.practices.map((practice) =>
              <EcoPracticeCard
                name={practice.name}
                description={practice.description}
                imgSrc={biodiversity}
              />
            )}
          </div>
        </div>
        <img alt={project.name} src={map} />
        <div className="project-content">
          <Title variant="h2">Story</Title>
          <div className="project-description">
            <Description>{project.detailedDescription}</Description>
          </div>
          <OutlinedButton startIcon={<ArrowDownwardIcon />}>
            read more
          </OutlinedButton>
          <Title variant="h2">Credits</Title>
          <CreditCard
            credit={project.creditClass}
            onClick={onClick}
          />
        </div>
      </div>
      </ThemeProvider>
  );
};

export default App;
