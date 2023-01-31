import Parser from '@rdfjs/parser-jsonld';
import factory from 'rdf-ext';
import DatasetExt from 'rdf-ext/lib/Dataset';
import { ValidationReport } from 'rdf-validate-shacl';
import { Readable } from 'stream';

// loadDataset parses and loads the given JSON-LD string into
// the rdf-ext data factory.
async function loadDataset(jsonLd: string): Promise<DatasetExt> {
  const stream = new Readable({
    read: () => {
      stream.push(jsonLd);
      stream.push(null);
    },
  });
  const parser = new Parser({ factory });
  return factory.dataset().import(parser.import(stream));
}

// validate validates the data in dataStr as JSON-LD
// using the SHACL graph in shapesJSON.
// If an optional group is passed, it will validate against shapes
// of the given sh:group.
export async function validate(
  shapesJSON: any,
  dataJSON: any,
  group?: string,
): ValidationReport {
  const shapes = await loadDataset(JSON.stringify(shapesJSON));
  const data = await loadDataset(JSON.stringify(dataJSON));
  const result: ValidationReport = await import('./rdf-lib').then(
    async ({ SHACLValidator }) => {
      const validator = new SHACLValidator(shapes, { factory, group });
      const report = await validator.validate(data);

      // console.log(report);
      // for (const result of report.results) {
      //   // See https://www.w3.org/TR/shacl/#results-validation-result for details
      //   // about each property
      //   console.log(result.message);
      //   console.log(result.path);
      //   console.log(result.focusNode);
      //   console.log(result.severity);
      //   console.log(result.sourceConstraintComponent);
      //   console.log(result.sourceShape);
      // }

      return report;
    },
  );

  return result;
}

export const defaultProjectContext: { '@context': { [key: string]: string } } =
  {
    '@context': {
      regen: 'http://regen.network/',
      schema: 'http://schema.org/',
      xsd: 'http://www.w3.org/2001/XMLSchema#',
      qudt: 'http://qudt.org/schema/qudt/',
      unit: 'http://qudt.org/vocab/unit/',
      geojson: 'https://purl.org/geojson/vocab#',
    },
  };

// getCompactedPath returns the path that could be found in some compacted JSON-LD data
// based on the expandedPath (comes from data returned by `validate` which returns expanded JSON-LD)
// and the defaultProjectContext.
// This is useful to map validation report results path to form field names which used compacted JSON-LD.
export function getCompactedPath(expandedPath: string): string | undefined {
  const context = defaultProjectContext['@context'];
  const key = Object.keys(context).find(key =>
    expandedPath.includes(context[key]),
  );
  if (key) {
    return expandedPath.replace(context[key], `${key}:`);
  }
  return;
}

// getProjectCreateBaseData returns the base metadata for a project that
// is still in draft state (no on-chain project yet).
// Its metadata, entirely stored in the off-chain table project.metadata for now,
// has both unanchored and anchored data which is it has both types
// - `regen:Project-Page` (for unanchored data)
// - and `regen:CXX-Project` (for anchored data)
export function getProjectCreateBaseData(creditClassId: string): any {
  return {
    ...defaultProjectContext,
    '@type': [`regen:${creditClassId}-Project`, 'regen:Project-Page'],
    'regen:creditClassId': creditClassId,
  };
}

export function getProjectBaseData(creditClassId?: string | null): any {
  return {
    ...defaultProjectContext,
    '@type': creditClassId
      ? `regen:${creditClassId}-Project`
      : 'regen:Project-Page',
  };
}

export type qudtUnit = 'unit:HA' | 'unit:AC';

export const qudtUnitMap = {
  'unit:HA': 'hectares',
  'unit:AC': 'acres',
};

export const getAreaUnit = (value?: qudtUnit): string => {
  if (!value) return '';
  return qudtUnitMap[value] || '';
};

export function getProjectShapeIri(creditClassId?: string | null): string {
  return creditClassId
    ? `http://regen.network/${creditClassId}-ProjectShape`
    : 'http://regen.network/ProjectPageShape';
}

const unanchoredProjectContext = {
  '@context': {
    regen: 'http://regen.network/',
    schema: 'http://schema.org/',
  },
};

const unanchoredProjectKeys = [
  'regen:creditClassId',
  'schema:description',
  'regen:previewPhoto',
  'regen:galleryPhotos',
  'regen:videoURL',
  'schema:creditText',
];

function getFilteredProjectMetadata(
  metadata: object,
  anchored: boolean = true,
): object {
  return Object.fromEntries(
    Object.entries(metadata).filter(([key]) => {
      const unanchored = unanchoredProjectKeys.includes(key);
      if (anchored) {
        return !unanchored;
      } else {
        return unanchored;
      }
    }),
  );
}

// TODO update metadata type and return type
export function getAnchoredProjectMetadata(
  metadata: object,
  creditClassId?: string,
): object {
  const filtered = getFilteredProjectMetadata(metadata);
  return {
    ...filtered,
    ...defaultProjectContext,
    '@type': `regen:${creditClassId}-Project`,
  };
}

// TODO update metadata type and return type
export function getUnanchoredProjectMetadata(
  metadata: object,
  onChainId: string,
): object {
  const filtered = getFilteredProjectMetadata(metadata, false);
  return {
    ...filtered,
    ...unanchoredProjectContext,
    '@type': 'regen:Project-Page',
    '@id': `${window.location.origin}/project/${onChainId}`,
  };
}
