import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import { MAPBOX_TOKEN } from 'config/globals';

export const getGeocodingClient = (accessToken?: string) =>
  mbxGeocoding({ accessToken: accessToken ?? MAPBOX_TOKEN });
