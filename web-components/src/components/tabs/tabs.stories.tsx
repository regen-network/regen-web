import CreditDetails, { CreditInfoProps } from '../credits/CreditDetails';
import CoBenefitsIcon from '../icons/CoBenefitsIcon';
import { ProjectPageIcon } from '../icons/ProjectPageIcon';
import {
  DocumentationTable,
  DocumentRowData,
} from '../table/DocumentationTable/DocumentationTable';
import { DOCUMENTATION_HEAD_CELLS } from '../table/DocumentationTable/DocumentationTable.mock';
import Tabs, { RegenTab } from '.';
import { IconTabProps } from './IconTab';
import { IconTabs } from './IconTabs';

export default {
  title: 'Tabs',
  component: Tabs,
};

const details: CreditInfoProps = {
  title: 'Sample',
  creditClass: {
    name: 'Australian Biodiversity Units (ABU’s)',
    tag: 'soil',
    keyOutcomesActivitiesDesc: 'test',
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

const data: DocumentRowData[] = [
  {
    name: 'Monitoring',
    type: 'Monitoring',
    date: '2020-03-15T00:00:00.000Z',
    url: 'test',
    ledger: 'test',
  },
  {
    name: 'Issuance Documents',
    type: 'Issuance',
    date: '2020-03-15T00:00:00.000Z',
    url: 'test',
    ledger: 'test',
  },
  {
    name: 'Project Review',
    type: 'Project Review',
    date: '2020-03-15T00:00:00.000Z',
    url: 'test',
    ledger: 'test',
  },
];

const creditDetailsTab: RegenTab = {
  label: 'Overview',
  content: (
    <CreditDetails
      creditClass={details.creditClass}
      activities={details.activities}
      title="Key activities and outcomes"
    />
  ),
};

const documentationTab: RegenTab = {
  label: 'Documentation',
  content: (
    <DocumentationTable
      rows={data}
      headCells={DOCUMENTATION_HEAD_CELLS}
      tableAriaLabel="Documentation Table"
      viewLedgerText="View on ledger"
      viewDocumentText="View document"
    />
  ),
};

const tabs: RegenTab[] = [creditDetailsTab, documentationTab];

export const mrvTabs = (): JSX.Element => (
  <Tabs background="./background.jpg" tabs={tabs} />
);

const demoTabs: IconTabProps[] = [
  {
    label: 'Portfolio',
    icon: <CoBenefitsIcon />,
    content: <>portolio content</>,
  },
  {
    label: 'Projects',
    icon: <ProjectPageIcon />,
    content: <>projects content</>,
  },
];

export const iconTabs = (): JSX.Element => <IconTabs tabs={demoTabs} />;
