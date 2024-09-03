import Certificate from '.';
import { certificateLabels, certificateMock } from './certificate.mock';

export default {
  title: 'Certificate',
  component: Certificate,
};

export const certificate = (): JSX.Element => (
  <Certificate
    {...certificateMock}
    background="./certificate-bg.png"
    linkComponent={({ children, href }) => <a href={href}>{children}</a>}
    labels={certificateLabels}
  />
);
