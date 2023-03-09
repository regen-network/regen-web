interface Methodology {
  'schema:identifier': string;
  'schema:name': string;
  'schema:url': string;
  'schema:version': string;
}

export interface ApprovedMethodologies {
  '@type': 'schema:ItemList';
  'schema:itemListElement': Methodology[];
  'schema:url'?: string;
}
