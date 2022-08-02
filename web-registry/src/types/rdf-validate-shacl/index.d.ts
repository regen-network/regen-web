// Copied from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/rdf-validate-shacl
// and edited to add optional group to SHACLValidator.Options and export ValidationReport

// Type definitions for rdf-validate-shacl 0.2
// Project: https://github.com/zazuko/rdf-validate-shacl#readme
// Definitions by: Tomasz Pluskiewicz <https://github.com/tpluscode>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
declare module 'rdf-validate-shacl' {
  import * as RDF from 'rdf-js';
  import DataFactory = require('./src/data-factory');
  export import ValidationReport = require('./src/validation-report');

  declare namespace SHACLValidator {
    interface Options {
      factory?: RDF.DataFactory & RDF.DatasetCoreFactory;
      maxErrors?: number;
      group?: string;
    }
  }

  declare class SHACLValidator {
    constructor(shapes: RDF.DatasetCore, options?: SHACLValidator.Options);
    factory: DataFactory;
    depth: number;
    validate(data: RDF.DatasetCore): ValidationReport;
    nodeConformsToShape(focusNode: RDF.Term, shapeNode: RDF.Term): boolean;
  }

  // export interface ValidationReport;
  export default SHACLValidator;
}
