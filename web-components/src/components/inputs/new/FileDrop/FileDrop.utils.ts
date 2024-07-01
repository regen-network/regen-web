// Convert file to base64 string
export const toBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export const toText = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export const isImage = (mimeType?: string) => !!mimeType?.includes('image/');
export const isVideo = (mimeType?: string) => !!mimeType?.includes('video/');
export const isAudio = (mimeType?: string) => !!mimeType?.includes('audio/');
export const isPdf = (mimeType?: string) => mimeType === 'application/pdf';
export const isSpreadSheet = (mimeType?: string) => mimeType === 'text/csv';
export const isJson = (mimeType?: string) => mimeType === 'application/json';

export type ExifGPSData = {
  GPSLatitude: [number, number, number];
  GPSLongitude: [number, number, number];
  GPSLatitudeRef: string;
  GPSLongitudeRef: string;
  GPSAltitude?: number;
};

export const exifToFeature = (exifGPSData: ExifGPSData) => {
  if (!exifGPSData.GPSLatitude) {
    return;
  }
  let lat =
    exifGPSData.GPSLatitude[0] +
    exifGPSData.GPSLatitude[1] / 60 +
    exifGPSData.GPSLatitude[2] / 3600;
  let lng =
    exifGPSData.GPSLongitude[0] +
    exifGPSData.GPSLongitude[1] / 60 +
    exifGPSData.GPSLongitude[2] / 3600;
  if (exifGPSData.GPSLatitudeRef.toLowerCase() === 's') {
    lat = -lat;
  }
  if (exifGPSData.GPSLongitudeRef.toLowerCase() === 'w') {
    lng = -lng;
  }
  const alt = exifGPSData.GPSAltitude;
  const coord = alt ? [lng, lat, alt] : [lng, lat];
  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Point',
      coordinates: coord,
    },
  };
};
