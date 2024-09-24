import { useQuery } from '@tanstack/react-query';

import { client as sanityClient } from 'lib/clients/sanity';
import { getAllTebuBannerQuery } from 'lib/queries/react-query/sanity/getAllTebuBannerQuery/getAllTebuBannerQuery';

import { TebuHeader } from '../TebuHeader/TebuHeader';
import { TEBU_HEADER_LOGO } from './TebuHeaderWrapper.constants';

const TebuHeaderWrapper = () => {
  const tebuBannerResponse = useQuery(getAllTebuBannerQuery({ sanityClient }));
  const items =
    tebuBannerResponse.data?.allTebuBanner[0].links?.map(link => ({
      href: link?.href ?? '',
      text: link?.text ?? '',
    })) ?? [];

  return (
    <div className="tebu-header-wrapper">
      <TebuHeader items={items} logo={TEBU_HEADER_LOGO} />
    </div>
  );
};

export { TebuHeaderWrapper };
