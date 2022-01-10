import * as React from 'react';
import Tabs, { RegenTab } from 'web-components/lib/components/tabs';
import { DocumentationTable, DocumentRowData } from 'web-components/lib/components/table/DocumentationTable';

import CreditDetails, { CreditInfoProps } from 'web-components/lib/components/credits/CreditDetails';

export default {
  title: 'Components|Tabs',
  component: Tabs,
};

const details: CreditInfoProps = {
  creditClass: {
    name: 'Australian Biodiversity Units (ABU’s)',
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

const data: DocumentRowData[] = [
  {
    name: 'Monitoring',
    type: 'Monitoring',
    date: '2020-03-15T00:00:00.000Z',
    url: 'test',
  },
  {
    name: 'Issuance Documents',
    type: 'Issuance',
    date: '2020-03-15T00:00:00.000Z',
    url: 'test',
  },
  {
    name: 'Project Review',
    type: 'Project Review',
    date: '2020-03-15T00:00:00.000Z',
    url: 'test',
  },
];

const creditDetailsTab: RegenTab = {
  label: 'Overview',
  children: (
    <CreditDetails
      creditClass={details.creditClass}
      activities={details.activities}
      title="Key activities and outcomes"
    />
  ),
};

const documentationTab: RegenTab = {
  label: 'Documentation',
  children: <DocumentationTable rows={data} />,
};

const tabs: RegenTab[] = [creditDetailsTab, documentationTab];

export const mrvTabs = (): JSX.Element => <Tabs background="./background.jpg" tabs={tabs} />;
