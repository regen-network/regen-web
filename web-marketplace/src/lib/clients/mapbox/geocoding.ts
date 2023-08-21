import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import { MAPBOX_TOKEN } from 'config/globals';

export const geocodingClient = mbxGeocoding({ accessToken: MAPBOX_TOKEN });
