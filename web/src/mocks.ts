import { User } from 'web-components/lib/components/user/UserInfo';
import abu from './assets/abu.png';
import pest from './assets/pest.png';
import fox from './assets/fox.png';
import weeds from './assets/weeds.png';
import water from './assets/water.png';
import mammals from './assets/mammals.png';
import herbivory from './assets/herbivory.png';
import biodiversity from './assets/biodiversity.png';
import soc from './assets/soc.png';
import biomass from './assets/biomass.png';
// import soil from './assets/soil.png';

interface Action {
  name: string;
  description: string;
  imgSrc: string;
}

export interface Impact {
  name: string;
  description: string;
  imgSrc: string;
  monitored: boolean;
}

interface Metholody {
  actions: Action[];
  impact: Impact[];
}

interface CreditClass {
  name: string;
  description: string;
  place: string;
  outcome: string;
  activities: string;
  numberOfHolders: number;
  numberOfProjects: number;
  amount: number;
  totalAmount: number;
  methodology: Metholody;
  imgSrc: string;
}

export interface Project {
  name: string;
  place: string;
  area: number;
  developer: User;
  steward: User;
  summaryDescription: string;
  detailedDescription: string;
  creditClass: CreditClass;
}

export const project: Project = {
  name: 'Coorong Project',
  place: 'Meningie, South Australia, Australia',
  area: 200,
  developer: {
    name: 'Odonota',
    place: 'South Melbourne, Victoria, Australia',
    imgSrc: 'http://www.odonata.org.au/wp-content/uploads/2018/01/odinata-logo-only.png',
    description: 'Odonata is a not-for-profit entity supporting biodiversity impact solutions.',
  },
  steward: {
    name: 'Ngarrindjeri Tribe',
    place: 'Southern Australia',
    imgSrc:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Ngarrindjeri_Nation_Flag.svg/250px-Ngarrindjeri_Nation_Flag.svg.png',
    description: 'The Ngarrindjeri culture is centered around the lower lakes of the Murray River.',
  },
  summaryDescription:
    'This project is restoring and conserving a large area of native grassland in Southern Australia.',
  detailedDescription:
    'This property is a rare pocket of wetlands and woodlands located near the township of Menindee South Australia, nestled in between the Coorong national park and Lake Albert.\n\nAs one of the few remaining sections of privately owned remnant vegetation in the area, this represents a unique opportunity for long term preservation. The Coorong, Lake Alexandrina and Lake Albert Wetland is an international significant RAMSAR wetland ecosystems at the intersection of the Murray River and Southern Ocean.\n\nThis vital habitat comprises a unique mix of both freshwater and saltwater wetlands and coastal woodlands. The Coorong is the heart of the traditional lands of Ngarrindjeri people, who have hunted and camped on the Mt Sandy property for thousands of years.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  creditClass: {
    name: 'Australian Biodiversity Units (ABU’s)',
    description:
      'ABU’s are an Australian Government endorsed biodiversity credit. An individual ABU represents a 1.5m square area of land of significant environmental value that has been placed under a conservation covenant and agreed management plan. The covenant and management plan secure the long term preservation of the site and ensure the biodiversity value is protected in perpetuity. Vegetation types may include forests, grasslands, mallees, saltmarshes, scrubs, shrublands, wetlands, and woodlands. ABU’s are an innovative and unique way for organisations to preserve a tangible section of Australia’s unique natural habitat.',
    activities:
      'Site accredited as a Specific Environmental Benefit (SEB) site and credits created by the South Australian Department of Environment and Water. A land management services agreement will be established with a local indigenous group, employing people from the local community. The site will be managed in accordance with an agreed management plan to reduce weed pressure, improve the biodiversity value of the location and preserve the value of the land in perpetuity. After 10 years the land will be vetted to Rigney Namawi Pty Ltd (local indigenous traditional owners). Six monthly project updates in the form of videos, blog posts and photographs will be produced for the first 5 years of the project.',
    place: 'Australia',
    outcome: 'biodiversity',
    numberOfHolders: 0,
    numberOfProjects: 1,
    amount: 0,
    totalAmount: 1000000,
    imgSrc: abu,
    methodology: {
      actions: [
        {
          name: 'Reduce pest populations',
          description: 'Monitor and reduce the population of foxes, cats, dingos/wild dogs.',
          imgSrc: pest,
        },
        {
          name: 'Prevent any new weeds or pests becoming established',
          description:
            'Monitor sites for any new weeds or pests. If observed, plan and implement a control program.',
          imgSrc: fox,
        },
        {
          name: 'Eradicate populations of declared weeds',
          description: 'Conserving the plant habitats in the area along rivers and streams.',
          imgSrc: weeds,
        },
        {
          name: 'Decommission all artificial water sources',
          description:
            'Identify artificial water sources. Prioritise those close to boundaries and decommission by either blocking inflow or excluding stock with fences.',
          imgSrc: water,
        },
        {
          name: 'Limit impact from native mammals',
          description:
            'Determine the carrying capacity for the property and monitor the population to keep the number below carrying capacity.',
          imgSrc: mammals,
        },
        {
          name: 'Determine impacts for herbivory on native vegetation',
          description:
            'Establish a minimum of three fenced exclosures to prevent grazing from herbivores (both native and introduced).',
          imgSrc: herbivory,
        },
      ],
      impact: [
        {
          name: 'Biodiversity',
          description: 'Healthy ecosystems and rich biodiversity are fundamental to life on our planet.',
          imgSrc: biodiversity,
          monitored: true,
        },
        {
          name: 'Soil organic carbon',
          description: 'Sequestering carbon in SOC is one way to mitigate climate change.',
          imgSrc: soc,
          monitored: false,
        },
        {
          name: 'Above ground biomass',
          description: 'Increasing all living biomass which is located above the ground.',
          imgSrc: biomass,
          monitored: false,
        },
        {
          name: 'Soil health',
          description:
            'The capacity of soil to function as a vital living ecosystem that sustains plants, animals, and humans.',
          imgSrc: require('./assets/soil.png'),
          monitored: false,
        },
      ],
    },
  },
};
