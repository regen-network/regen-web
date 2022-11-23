export interface BatchMetadataLD {
  '@context'?: Context;
  '@type'?: string;
}

interface Context {
  schema: string;
  regen: string;
}
