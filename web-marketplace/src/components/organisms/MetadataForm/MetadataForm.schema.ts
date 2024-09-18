import { z } from 'zod';

import { isValidJSON } from 'web-components/src/components/inputs/validation';

import { ShaclGraphByUriQuery } from 'generated/graphql';
import { getCompactedPath, getProjectBaseData, validate } from 'lib/rdf';

type Params = {
  creditClassId?: string;
  graphData?: ShaclGraphByUriQuery;
  requiredMessage: string;
  invalidJSON: string;
};

let metadataErrors: string | undefined;

export const getMetadataFormSchema = ({
  creditClassId,
  graphData,
  requiredMessage,
  invalidJSON,
}: Params) =>
  z.object({
    metadata: z
      .string()
      .nonempty(requiredMessage)
      .refine(value => isValidJSON(value), { message: invalidJSON })
      .refine(
        async metadata => {
          metadataErrors = undefined;
          if (creditClassId && graphData?.shaclGraphByUri?.graph) {
            const projectPageData = {
              ...getProjectBaseData(creditClassId),
              ...JSON.parse(metadata),
            };
            const report = await validate(
              graphData.shaclGraphByUri.graph,
              projectPageData,
              'https://schema.regen.network#ProjectPageMetadataGroup',
            );
            for (const result of report.results) {
              const path: string = result.path.value;
              const message = result.message?.[0]?.value;
              const compactedPath = getCompactedPath(path);
              if (compactedPath && message) {
                metadataErrors = (metadataErrors ?? '').concat(
                  `${compactedPath}: ${message}\n`,
                );
              }
            }
          }
          return !metadataErrors;
        },
        { message: metadataErrors },
      ),
  });

export const metadataFormDraftSchema = z.object({
  metadata: z.string().optional().nullable(),
});

export type MetadataFormSchemaType = z.infer<
  ReturnType<typeof getMetadataFormSchema>
>;
