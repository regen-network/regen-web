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

export function getProjectPageBaseData(creditClassId?: string | null): any {
  return {
    ...defaultProjectContext,
    '@type': creditClassId
      ? `regen:${creditClassId}-Project`
      : ['regen:ProjectPage', 'regen:Project'],
  };
}

export type qudtUnit = 'unit:HA' | 'unit:AC';

export const qudtUnitMap = {
  'unit:HA': 'hectares',
  'unit:AC': 'acres',
};

export function getProjectShapeIri(creditClassId?: string | null): string {
  return creditClassId
    ? `http://regen.network/${creditClassId}-ProjectShape`
    : 'http://regen.network/ProjectPageShape';
}
