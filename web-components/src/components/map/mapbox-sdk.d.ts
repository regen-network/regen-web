// Workaround for now, getting error @types/mapbox__mapbox-sdk/index.d.ts is not a module
declare module '@mapbox/mapbox-sdk';

// TODO: leaving the following commented for now because adding
// @types/mapbox__mapbox-sdk seems to properly work for the geocoder, but for
// some reason isn't properly working for the root /mapbox-sdk types. We can
// probably remove this comment and the following line once we're sure things
// build properly in prod

// declare module '@mapbox/mapbox-sdk/services/geocoding';
