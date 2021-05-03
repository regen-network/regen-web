import Parser from '@rdfjs/parser-jsonld';
import SHACLValidator from 'rdf-validate-shacl';
import factory from 'rdf-ext';
import DatasetExt from 'rdf-ext/lib/Dataset';
import { Readable } from 'stream';
import { DatasetCore, Term } from 'rdf-js';

// Types pulled from @types/rdf-validate-shacl/src
// since they are not exported
interface ValidationResult {
  term: Term;
  dataset: DatasetCore;
  readonly message: Term[];
  readonly path: Term | null;
  readonly focusNode: Term | null;
  readonly severity: Term | null;
  readonly sourceConstraintComponent: Term | null;
  readonly sourceShape: Term | null;
}

interface ValidationReport {
  term: Term;
  dataset: DatasetCore;
  conforms: boolean;
  results: ValidationResult[];
}

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

// validate validates the data in dataStr as JSON-LD string
// using the SHACL graph in shapesStr.
export async function validate(shapesStr: string, dataStr: string, group?: string): Promise<ValidationReport> {
  const shapes = await loadDataset(shapesStr);
  const data = await loadDataset(dataStr);

  // @ts-ignore
  const validator = new SHACLValidator(shapes, { factory, group }); 
  const report = await validator.validate(data);

  console.log(report);
  for (const result of report.results) {
    // See https://www.w3.org/TR/shacl/#results-validation-result for details
    // about each property
    console.log(result.message);
    console.log(result.path);
    console.log(result.focusNode);
    console.log(result.severity);
    console.log(result.sourceConstraintComponent);
    console.log(result.sourceShape);
  }

  return report;
}
