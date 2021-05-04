/* eslint-disable prettier/prettier */
import { validate } from './rdf';

describe('validate', () => {
  it('validate against property shapes with given group', async () => {
    const data = {
      '@context': {
        schema: 'http://schema.org/',
        regen: 'http://regen.network/',
      },
      '@type': 'regen:ProjectPlan',
      'schema:name': 'Awesome Project',
    };
    const shapes = [
      {
        '@id': '_:b0',
        'http://www.w3.org/ns/shacl#path': [
          {
            '@id': 'http://regen.network/creditClass',
          },
        ],
        'http://www.w3.org/ns/shacl#class': [
          {
            '@id': 'http://regen.network/CreditClass',
          },
        ],
        'http://www.w3.org/ns/shacl#nodeKind': [
          {
            '@id': 'http://www.w3.org/ns/shacl#IRI',
          },
        ],
        'http://www.w3.org/ns/shacl#maxCount': [
          {
            '@value': 1,
          },
        ],
        'http://www.w3.org/ns/shacl#minCount': [
          {
            '@value': 1,
          },
        ],
        'http://www.w3.org/ns/shacl#group': [
          {
            '@id': 'http://regen.network/ProjectPlanCreditClassGroup',
          },
        ],
      },
      {
        '@id': '_:b1',
        'http://www.w3.org/ns/shacl#path': [
          {
            '@id': 'http://schema.org/name',
          },
        ],
        'http://www.w3.org/ns/shacl#name': [
          {
            '@value': 'Project name',
          },
        ],
        'http://www.w3.org/2000/01/rdf-schema#label': [
          {
            '@value': 'project name',
          },
        ],
        'http://www.w3.org/ns/shacl#description': [
          {
            '@value': 'This is the name of the farm, ranch, property, or conservation project.',
          },
        ],
        'http://www.w3.org/ns/shacl#datatype': [
          {
            '@id': 'http://www.w3.org/2001/XMLSchema#string',
          },
        ],
        'http://www.w3.org/ns/shacl#maxCount': [
          {
            '@value': 1,
          },
        ],
        'http://www.w3.org/ns/shacl#minCount': [
          {
            '@value': 1,
          },
        ],
        'http://www.w3.org/ns/shacl#group': [
          {
            '@id': 'http://regen.network/ProjectPlanBasicInfoGroup',
          },
        ],
      },
      {
        '@id': 'http://regen.network/CreditClass',
      },
      {
        '@id': 'http://regen.network/ProjectPlan',
      },
      {
        '@id': 'http://regen.network/ProjectPlanBasicInfoGroup',
        '@type': ['http://www.w3.org/ns/shacl#PropertyGroup'],
        'http://www.w3.org/2000/01/rdf-schema#label': [
          {
            '@value': 'Group Info',
          },
        ],
        'http://www.w3.org/ns/shacl#order': [
          {
            '@value': '1',
            '@type': 'http://www.w3.org/2001/XMLSchema#decimal',
          },
        ],
      },
      {
        '@id': 'http://regen.network/ProjectPlanCreditClassGroup',
        '@type': ['http://www.w3.org/ns/shacl#PropertyGroup'],
        'http://www.w3.org/2000/01/rdf-schema#label': [
          {
            '@value': 'Choose a Credit Class',
          },
        ],
        'http://www.w3.org/ns/shacl#order': [
          {
            '@value': '0',
            '@type': 'http://www.w3.org/2001/XMLSchema#decimal',
          },
        ],
      },
      {
        '@id': 'http://regen.network/ProjectPlanShape',
        '@type': ['http://www.w3.org/2000/01/rdf-schema#Class', 'http://www.w3.org/ns/shacl#NodeShape'],
        'http://www.w3.org/ns/shacl#targetClass': [
          {
            '@id': 'http://regen.network/ProjectPlan',
          },
        ],
        'http://www.w3.org/2000/01/rdf-schema#label': [
          {
            '@value': 'Project Plan',
          },
        ],
        'http://www.w3.org/2000/01/rdf-schema#subClassOf': [
          {
            '@id': 'http://www.w3.org/2000/01/rdf-schema#Resource',
          },
        ],
        'http://www.w3.org/ns/shacl#property': [
          {
            '@id': '_:b0',
          },
          {
            '@id': '_:b1',
          },
        ],
      },
      {
        '@id': 'http://regen.network/creditClass',
      },
      {
        '@id': 'http://schema.org/name',
      },
      {
        '@id': 'http://www.w3.org/2000/01/rdf-schema#Class',
      },
      {
        '@id': 'http://www.w3.org/2000/01/rdf-schema#Resource',
      },
      {
        '@id': 'http://www.w3.org/2001/XMLSchema#string',
      },
      {
        '@id': 'http://www.w3.org/ns/shacl#IRI',
      },
      {
        '@id': 'http://www.w3.org/ns/shacl#NodeShape',
      },
      {
        '@id': 'http://www.w3.org/ns/shacl#PropertyGroup',
      },
    ];

    const report1 = await validate(JSON.stringify(shapes), JSON.stringify(data));
    expect(report1.conforms).toEqual(false);
    expect(report1.results.length).toEqual(1);

    const report2 = await validate(JSON.stringify(shapes), JSON.stringify(data), 'http://regen.network/ProjectPlanBasicInfoGroup');
    expect(report2.conforms).toEqual(true);
  });
});
