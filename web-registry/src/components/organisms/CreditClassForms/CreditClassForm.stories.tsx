import { MultiStepTemplate } from 'components/templates/MultiStepTemplate';
import { Formik } from 'formik';
import { Center } from 'web-components/lib/components/box';
import {
  CreateCreditClassForm,
  createCreditClassSteps,
} from './CreateCreditClassForm';
import {
  CreditClassForm,
  creditClassBaseValues,
  CreditClassValues,
} from './CreditClassForm';
import { ReviewCreditClass } from './ReviewCreditClass';

export default {
  title: 'Registry/Organisms/Credit Class Form',
  component: CreditClassForm,
};

const stubMetadata = {
  '@context': {
    schema: 'http://schema.org/',
    regen: 'http://regen.network/',
    qudt: 'http://qudt.org/schema/qudt/',
    unit: 'http://qudt.org/vocab/unit/',
    xsd: 'http://www.w3.org/2001/XMLSchema#',
  },
  '@type': 'regen:C01-Project',
  'schema:name': '',
  'regen:vcsProjectId': 0,
  'regen:vcsProjectPage': {
    '@type': 'schema:URL',
    '@value': '',
  },
  'schema:description': '',
  'regen:projectDeveloper': {
    '@type': 'regen:OrganizationDisplay',
    'schema:name': '',
    'schema:description': '',
    'regen:address': '',
    'regen:showOnProjectPage': true,
  },
  'regen:projectType': '',
  'regen:projectActivity': {
    'schema:name': '',
    'schema:url': {
      '@type': 'schema:URL',
      '@value': '',
    },
  },
  'regen:offsetGenerationMethod': '',
  'regen:vcsMethodology': {
    'schema:name': '',
    'schema:url': {
      '@type': 'schema:URL',
      '@value': '',
    },
  },
  'regen:projectSize': {
    'qudt:unit': {
      '@type': 'qudt:Unit',
      '@value': 'unit:HA',
    },
    'qudt:numericValue': {
      '@type': 'xsd:double',
      '@value': 0,
    },
  },
  'regen:projectStartDate': {
    '@type': 'xsd:date',
    '@value': '',
  },
  'regen:projectEndDate': {
    '@type': 'xsd:date',
    '@value': '',
  },
  'schema:location': {
    '@context': {
      type: '@type',
      '@vocab': 'https://purl.org/geojson/vocab#',
      coordinates: {
        '@container': '@list',
      },
      bbox: {
        '@container': '@list',
      },
    },
  },
};

const onSubmit = () => void null;

export const creditClassForm = (): JSX.Element => (
  <Center sx={{ m: '0 auto', maxWidth: 740 }}>
    <Formik initialValues={creditClassBaseValues} onSubmit={onSubmit}>
      <CreditClassForm />
    </Formik>
  </Center>
);

export const createCreditClassForm = (): JSX.Element => (
  <MultiStepTemplate
    formId="create-credit-class-story"
    initialValues={{
      ...creditClassBaseValues,
      admin: 'adminAddress',
      fee: '20 REGEN',
    }}
    steps={createCreditClassSteps}
  >
    <CreateCreditClassForm onSubmit={console.log} />
  </MultiStepTemplate>
);

export const reviewCreditClass = (): JSX.Element => (
  <Formik initialValues={fullFormValues} onSubmit={onSubmit}>
    <ReviewCreditClass />
  </Formik>
);

const fullFormValues: CreditClassValues = {
  admin: 'cosmos15h5eszss2wtavw2x73f66jqp00sh4kewqf9ah0',
  issuers: [
    'cosmos15h5eszss2wtavw2x73f66jqp00sh4kewqf9ah0',
    'cosmos15h5eszss2wtavw2x73f66jqp00sh4kewqf9ah0',
    'cosmos15h5eszss2wtavw2x73f66jqp00sh4kewqf9ah0',
  ],
  creditTypeAbbr: 'REGEN',
  fee: '20 REGEN',
  metadata: JSON.stringify(stubMetadata, null, 2),
};
