import { useState } from 'react';
import { GeocodeFeature } from '@mapbox/mapbox-sdk/services/geocoding';
import { useQuery } from '@tanstack/react-query';
import { Feature, Point } from 'geojson';

import { FileDropRenderModalProps } from 'web-components/src/components/inputs/new/FileDrop/FileDrop.types';
import Modal from 'web-components/src/components/modal';

import { getGeocodingQuery } from 'lib/queries/react-query/mapbox/getGeocodingQuery/getGeocodingQuery';

import {
  EditFileForm,
  Props as EditFileFormProps,
} from '../EditFileForm/EditFileForm';

type Props = Omit<
  EditFileFormProps,
  'setDebouncedViewState' | 'geocodingPlaceName'
> &
  Omit<FileDropRenderModalProps, 'initialFile' | 'currentIndex'>;

export const EditFileModal = ({
  initialValues,
  projectLocation,
  open,
  value,
  onClose,
  mapboxToken,
  onSubmit,
  className,
  fileLocation,
}: Props) => {
  const [debouncedViewState, setDebouncedViewState] = useState<
    Feature | GeocodeFeature | undefined
  >();
  const debouncedPoint = debouncedViewState?.geometry as Point | undefined;
  // In order to get the place name associated to the center of the current view state (geocodingPlaceName)
  // We use a debounced value so we don't make reverse geocoding queries for every move on the map.
  const { data } = useQuery(
    getGeocodingQuery({
      request: {
        reverse: true,
        types: ['place'],
        query: [
          debouncedPoint?.coordinates[0] as number,
          debouncedPoint?.coordinates[1] as number,
        ],
      },
      enabled: !!debouncedPoint,
    }),
  );

  const geocodingPlaceName = data?.body?.features?.[0]?.place_name;

  return (
    <Modal open={open} onClose={onClose}>
      <EditFileForm
        initialValues={initialValues}
        projectLocation={projectLocation}
        fileLocation={fileLocation}
        geocodingPlaceName={geocodingPlaceName}
        onClose={onClose}
        mapboxToken={mapboxToken}
        setDebouncedViewState={setDebouncedViewState}
        className={className}
      />
    </Modal>
  );
};
