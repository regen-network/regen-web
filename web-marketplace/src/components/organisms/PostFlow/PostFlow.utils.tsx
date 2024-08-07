import { PostFormSchemaType } from '../PostForm/PostForm.schema';

export const getFiles = (files?: PostFormSchemaType['files']) => {
  return files?.map(file => {
    return {
      iri: file.iri,
      name: file.name,
      description: file.description,
      location: { wkt: file.location }, // TODO migrate from geojson to wkt
      locationType: file.locationType,
      credit: file.credit,
    };
  });
};

export const timer = (ms: number): Promise<NodeJS.Timeout> =>
  new Promise(res => setTimeout(res, ms));
