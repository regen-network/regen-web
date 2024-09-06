import Document from './';

export default {
  title: 'Document',
  component: Document,
};

export const document = (): JSX.Element => (
  <Document name="certificate" link="/" linkText={`View 476d7a44 »`} />
);
