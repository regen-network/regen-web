import { SxProps } from '@mui/material';

import InfoCard from 'web-components/src/components/molecules/InfoCard';
import { Theme } from 'web-components/src/theme/muiTheme';

import { AllBuyModalQuery } from 'generated/sanity-graphql';

type Props = {
  content?: AllBuyModalQuery['allBuyModal'][0];
  sx?: SxProps<Theme>;
};

export const BuyCreditsModalInfoCard = ({ content, sx }: Props) => {
  const { title, descriptionRaw, image } = content?.infoCard ?? {};
  return (
    <InfoCard
      title={title ?? ''}
      description={descriptionRaw ?? ''}
      image={{
        src: image?.imageHref ?? image?.image?.asset?.url ?? '',
        alt: image?.imageAlt ?? '',
      }}
      sx={sx}
    />
  );
};
