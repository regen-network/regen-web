import { certificateMock } from 'web-components/lib/components/certificate/certificate.mock';

type Params = {
  certificateId: string;
};

export const useFetchCertificate = ({
  certificateId,
}: Params): typeof certificateMock => {
  return certificateMock;
};
