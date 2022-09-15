import { ClassNameMap } from '@mui/material';

import { Image } from '../image';
import { Asset, isMedia } from './ProjectMedia';

type Props = {
  asset: Asset;
  classes: ClassNameMap<string>;
  imageStorageBaseUrl?: string;
  apiServerUrl?: string;
};

export const ProjectAsset = ({
  asset,
  apiServerUrl,
  classes,
  imageStorageBaseUrl,
}: Props): JSX.Element =>
  isMedia(asset) ? (
    <Image
      className={classes?.image}
      src={asset.src}
      alt={asset.src}
      imageStorageBaseUrl={imageStorageBaseUrl}
      apiServerUrl={apiServerUrl}
    />
  ) : (
    <div className={classes?.element}>{asset}</div>
  );
