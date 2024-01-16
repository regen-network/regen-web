import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { SxProps } from '@mui/material';
import { Feature, Point } from 'geojson';

import { Theme } from '../../../../theme/muiTheme';
import { sxToArray } from '../../../../utils/mui/sxToArray';
import PinIcon from '../../../icons/PinIcon';
import InfoTooltip from '../../../tooltip/InfoTooltip';
import { Body } from '../../../typography';
import { isGeocodingFeature } from '../LocationField/LocationField.types';
import { PHOTO_CREDIT } from './FileDrop.constants';

type Props = {
  name?: string;
  caption?: string;
  credit?: string;
  sx?: SxProps<Theme>;
  location?: GeocodeFeature | Feature;
};

export const FileDropBottomBar = ({
  name,
  caption,
  credit,
  location,
  sx = [],
}: Props) => {
  const point = location?.geometry as Point;
  return (
    <Body
      size="sm"
      mobileSize="sm"
      sx={[
        {
          color: 'primary.main',
          width: '100%',
          cursor: 'pointer',
          background: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '0px 0px 4px 4px',
          py: 2.5,
          px: 5,
        },
        ...sxToArray(sx),
      ]}
    >
      {(caption || credit || name || location) && (
        <div className="inline-block">
          {/* If there's a caption, we display it, else fallback to the file name */}
          {caption ? (
            <span className="mr-1">{caption}</span>
          ) : name ? (
            <span className="mr-1 font-light">{name}</span>
          ) : null}
          {credit && (
            <span className="font-light">{`${PHOTO_CREDIT}: ${credit}`}</span>
          )}
          {location && (
            <InfoTooltip
              arrow
              placement="top"
              title={
                <div className="text-grey-500">
                  <b>Location:</b>{' '}
                  {`${point.coordinates[0]}, ${point.coordinates[1]} ${
                    isGeocodingFeature(location)
                      ? `(${location.place_name})`
                      : ''
                  }`}
                </div>
              }
            >
              <div className="absolute right-[6px] bottom-5 hover:text-brand-100">
                <PinIcon />
              </div>
            </InfoTooltip>
          )}
        </div>
      )}
    </Body>
  );
};
