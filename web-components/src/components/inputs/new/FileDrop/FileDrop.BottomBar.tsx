import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { SxProps } from '@mui/material';
import { Feature } from 'geojson';

import { Theme } from '../../../../theme/muiTheme';
import { sxToArray } from '../../../../utils/mui/sxToArray';
import { Body } from '../../../typography';
import { PHOTO_CREDIT } from './FileDrop.constants';

type Props = {
  fileName?: string;
  caption?: string;
  credit?: string;
  sx?: SxProps<Theme>;
  location?: GeocodeFeature | Feature;
};

export const FileDropBottomBar = ({
  fileName,
  caption,
  credit,
  sx = [],
}: Props) => (
  <Body
    size="sm"
    mobileSize="sm"
    sx={[
      {
        color: 'primary.main',
        width: '100%',
        cursor: 'pointer',
        background: 'rgba(0, 0, 0, 0.7);',
        borderRadius: '0px 0px 4px 4px',
        py: 2.5,
        px: 5,
      },
      ...sxToArray(sx),
    ]}
  >
    {(caption || credit || fileName) && (
      <div className='inline-block'>
        {/* If there's a caption, we display it, else fallback to the file name */}
        {caption ? (
          <span className="mr-1">
            {caption}
          </span>
        ) : <span className="mr-1 font-light">{fileName}</span> ? (
          <></>
        ) : null}
        {credit && (
          <span className="font-light">{`${PHOTO_CREDIT}: ${credit}`}</span>
        )}
      </div>
    )}
  </Body>
);
