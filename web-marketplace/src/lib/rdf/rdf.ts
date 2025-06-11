import { msg, plural } from '@lingui/core/macro';
import Parser from '@rdfjs/parser-jsonld';
import factory from 'rdf-ext';
import DatasetExt from 'rdf-ext/lib/Dataset';
import { Readable } from 'stream';

import { NestedPartial } from 'types/nested-partial';
import {
  AnchoredProjectMetadataLD,
  ProjectMetadataLD,
  ProjectPageMetadataLD,
} from 'lib/db/types/json-ld';
import { TranslatorType } from 'lib/i18n/i18n.types';

import {
  ANCHORED_PROJECT_CONTEXT,
  DEFAULT_PROJECT_CONTEXT,
  UNANCHORED_PROJECT_CONTEXT,
  UNANCHORED_PROJECT_KEYS,
} from './rdf.constants';

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

/** validate validates the data in dataStr as JSON-LD
 * using the SHACL graph in shapesJSON.
 * If an optional group is passed, it will validate against shapes
 * of the given sh:group.
 */
export async function validate(shapesJSON: any, dataJSON: any, group?: string) {
  const shapes = await loadDataset(JSON.stringify(shapesJSON));
  const data = await loadDataset(JSON.stringify(dataJSON));
  const result = await import('./rdf-lib').then(async ({ SHACLValidator }) => {
    const validator = new SHACLValidator(shapes, { factory, group });
    const report = await validator.validate(data);
    return report;
  });

  return result;
}

/**  getCompactedPath returns the path that could be found in some compacted JSON-LD data
 * based on the expandedPath (comes from data returned by `validate` which returns expanded JSON-LD)
 * and the DEFAULT_PROJECT_CONTEXT.
 * This is useful to map validation report results path to form field names which used compacted JSON-LD.
 */
export function getCompactedPath(expandedPath: string): string | undefined {
  const key = Object.keys(DEFAULT_PROJECT_CONTEXT).find(key =>
    expandedPath.includes(DEFAULT_PROJECT_CONTEXT[key]),
  );
  if (key) {
    return expandedPath.replace(DEFAULT_PROJECT_CONTEXT[key], `${key}:`);
  }
  return;
}

/** getProjectCreateBaseData returns the base metadata for a project that
 * is still in draft state (no on-chain project yet).
 * Its metadata, entirely stored in the off-chain table project.metadata for now,
 * has both unanchored and anchored data which is why it has both types:
 * - `regen:Project-Page` (for unanchored data)
 * - and `regen:CXX-Project` (for anchored data)
 */
export function getProjectCreateBaseData(
  creditClassId?: string,
): Partial<Omit<ProjectMetadataLD, '@type'>> & { '@type': string[] } {
  return {
    '@context': {
      ...ANCHORED_PROJECT_CONTEXT,
      ...UNANCHORED_PROJECT_CONTEXT,
    },
    '@type': creditClassId
      ? [`regen:${creditClassId}-Project`, 'regen:Project-Page']
      : ['regen:Project-Page'],
    'regen:creditClassId': creditClassId,
  };
}

/** getProjectBaseData returns the base JSON-LD anchored metadata to validate a project,
 * with the appropriate @context and @type.
 */
export function getProjectBaseData(
  creditClassId: string | null,
): Partial<ProjectMetadataLD> {
  return {
    '@context': ANCHORED_PROJECT_CONTEXT,
    '@type': `regen:${creditClassId}-Project`,
  };
}

export type qudtUnit = 'unit:HA' | 'unit:AC';

export const getAreaUnit = (
  _: TranslatorType,
  value?: qudtUnit,
  area?: number,
): string => {
  if (!value || !area) return '';
  if (value === 'unit:HA') {
    // return t(i18n)`${plural(area, {
    //   one: 'hectare',
    //   other: 'hectares',
    // })}`;
    return _(
      msg`${plural(area, {
        one: 'hectare',
        other: 'hectares',
      })}`,
    );
  }
  if (value === 'unit:AC') {
    // return t(i18n)`${plural(area, {
    //   one: 'acre',
    //   other: 'acres',
    // })}`;
    return _(
      msg`${plural(area, {
        one: 'acre',
        other: 'acres',
      })}`,
    );
  }
  return value;
};

export function getProjectShapeIri(creditClassId: string): string {
  return `regen:${creditClassId}-ProjectShape`;
}

function getFilteredProjectMetadata(
  metadata: object,
  anchored: boolean = true,
): object {
  return Object.fromEntries(
    Object.entries(metadata).filter(([key]) => {
      const unanchored = UNANCHORED_PROJECT_KEYS.includes(key);
      if (anchored) {
        return !unanchored;
      } else {
        return unanchored;
      }
    }),
  );
}

export function getAnchoredProjectMetadata(
  metadata: ProjectMetadataLD,
  creditClassId?: string,
): AnchoredProjectMetadataLD {
  const filtered = getFilteredProjectMetadata(metadata) as ProjectMetadataLD;
  return getAnchoredProjectBaseMetadata(
    filtered,
    creditClassId,
  ) as AnchoredProjectMetadataLD;
}

export function getAnchoredProjectBaseMetadata(
  metadata: NestedPartial<ProjectMetadataLD>,
  creditClassId?: string,
) {
  return {
    ...metadata,
    '@context': { ...ANCHORED_PROJECT_CONTEXT, ...metadata?.['@context'] },
    '@type': `regen:${creditClassId}-Project`,
  };
}

export function getUnanchoredProjectMetadata(
  metadata: ProjectMetadataLD,
  onChainId: string,
): ProjectPageMetadataLD {
  const filtered = getFilteredProjectMetadata(
    metadata,
    false,
  ) as ProjectMetadataLD;
  return getUnanchoredProjectBaseMetadata(
    filtered,
    onChainId,
  ) as ProjectPageMetadataLD;
}

export function getUnanchoredProjectBaseMetadata(
  metadata: NestedPartial<ProjectMetadataLD>,
  onChainId: string,
): NestedPartial<ProjectPageMetadataLD> {
  return {
    ...metadata,
    '@context': UNANCHORED_PROJECT_CONTEXT,
    '@type': 'regen:Project-Page',
    '@id': `${window.location.origin}/project/${onChainId}`,
  };
}
