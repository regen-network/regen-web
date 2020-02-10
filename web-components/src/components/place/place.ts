import { Place } from './ProjectPlaceInfo';

export function getFormattedPlace(place: Place, displayCity: boolean, displayCountry: boolean): string {
  let formattedPlace: string = place.state;
  if (displayCountry) {
    formattedPlace = `${formattedPlace}, ${place.country}`;
  }
  if (place.city && displayCity) {
    formattedPlace = `${place.city}, ${formattedPlace}`;
  }
  return formattedPlace;
}
