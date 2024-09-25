import { useQuery } from '@tanstack/react-query';

import { client as sanityClient } from 'lib/clients/sanity';
import { getAllTerrasosHeaderQuery } from 'lib/queries/react-query/sanity/getAllTerassosBannerQuery/getAllTerassosBannerQuery';

import { TerrasosHeader } from '../TerrasosHeader/TerrasosHeader';
import { TERRASOS_HEADER_LOGO } from './TerrasosHeaderWrapper.constants';

const TerrasosHeaderWrapper = () => {
  const terrasosHeaderResponse = useQuery(
    getAllTerrasosHeaderQuery({ sanityClient }),
  );
  const items =
    terrasosHeaderResponse.data?.allTerrasosHeader[0].links?.map(link => ({
      href: link?.href ?? '',
      text: link?.text ?? '',
    })) ?? [];

  return (
    <div className="tebu-header-wrapper">
      <TerrasosHeader items={items} logo={TERRASOS_HEADER_LOGO} />
    </div>
  );
};

export { TerrasosHeaderWrapper };
